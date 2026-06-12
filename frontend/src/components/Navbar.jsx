import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import "../styles/navbar.css"; // Import CSS for styling

const Navbar = () => {

  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
        <div className="navbar-logo">
            <Link to="/" className="brand-link">
            <img src="/logo1.png" alt="ShopSphere Logo" className="logo-image" />
            <span>ShopSphere</span>
            </Link>
        </div>
        <ul className="navbar-links">
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart({cartItems.length})</Link></li>
            {user ? (
                <>
                 <li><Link to="/profile">Hi, {user.name}</Link></li>
                 {user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
                  <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                </>
            ) : (
                <>
                 <li><Link to="/login">Login</Link></li>
                </>
            )}
            
        </ul>
    </nav>
  );
};

export default Navbar;
