import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Aktuell from "./pages/Aktuell.jsx";
import Ersatzwagen from "./pages/Ersatzwagen.jsx";
import Mietwagen from "./pages/Mietwagen.jsx";
import Impressum from "./pages/Impressum.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={isAuthenticated ? <Aktuell /> : <Navigate to="/login" />}
            />
            <Route
              path="/aktuell"
              element={
                isAuthenticated ? <Aktuell /> : <Navigate to="/aktuell" />
              }
            />
            <Route
              path="/impressum"
              element={
                isAuthenticated ? <Impressum /> : <Navigate to="/impressum" />
              }
            />
            <Route
              path="/ersatzwagen"
              element={
                isAuthenticated ? (
                  <Ersatzwagen />
                ) : (
                  <Navigate to="/ersatzwagen" />
                )
              }
            />
            <Route
              path="/mietwagen"
              element={
                isAuthenticated ? <Mietwagen /> : <Navigate to="/mietwagen" />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
