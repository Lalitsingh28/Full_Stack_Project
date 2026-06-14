import React from "react";
import "../styles/About.css"; // Import the CSS file for styling

const About = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="about-kicker">About ShopSphere</p>
        <h1>Simple shopping, thoughtful service, and products worth discovering.</h1>
        <p>
          ShopSphere is a demo ecommerce experience built to make browsing,
          comparing, and buying products feel clear and dependable from the
          first click.
        </p>
      </section>

      <section className="about-grid" aria-label="What makes us different">
        <article>
          <h2>Curated Products</h2>
          <p>
            We focus on useful everyday items, clean product details, and a
            layout that helps customers decide quickly.
          </p>
        </article>
        <article>
          <h2>Reliable Experience</h2>
          <p>
            The app is designed with responsive pages, simple navigation, and
            smooth flows for product discovery and account actions.
          </p>
        </article>
        <article>
          <h2>Built To Grow</h2>
          <p>
            ShopSphere is structured as a full-stack project, ready for real
            catalog data, authentication, cart features, and admin tools.
          </p>
        </article>
      </section>

      <section className="about-story">
        <div>
          <h2>Our Mission</h2>
          <p>
            We want online shopping to feel organized, trustworthy, and easy to
            use. Every page is built around practical details: fast scanning,
            clear calls to action, and a design that stays out of the way.
          </p>
        </div>
        <div className="about-stats" aria-label="ShopSphere highlights">
          <span><strong>24/7</strong> Support-ready</span>
          <span><strong>100+</strong> Product-ready layout</span>
          <span><strong>Fast</strong> Responsive UI</span>
        </div>
      </section>
    </main>
  );
};

export default About;
