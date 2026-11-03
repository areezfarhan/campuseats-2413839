import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campus-cart', [])
  const [orders, setOrders] = useLocalStorage('campus-orders', [])
  
  // NEW: Recently viewed state
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('campus-recent', []) 

  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0)

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) => line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line)
      }
      return [...prev, { item, qty: 1 }]
    })

    // NEW: Track the item when added to cart
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id) // Remove duplicates
      return [item, ...filtered].slice(0, 5) // Add to top, keep max 5
    })
  }

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev.map((line) => line.item.id === itemId ? { ...line, qty: line.qty + delta } : line)
          .filter((line) => line.qty > 0)
    )
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function placeOrder(details) {
    const newOrder = { ...details, total, items: cart, date: new Date().toISOString() }
    setOrders((prev) => [newOrder, ...prev])
    setCart([])
  }

  // NEW: Function to clear the list
  function clearRecent() {
    setRecentlyViewed([])
  }

  return (
    <CartContext.Provider value={{ 
      cart, orders, count, total, 
      addToCart, changeQty, removeFromCart, placeOrder,
      recentlyViewed, clearRecent // NEW: Add to context
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider