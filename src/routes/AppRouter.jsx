import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

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
        {/* <Route
          path="/"
          element={<Navigate to="/admin/login" replace />}
        /> */}

        {/* DASHBOARD */}
        <Route
          path="/admin"
          element={
            <Layout><Dashboard /></Layout>
          }
        />

        {/* COMMANDES */}
        <Route
          path="/commandes"
          element={
            <Layout><Orders /></Layout>
          }
        />

        {/* CATEGORIES */}
        <Route
          path="/categories"
          element={
            <Layout><Categories /></Layout>
          }
        />

        {/* VENTES */}
        <Route
          path="/ventes"
          element={
            <Layout><Sales /></Layout>
          }
        />

        {/* ACHATS */}
        <Route
          path="/achats"
          element={
            <Layout><Purchases /></Layout>
          }
        />

        {/* PARAMETRES */}
        <Route
          path="/parametres"
          element={
            <Layout><Settings /></Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout><Profile /></Layout>
          }
        />

        <Route
          path="/utilisateurs"
          element={
            <Layout><Users /></Layout>
          }
        />

        <Route
          path="/analytics"
          element={
            <Layout><Analytics /></Layout>
          }
        />

        <Route
          path="/produits"
          element={
            <Layout><Products /></Layout>
          }
        />

        <Route
          path="/reports"
          element={
            <Layout><Reports /></Layout>
          }
        />

        {/* LIVREURS */}
        <Route
          path="/livreurs"
          element={
            <Layout><Livreurs /></Layout>
          }
        />

        {/* NOTIFICATIONS */}
        <Route
          path="/notifications"
          element={
            <Layout><Notifications /></Layout>
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