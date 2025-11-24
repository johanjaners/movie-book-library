import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__brand">Movie / Book Library</div>
      <nav className="navbar__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/items/new">Add Item</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
