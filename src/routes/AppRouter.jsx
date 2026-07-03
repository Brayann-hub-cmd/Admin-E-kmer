import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/dashboard/Dashboard";
import Orders from "../pages/orders/Orders";
import Categories from "../pages/categories/Categories";
import Sales from "../pages/sales/Sales";
import Purchases from "../pages/purchases/Purchases";
import Settings from "../pages/settings/Settings";
import Notifications from "../pages/notifications/Notifications";
import Profile from "../pages/profile/Profile";
import Users from "../pages/users/Users";
import Analytics from "../pages/analytics/Analytics";
import Products from "../pages/products/Products";
import Reports from "../pages/reports/Reports";
import AdminLogin from "../pages/Admin/AdminLogin";
import Livreurs from "../pages/livreurs/Livreurs";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PAGE LOGIN ADMIN */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* REDIRECTION PAGE PRINCIPALE */}
        <Route
          path="/"
          element={<Navigate to="/admin/login" replace />}
        />

        {/* DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />

        {/* COMMANDES */}
        <Route
          path="/commandes"
          element={
            <ProtectedRoute>
              <Layout><Orders /></Layout>
            </ProtectedRoute>
          }
        />

        {/* CATEGORIES */}
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Layout><Categories /></Layout>
            </ProtectedRoute>
          }
        />

        {/* VENTES */}
        <Route
          path="/ventes"
          element={
            <ProtectedRoute>
              <Layout><Sales /></Layout>
            </ProtectedRoute>
          }
        />

        {/* ACHATS */}
        <Route
          path="/achats"
          element={
            <ProtectedRoute>
              <Layout><Purchases /></Layout>
            </ProtectedRoute>
          }
        />

        {/* PARAMETRES */}
        <Route
          path="/parametres"
          element={
            <ProtectedRoute>
              <Layout><Settings /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout><Profile /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/utilisateurs"
          element={
            <ProtectedRoute>
              <Layout><Users /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Layout><Analytics /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/produits"
          element={
            <ProtectedRoute>
              <Layout><Products /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Layout><Reports /></Layout>
            </ProtectedRoute>
          }
        />

        {/* LIVREURS */}
        <Route
          path="/livreurs"
          element={
            <ProtectedRoute>
              <Layout><Livreurs /></Layout>
            </ProtectedRoute>
          }
        />

        {/* NOTIFICATIONS */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Layout><Notifications /></Layout>
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/admin/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}