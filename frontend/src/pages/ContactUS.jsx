import React from "react";
import "../styles/ContactUS.css";


const ContactUS = () => {
  return (
    <main className="contact-page">
      <section className="contact-intro">
        <p className="contact-kicker">Contact Us</p>
        <h1>Need help with an order, product, or account?</h1>
        <p>
          Send us a message and our support team will get back to you as soon
          as possible. This page uses dummy contact details for the project.
        </p>
      </section>

      <section className="contact-layout">
        <form className="contact-form">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required />

          <label htmlFor="topic">Topic</label>
          <select id="topic" name="topic" defaultValue="order">
            <option value="order">Order support</option>
            <option value="product">Product question</option>
            <option value="account">Account help</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us how we can help..."
            rows="6"
            required
          />

          <button type="submit">Send Message</button>
        </form>

        <aside className="contact-details">
          <h2>ShopSphere Support</h2>
          <p>Email: support@shopsphere.example</p>
          <p>Phone: +1 555 014 2290</p>
          <p>Hours: Monday to Friday, 9:00 AM - 6:00 PM</p>

          <div className="contact-note">
            <h3>Quick Response</h3>
            <p>
              Most messages receive a reply within one business day. Include
              your order ID if your question is about a purchase.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default ContactUS;
