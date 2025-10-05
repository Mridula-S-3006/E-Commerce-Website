import React, { useState, useEffect } from "react";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`
);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch products.");
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard-page">
      <h2>Products</h2>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <button
                onClick={() => {
                  console.log("View Product:", product.id);
                }}
              >
                View Product
              </button>
              <button
                onClick={() => {
                  console.log("Add to Cart:", product.id);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
