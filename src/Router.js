// Router.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Shop from './pages/Shop';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}
