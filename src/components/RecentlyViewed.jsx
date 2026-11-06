import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function RecentlyViewed({ vendors }) {
  const { recentlyViewed, clearRecent } = useCart()

  if (recentlyViewed.length === 0) return null

  return (
    <section style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-title">Recently Viewed</h2>
        <button type="button" className="link danger" onClick={clearRecent}>Clear</button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {recentlyViewed.map((item) => {
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
  )
}

export default RecentlyViewed