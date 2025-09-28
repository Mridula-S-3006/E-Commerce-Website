// frontend/src/pages/admin/AddProduct.jsx
import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/admin/products", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          description,
          stock,
          imageUrl,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Product added successfully!");
        setName("");
        setPrice("");
        setDescription("");
        setStock("");
        setImageUrl("");
      } else {
        setMessage(data.message || "❌ Failed to add product.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleAddProduct}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit">➕ Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
