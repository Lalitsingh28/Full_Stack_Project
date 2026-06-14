import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import "../styles/Checkout.css";
import { AuthContext } from "../context/AuthContext";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "card",
  });

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + Number(item.price || 0) * Number(item.quantity || 1);
  }, 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login First");
      navigate("/login");
      return;
    }

    alert(`Order placed successfully. Thank you, ${formData.fullName}!`);
    dispatch(clearCart());
    navigate("/");
  };


  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <p className="checkout-kicker">Checkout</p>
          <h1>Your cart is empty</h1>
          <p>Add products to your cart before starting checkout.</p>
          <Link to="/products">Browse Products</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <p className="checkout-kicker">Secure Checkout</p>
        <h1>Complete your order</h1>
        <p>Enter your delivery details and choose a payment method.</p>
      </header>

      <section className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-card">
            <h2>Contact Information</h2>
            <div className="checkout-field-grid">
              <label>
                Full Name
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 555 012 3456"
                  required
                />
              </label>
            </div>
          </section>

          <section className="checkout-card">
            <h2>Shipping Address</h2>
            <label>
              Address
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address, apartment, landmark"
                rows="4"
                required
              />
            </label>
            <div className="checkout-field-grid checkout-field-grid-three">
              <label>
                City
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </label>
              <label>
                State
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </label>
              <label>
                ZIP Code
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Postal code"
                  required
                />
              </label>
            </div>
          </section>

          <section className="checkout-card">
            <h2>Payment Method</h2>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                />
                Credit or Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>
            </div>
          </section>

          <button type="submit" className="place-order-button">
            Place Order
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-summary-items">
            {cartItems.map((item) => {
              const quantity = Number(item.quantity || 1);
              const itemImage = item.image || item.imageURL;

              return (
                <article className="checkout-summary-item" key={item._id}>
                  <div className="checkout-item-image-wrap">
                    {itemImage ? (
                      <img src={itemImage} alt={item.name} />
                    ) : (
                      <span>No Image</span>
                    )}
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <p>Qty: {quantity}</p>
                  </div>
                  <strong>${(Number(item.price || 0) * quantity).toFixed(2)}</strong>
                </article>
              );
            })}
          </div>

          <div className="checkout-totals">
            <div>
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <strong>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</strong>
            </div>
            <div>
              <span>Tax</span>
              <strong>${tax.toFixed(2)}</strong>
            </div>
            <div className="checkout-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>

          <Link to="/cart">Back to Cart</Link>
        </aside>
      </section>
    </main>
  );
};

export default Checkout;
