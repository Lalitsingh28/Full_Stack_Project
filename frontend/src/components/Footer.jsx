import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#333", color: "#fff", padding: "20px", textAlign: "center" }}>
      <div>
        <Link to="/about" style={{ color: "#fff", margin: "0 10px" }}>About Us</Link>
        <Link to="/contact" style={{ color: "#fff", margin: "0 10px" }}>Contact</Link>
        <Link to="/privacy" style={{ color: "#fff", margin: "0 10px" }}>Privacy Policy</Link>
      </div>
      <p>&copy; 2024 ShopSphere. All rights reserved.</p>

    </footer>
  );
};

export default Footer;