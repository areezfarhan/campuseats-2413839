import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return <p className="muted">You haven't placed any orders yet.</p>
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      {orders.map((order, index) => (
        <div key={index} className="card" style={{ marginBottom: '1rem' }}>
          <h3>Order for {order.name}</h3>
          <p>Pickup at: {order.pickupTime} (Mahallah {order.mahallah})</p>
          <p>Total: RM{order.total.toFixed(2)}</p>
        </div>
      ))}
    </section>
  )
}

export default OrdersPage