import { useState, useEffect } from 'react'

// REMOVED: import vendors from './data/vendors.js' 
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import CartPage from './components/CartPage.jsx'

function App() {
  // --- S1. All the state in App.jsx ---
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu')
  const [lastOrder, setLastOrder] = useState(null)

  const [recentlyViewed, setRecentlyViewed] = useState([])

  // --- S2. The fetch effect ---
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        // TODO: check if res.ok is false
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        setSelectedVendorId((current) => current ?? data[0]?.id ?? null)
      })
      .catch((err) => {
        // TODO: call setError, but NOT AbortError
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  // NEW: Function to clear the list
  function handleClearRecent() {
    setRecentlyViewed([])
  }

  // --- S3. The cart handlers ---
  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prev, { item, qty: 1 }]
    })

    // 2. NEW: Recently Viewed Logic
    setRecentlyViewed((prev) => {
      // Remove the item if it already exists (No duplicates)
      const filtered = prev.filter((viewedItem) => viewedItem.id !== item.id)
      // Add it to the very front (Newest first)
      const updated = [item, ...filtered]
      // Keep only the first 5 items (Max 5)
      return updated.slice(0, 5)
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        // TODO: update qty + delta
        .map((line) => line.item.id === itemId ? { ...line, qty: line.qty + delta } : line)
        .filter((line) => line.qty > 0)
    )
  }

  function handleRemove(itemId) {
    // TODO: filter out the removed item
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
    // TODO: calculate total before clearing cart
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  // --- Derived values ---
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

  // --- S4. The menu view and the order-placed view ---
  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    // Used lecturer's exact text for the success screen
    content = (
      <section className="card">
        <h2>Order placed</h2>
        <p>Thank you, {lastOrder.name}. Pick up at {lastOrder.pickupTime} (Mahallah {lastOrder.mahallah}). Total RM{lastOrder.total.toFixed(2)}.</p>
        <button className="btn" onClick={() => setView('menu')}>Back to menus</button>
      </section>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else {
    // Your original Week 2 layout goes here
    content = (
      <>
        {/* NEW: Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="section-title">Recently Viewed</h2>
              <button type="button" className="link danger" onClick={handleClearRecent}>Clear</button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {recentlyViewed.map((item) => (
                <div key={item.id} className="card" style={{ padding: '1rem', flex: '1 1 150px' }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>{item.name}</p>
                  <p className="muted" style={{ margin: 0 }}>RM{item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="section-title">Menu: {selectedVendor?.name}</h2>
          {selectedVendor && (
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          )}
        </section>
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App