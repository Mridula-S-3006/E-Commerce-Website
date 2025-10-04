// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// User pages
import UserLogin from "./pages/users/UserLogin";
import UserRegister from "./pages/users/UserRegister";
import UserDashboard from "./pages/users/UserDashboard";
import ProductPage from "./pages/users/ProductPage";
import OrdersPage from "./pages/users/OrdersPage";
import CartPage from "./pages/users/CartPage";
import PaymentPage from "./pages/users/PaymentPage";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import ViewOrders from "./pages/admin/ViewOrders";
import ViewCustomers from "./pages/admin/ViewCustomers";

// Shared
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/view-orders" element={<ViewOrders />} />
        <Route path="/admin/view-customers" element={<ViewCustomers />} />

        {/* 404 fallback */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
