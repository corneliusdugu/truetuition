"use client";

import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Donate from "./pages/Donate.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Sdg4Info from "./pages/Sdg4Info.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import NotFound from "./pages/NotFound.jsx";

import RequireAuth from "./routes/RequireAuth.jsx";

export default function ClientApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="sdg4" element={<Sdg4Info />} />

          <Route
            path="donate"
            element={
              <RequireAuth>
                <Donate />
              </RequireAuth>
            }
          />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}