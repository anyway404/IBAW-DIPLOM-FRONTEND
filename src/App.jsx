import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Aktuell from "./pages/Aktuell.jsx";
import Ersatzwagen from "./pages/Ersatzwagen.jsx";
import Mietwagen from "./pages/Mietwagen.jsx";
import Impressum from "./pages/Impressum.jsx";
import Login from "./pages/Login.jsx";
import NoPage from "./pages/NoPage.jsx";

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
              element={isAuthenticated ? <Aktuell /> : <Navigate to="/login" />}
            />
            <Route
              path="/impressum"
              element={
                isAuthenticated ? <Impressum /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/ersatzwagen"
              element={
                isAuthenticated ? <Ersatzwagen /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/mietwagen"
              element={
                isAuthenticated ? <Mietwagen /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/aktuell" />
              }
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
