import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Article0501 from "./pages/articles/20260501001";
import IndexPage from "./pages/index";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Nodo Central: via51.org/ */}
        <Route path="/" element={<IndexPage />} />
        
        {/* Escenario: via51.org/articles/20260501001 */}
        <Route path="/articles/20260501001" element={<Article0501 />} />
        
        {/* Redireccion de Seguridad */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}