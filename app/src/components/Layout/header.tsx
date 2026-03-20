import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router";
import { Store } from "lucide-react";
function Header() {
  const isAuthenticated = false;
  const username = "usuario";

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Box>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Store /> MyStore
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Produtos
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            Meu carrinho
          </Button>

          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, borderLeft: '1px solid rgba(255,255,255,0.3)', pl: 2 }}>
              <Typography>
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
          ) : (
            <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
              <Button
                color="inherit"
                variant="outlined"
                component={Link}
                to="/login"
              >
                Entrar
              </Button>
              <Button
                color="info"
                variant="contained"
                component={Link}
                to="/register"
              >
                Registrar
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
