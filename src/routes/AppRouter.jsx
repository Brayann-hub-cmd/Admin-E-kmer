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
export default function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>
    

        {/* REDIRECTION PAGE PRINCIPALE */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />


        <Route
          path="/commandes"
          element={
            <Layout>
              <Orders />
            </Layout>
          }
        />

        <Route
          path="/categories"
          element={
            <Layout>
              <Categories />
            </Layout>
          }
        />

        <Route
          path="/ventes"
          element={
            <Layout>
              <Sales />
            </Layout>
          }
        />

        <Route
          path="/achats"
          element={
            <Layout>
              <Purchases />
            </Layout>
          }
        />

        <Route
          path="/parametres"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />

  <Route
  path="/profile"
  element={
    <Layout>
      <Profile />
    </Layout>
  }
/>

  <Route path="/utilisateurs" element={<Layout><Users /></Layout>} />

  <Route
  path="/analytics"
  element={
    <Layout>
      <Analytics />
    </Layout>
  }
/>

   <Route
          path="/produits"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
  path="/notifications"
  element={
    <Layout>
      <Notifications />
    </Layout>
  }
/>

        <Route path="/reports" element={<Layout><Reports /></Layout>} />


        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/admin" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}