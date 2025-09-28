// frontend/src/pages/user/ProductPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams(); // product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // TODO: Replace with your backend endpoint
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch product.");
        } else {
          setProduct(data);
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-page">
      <h2>{product.name}</h2>
      <div className="product-details">
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <div className="product-actions">
            <button
              onClick={() => {
                // TODO: Implement add to cart
                console.log("Add to Cart:", product.id);
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                // TODO: Implement buy now / payment
                console.log("Buy Now:", product.id);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
