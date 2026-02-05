import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import Search from "./pages/Search";
import AddRecipe from "./pages/Add";
import Navigation from "./components/Navigation";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/add" element={<AddRecipe />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
);
