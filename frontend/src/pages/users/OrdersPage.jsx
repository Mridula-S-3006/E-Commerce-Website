import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/users`
, {
          method: "GET",
          credentials: "include", // if using cookies for auth
        });
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch orders.");
        } else {
          setOrders(data);
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p className="error">{error}</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Products</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Ordered On</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {order.products.map((p) => (
                  <div key={p.productId}>
                    {p.name} x {p.quantity}
                  </div>
                ))}
              </td>
              <td>₹{order.total}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
