import { NavLink } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function Header() {
    const { count } = useCart()

    return (
        <header className="header">
            <h1 className="logo">CampusEats</h1>
            <nav className="nav">
                <NavLink to="/" end className="link">
                    Vendors
                </NavLink>
                <NavLink to="/orders" className="link">
                    My Orders
                </NavLink>
                <NavLink to="/cart" className="link cart">
                    Cart <span className="badge">{count}</span>
                </NavLink>
            </nav>
        </header>
    )
}

export default Header