import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import UserLogin from "./pages/users/UserLogin";
import UserDashboard from "./pages/users/UserDashboard";
import ProductPage from "./pages/users/ProductPage";
import OrdersPage from "./pages/users/OrdersPage";
import CartPage from "./pages/users/CartPage";
import PaymentPage from "./pages/users/PaymentPage";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard  from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import ViewOrders from "./pages/admin/ViewOrders"; 
import CustomersPage from "./pages/admin/CustomersPage";

import "./styles/variables.css";
import "./styles/theme.css";
import "./styles/common.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLogin />,
  },
  {
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/products/:id",
    element: <ProductPage />,
  },
  {
    path: "/orders",
    element: <OrdersPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },

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
    element: <ViewOrders />,
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
