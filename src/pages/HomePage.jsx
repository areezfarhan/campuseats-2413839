import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import VendorCard from '../components/VendorCard.jsx'
import RecentlyViewed from '../components/RecentlyViewed.jsx' // NEW
import { Loading, ErrorMessage } from '../components/Status.jsx'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()
  const { addToCart } = useCart()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  return (
    <>
      {}
      <RecentlyViewed vendors={vendors} />

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