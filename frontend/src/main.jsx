import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// User Pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import OrdersPage from "./pages/admin/OrdersPage";
import CustomersPage from "./pages/admin/CustomersPage";

const router = createBrowserRouter([
  // ---------------- USER ROUTES ----------------
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },

  // ---------------- ADMIN ROUTES ----------------
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/add-product",
    element: <AddProduct />,
  },
  {
    path: "/admin/orders",
    element: <OrdersPage />,
  },
  {
    path: "/admin/customers",
    element: <CustomersPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
