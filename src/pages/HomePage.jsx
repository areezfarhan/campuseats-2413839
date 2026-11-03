import { Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import VendorCard from '../components/VendorCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()
  const { addToCart, recentlyViewed, clearRecent } = useCart()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  return (
    <>
      {/* NEW: Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="section-title">Recently Viewed</h2>
            <button type="button" className="link danger" onClick={clearRecent}>Clear</button>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {recentlyViewed.map((item) => {
              // Find the vendor so we can link to their menu page
              const vendor = vendors.find((v) => v.menu.some((m) => m.id === item.id))
              return (
                <Link 
                  to={`/vendor/${vendor?.id}`} 
                  key={item.id} 
                  className="card" 
                  style={{ padding: '1rem', flex: '1 1 150px', textDecoration: 'none', color: 'inherit' }}
                >
                  <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>{item.name}</p>
                  <p className="muted" style={{ margin: 0 }}>RM{item.price.toFixed(2)}</p>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Vendor List */}
      <section>
        <h2 className="section-title">Choose a vendor</h2>
        <div className="vendor-grid">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage