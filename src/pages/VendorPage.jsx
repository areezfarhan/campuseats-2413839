import { useParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import MenuList from '../components/MenuList.jsx'

function VendorPage() {
  const { id } = useParams() // Gets the ID from the URL
  const { vendors } = useVendors()
  const { addToCart } = useCart()

  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    return <section className="card"><h2>Vendor not found</h2></section>
  }

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <MenuList items={vendor.menu} onAdd={addToCart} />
    </section>
  )
}

export default VendorPage