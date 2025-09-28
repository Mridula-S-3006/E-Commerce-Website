// frontend/src/pages/admin/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      alert("Logged out successfully!");
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin! Choose an option:</p>

      <div className="admin-actions">
        <button onClick={() => navigate("/admin/add-product")}>
          ➕ Add Product
        </button>

        <button onClick={() => navigate("/admin/view-orders")}>
          📦 View Orders
        </button>

        <button onClick={() => navigate("/admin/view-customers")}>
          👥 View Customers
        </button>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
