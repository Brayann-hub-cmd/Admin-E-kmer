// routes/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import Products from "../pages/products/Products";
import Orders from "../pages/orders/Orders";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/admin" replace />} />

        <Route path="/admin" element={<Layout><Dashboard /></Layout>} />
        <Route path="/admin/users" element={<Layout><Users /></Layout>} />
        <Route path="/admin/products" element={<Layout><Products /></Layout>} />
        <Route path="/admin/orders" element={<Layout><Orders /></Layout>} />

      </Routes>
    </BrowserRouter>
  );
}