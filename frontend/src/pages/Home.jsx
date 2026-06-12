import React, {useEffect, useState} from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      console.log("Products:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="homeContainer">Loading...</div>;
  }

  return (
    <>
    <div className="home">
      <h1>Welcome to ShopSphere!</h1>
      <p>Your one-stop shop for all your needs. Explore our wide range of products and enjoy seamless shopping experience.</p>
    </div>
    <h1 style={{ textAlign: "center", margin: "20px 0" }}>Featured Products</h1>
    {loading ? (
      <div style={{ textAlign: "center" }}>Loading products...</div>
    ) : (
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    )}
    
    </>
  );
};

export default Home;
