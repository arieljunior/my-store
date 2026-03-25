import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";

function UserAuthenticationActions() {
  const isAuthenticated = false;
  const username = "usuario";

  if (isAuthenticated) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
        <Typography
          variant="body2"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Olá, <strong>{username}</strong>
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          onClick={() => {}}
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
