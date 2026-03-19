import { Routes, Route, Link } from "react-router";
import { ProtectedRoute } from "./protected-route";
import { Button } from "@mui/material";

export const Routers = () => {
  return (
    <Routes>
      <Route>
        <Route
          path="/"
          element={
            <>
              Home
              <Button component={Link} to="/cart">
                Meu Carrinho
              </Button>
            </>
          }
        />
        <Route path="/login" element={<>Login</>} />
        <Route path="/register" element={<></>} />
        <Route path="/products" element={<></>} />
        <Route path="/product/:id" element={<></>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<>Meu carrinho</>} />
        </Route>
      </Route>
    </Routes>
  );
};
