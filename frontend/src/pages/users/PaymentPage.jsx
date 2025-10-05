import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch cart items.");
        } else {
          setCartItems(data);
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      }
      setLoading(false);
    };

    fetchCart();
  }, []);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: "Cash on Delivery",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order placed successfully!");
        navigate("/user/orders"); // Redirect to orders page
      } else {
        alert(data.message || "Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p className="error">{error}</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="payment-page">
      <h2>Payment</h2>
      <h3>Payment Method: Cash on Delivery</h3>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: ₹{totalAmount}</h3>
      <button onClick={handlePlaceOrder} className="place-order-btn">
        Place Order
      </button>
    </div>
  );
};

export default PaymentPage;
