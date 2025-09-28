import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // TODO: Replace with your backend endpoint
        const response = await fetch("http://localhost:5000/api/cart", {
          method: "GET",
          credentials: "include", // if using cookies for auth
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

  const removeItem = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setCartItems(cartItems.filter((item) => item.productId !== productId));
      }
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p className="error">{error}</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="cart-page">
      <h2>My Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price * item.quantity}</td>
              <td>
                <button onClick={() => removeItem(item.productId)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: ₹{totalAmount}</h3>
      <button className="checkout-btn">Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
