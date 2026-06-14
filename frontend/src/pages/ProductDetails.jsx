import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
        } else {
          console.error("Failed to fetch product:", data.message);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if(product) {
      const productImage = product.imageURL || product.image;

      dispatch(addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: productImage,
        quantity: 1
      }));
      alert("Product added to cart!");
    }};
    

  if (!product) {
    return (
      <main className="product-details-page">
        <p className="product-details-loading">Loading product details...</p>
      </main>
    );
  }

  const productImage = product.imageURL || product.image;
  const productPrice = Number(product.price || 0).toFixed(2);
  const productCategory = product.category || "Featured Product";
  const productDescription = product.description || "A carefully selected item from the ShopSphere catalog.";

  return (
    <main className="product-details-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/products">Products</Link>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>

      <section className="product-details-shell">
        <div className="product-details-gallery">
          <div className="product-details-badge">In Stock</div>
          <div className="product-details-image-wrap">
            {productImage ? (
              <img src={productImage} alt={product.name} className="product-details-image" />
            ) : (
              <div className="product-details-placeholder">No Image</div>
            )}
          </div>
        </div>

        <div className="product-details-info">
          <p className="product-details-kicker">{productCategory}</p>
          <h1>{product.name}</h1>
          <p className="product-details-description">{productDescription}</p>

          <div className="product-details-rating" aria-label="Product rating">
            <span>★★★★★</span>
            <strong>4.8</strong>
            <small>128 reviews</small>
          </div>

          <div className="product-details-price-row">
            <p className="product-details-price">${productPrice}</p>
            <span>Free delivery available</span>
          </div>

          <div className="product-details-actions">
            <button onClick={handleAddToCart}>Add to Cart</button>
            <Link to="/cart">Go to Cart</Link>
          </div>

          <div className="product-details-perks" aria-label="Shopping benefits">
            <div>
              <strong>Easy Returns</strong>
              <span>7-day replacement support</span>
            </div>
            <div>
              <strong>Secure Checkout</strong>
              <span>Protected payment flow</span>
            </div>
            <div>
              <strong>Fast Support</strong>
              <span>Help when you need it</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
