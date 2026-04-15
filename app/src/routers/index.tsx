import { Routes, Route, Link } from "react-router";
import { ProtectedRoute } from "./protected-route";
import { Button } from "@mui/material";
import Layout from "../components/Layout";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
import Products from "../pages/products";
import ProductDetail from "../pages/product-detail";
import CartPage from "../pages/cart";
import SummaryPage from "../pages/summary";

export const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route
          path="/"
          element={
            <Home/>
          }
        />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/summary" element={<SummaryPage/>} />
        </Route>
      </Route>
    </Routes>
  );
};
