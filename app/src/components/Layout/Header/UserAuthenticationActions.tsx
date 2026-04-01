import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import { useAppDispatch, type RootState } from "../../../store";
import { useSelector } from "react-redux";
import { logout, selectAuth } from "../../../store/slices/auth-slice";
import { useCallback } from "react";

function UserAuthenticationActions() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(selectAuth);

  const handleUserLogout = useCallback(() => {
    dispatch(logout());
    // navigate("/login");
  }, [navigate, dispatch]);

  if (isAuthenticated) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
        <Typography
          variant="body2"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Olá, <strong>{user?.username}</strong>
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          onClick={handleUserLogout}
        >
          Sair
        </Button>
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
      <Button
        color="inherit"
        variant="outlined"
        component={RouterLink}
        to="/login"
      >
        Entrar
      </Button>
      <Button
        color="info"
        variant="contained"
        component={RouterLink}
        to="/register"
      >
        Registrar
      </Button>
    </Box>
  );
}

export default UserAuthenticationActions;
