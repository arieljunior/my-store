import { Routes, Route, Link } from "react-router";
import { ProtectedRoute } from "./protected-route";
import { Button } from "@mui/material";
import Layout from "../components/Layout";
import Home from "../pages/home";
import Register from "../pages/register";

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
        <Route path="/login" element={<>Login</>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/products" element={<></>} />
        <Route path="/product/:id" element={<></>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<>Meu carrinho</>} />
        </Route>
      </Route>
    </Routes>
  );
};
