import { Outlet } from 'react-router'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet /> {/* This is where HomePage, CartPage, etc. will show up */}
      </main>
      <Footer />
    </>
  )
}

export default Layout