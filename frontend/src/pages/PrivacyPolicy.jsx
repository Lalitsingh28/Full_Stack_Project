import React from 'react';
import "../styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
    return (
        <main className="privacy-page">
            <section className="privacy-header">
                <p className="privacy-kicker">Privacy Policy</p>
                <h1>How ShopSphere handles customer information.</h1>
                <p>
                    This dummy policy explains the type of information a sample
                    ecommerce app may collect and how it may be used to improve
                    shopping, support, and account features.
                </p>
            </section>

            <section className="privacy-content">
                <article>
                    <h2>Information We Collect</h2>
                    <p>
                        We may collect details such as name, email address,
                        delivery preferences, cart activity, and messages sent
                        through our contact form.
                    </p>
                </article>

                <article>
                    <h2>How We Use Information</h2>
                    <p>
                        Information is used to manage accounts, answer support
                        requests, improve product recommendations, and make the
                        shopping experience more reliable.
                    </p>
                </article>

                <article>
                    <h2>Cookies And Analytics</h2>
                    <p>
                        ShopSphere may use basic cookies or analytics tools to
                        remember preferences, measure page performance, and
                        understand which product sections are useful.
                    </p>
                </article>

                <article>
                    <h2>Data Protection</h2>
                    <p>
                        We aim to keep information protected with reasonable
                        safeguards. This project content is for demonstration
                        and should be replaced before launching a real store.
                    </p>
                </article>

                <article>
                    <h2>Your Choices</h2>
                    <p>
                        Customers can request account updates, ask for data
                        corrections, or contact support with privacy questions
                        at privacy@shopsphere.example.
                    </p>
                </article>
            </section>
        </main>
    );
};

export default PrivacyPolicy;
