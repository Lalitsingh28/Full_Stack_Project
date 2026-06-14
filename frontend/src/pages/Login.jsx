import React, {useState, useContext} from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Register.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
            alert("Login successful!");
            login(data);
            navigate("/");
        } else {
            console.error("Login failed:", data.message);
        }
      
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <main className="auth-page">
    <div className="register-container">
      <p className="auth-kicker">Welcome back</p>
      <h2>Login</h2>
      <p className="auth-subtitle">Sign in to continue shopping with ShopSphere.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
    </main>
  );
};

export default Login;
