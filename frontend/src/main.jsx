// frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

// CSS
import "./styles/variables.css";
import "./styles/theme.css";
import "./styles/common.css";

// Routes
const router = createBrowserRouter([
  // User routes
  { path: "/", element: <UserLogin /> },
  { path: "/login", element: <UserLogin /> },
  { path: "/register", element: <UserRegister /> },
  { path: "/dashboard", element: <UserDashboard /> },
  { path: "/product/:id", element: <ProductPage /> },
  { path: "/orders", element: <OrdersPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/payment", element: <PaymentPage /> },

  // Admin routes
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/add-product", element: <AddProduct /> },
  { path: "/admin/view-orders", element: <ViewOrders /> },
  { path: "/admin/view-customers", element: <ViewCustomers /> },

  // 404 fallback
  { path: "*", element: <h2>404 - Page Not Found</h2> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
