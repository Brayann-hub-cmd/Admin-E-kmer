import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Dashboard from "../pages/dashboard/Dashboard";
import Orders from "../pages/orders/Orders";
import Categories from "../pages/categories/Categories";
import Sales from "../pages/sales/Sales";
import Purchases from "../pages/purchases/Purchases";
import Settings from "../pages/settings/Settings";

import AdminLogin from "../pages/Admin/AdminLogin";

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
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/* COMMANDES */}
        <Route
          path="/commandes"
          element={
            <Layout>
              <Orders />
            </Layout>
          }
        />

        {/* CATEGORIES */}
        <Route
          path="/categories"
          element={
            <Layout>
              <Categories />
            </Layout>
          }
        />

        {/* VENTES */}
        <Route
          path="/ventes"
          element={
            <Layout>
              <Sales />
            </Layout>
          }
        />

        {/* ACHATS */}
        <Route
          path="/achats"
          element={
            <Layout>
              <Purchases />
            </Layout>
          }
        />

        {/* PARAMETRES */}
        <Route
          path="/parametres"
          element={
            <Layout>
              <Settings />
            </Layout>
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