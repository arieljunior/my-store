import { Box, Button, Typography } from "@mui/material";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

export function CartEmpty() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
        gap: 2,
        color: "text.secondary",
      }}
    >
      <ShoppingCart size={64} strokeWidth={1} />
      <Typography variant="h6" fontWeight={600}>
        Seu carrinho está vazio
      </Typography>
      <Typography variant="body2">
        Adicione produtos para continuar comprando.
      </Typography>
      <Button
        component={Link}
        to="/products"
        variant="contained"
        sx={{ mt: 1 }}
      >
        Ver produtos
      </Button>
    </Box>
  );
}