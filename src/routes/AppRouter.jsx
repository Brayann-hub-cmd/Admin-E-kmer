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
export default function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        {/* REDIRECTION PAGE PRINCIPALE */}
        <Route
          path="/"
          element={<Navigate to="/admin" replace />}
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
        <Route path="/notifications" element={<Notifications />} />

  <Route path="/profil" element={<Profile />} />

  <Route path="/utilisateurs" element={<Users />} />

   <Route path="/analytics" element={<Analytics />} />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/admin" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}