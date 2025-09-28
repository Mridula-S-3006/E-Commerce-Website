// frontend/src/pages/admin/ViewCustomers.jsx
import React, { useEffect, useState } from "react";

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/customers", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          setCustomers(data);
        } else {
          setError(data.message || "Failed to fetch customers.");
        }
      } catch (err) {
        console.error(err);
        setError("⚠️ Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-customers">
      <h2>Registered Customers</h2>

      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registered At</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewCustomers;
