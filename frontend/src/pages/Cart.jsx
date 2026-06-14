import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, removeFromCart, updateQuantity } from "../redux/cartSlice";
import "../styles/Cart.css";

const Cart = () =>{
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (id) =>{
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id, quantity) =>{
        if(quantity > 0){
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    const subtotal = cartItems.reduce((acc, item) => {
        return acc + Number(item.price || 0) * Number(item.quantity || 1);
    }, 0);
    const shipping = subtotal > 0 ? 0 : 0;
    const totalPrice = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <main className="cart-page">
                <section className="cart-empty">
                    <p className="cart-kicker">Your Cart</p>
                    <h1>Your cart is empty</h1>
                    <p>Looks like you have not added anything yet. Browse products and bring your favorites back here.</p>
                    <Link to="/products">Continue Shopping</Link>
                </section>
            </main>
        );
    }

    return (
        <main className="cart-page">
            <header className="cart-header">
                <div>
                    <p className="cart-kicker">Your Cart</p>
                    <h1>Shopping Cart</h1>
                    <p>{cartItems.length} {cartItems.length === 1 ? "item" : "items"} ready for checkout.</p>
                </div>
                <button type="button" className="cart-clear-button" onClick={() => dispatch(clearCart())}>
                    Clear Cart
                </button>
            </header>

            <section className="cart-layout">
                <div className="cart-items">
                    {cartItems.map((item) => {
                        const quantity = Number(item.quantity || 1);
                        const itemTotal = Number(item.price || 0) * quantity;
                        const itemImage = item.image || item.imageURL;

                        return (
                            <article className="cart-item" key={item._id}>
                                <div className="cart-item-image-wrap">
                                    {itemImage ? (
                                        <img src={itemImage} alt={item.name} className="cart-item-image" />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </div>

                                <div className="cart-item-info">
                                    <h2>{item.name}</h2>
                                    <p>${Number(item.price || 0).toFixed(2)} each</p>
                                    <button type="button" onClick={() => handleRemove(item._id)}>
                                        Remove
                                    </button>
                                </div>

                                <div className="cart-quantity">
                                    <button
                                        type="button"
                                        aria-label={`Decrease quantity for ${item.name}`}
                                        onClick={() => handleUpdateQuantity(item._id, quantity - 1)}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{quantity}</span>
                                    <button
                                        type="button"
                                        aria-label={`Increase quantity for ${item.name}`}
                                        onClick={() => handleUpdateQuantity(item._id, quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="cart-item-total">${itemTotal.toFixed(2)}</p>
                            </article>
                        );
                    })}
                </div>

                <aside className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="cart-summary-row">
                        <span>Subtotal</span>
                        <strong>${subtotal.toFixed(2)}</strong>
                    </div>
                    <div className="cart-summary-row">
                        <span>Shipping</span>
                        <strong>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</strong>
                    </div>
                    <div className="cart-summary-total">
                        <span>Total</span>
                        <strong>${totalPrice.toFixed(2)}</strong>
                    </div>

                    <button type="button" onClick={() => navigate("/checkout")}>
                        Proceed to Checkout
                    </button>
                    <Link to="/products">Continue Shopping</Link>
                </aside>
            </section>
        </main>
    );
}

export default Cart;
