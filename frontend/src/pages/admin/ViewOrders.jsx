// frontend/src/pages/admin/ViewOrders.jsx
import React, { useEffect, useState } from "react";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/orders`
, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          setError(data.message || "Failed to fetch orders.");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-orders">
      <h2>All Customer Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ordered At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userName || order.userId}</td>
                <td>
                  {order.products.map((p, index) => (
                    <div key={index}>
                      {p.name} (x{p.quantity})
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
      )}
    </div>
  );
};

export default ViewOrders;
