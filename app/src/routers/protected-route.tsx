import { Navigate, Outlet, useLocation } from "react-router";
import { toast } from "react-toastify";

export const ProtectedRoute = () => {
  const isAuthenticated = false;
  const location = useLocation();

  if (!isAuthenticated) {
    toast.warning("Você precisa fazer login para acessar esta página.", {
      toastId: "auth-warning",
    });

    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
