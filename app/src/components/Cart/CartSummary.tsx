import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router";

interface CartSummaryProps {
  totalAmount: number;
  totalQuantity: number;
}
function CartSummary({ totalAmount, totalQuantity }: CartSummaryProps) {
  const navigator = useNavigate();
  
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Resumo do pedido
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Itens ({totalQuantity})
        </Typography>
        <Typography variant="body2">R$ {totalAmount.toFixed(2)}</Typography>
      </Box>
       <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          Total
        </Typography>
        <Typography variant="subtitle1" fontWeight={700} color="primary.main">
          R$ {totalAmount.toFixed(2)}
        </Typography>
      </Box>

      <Button variant="contained" fullWidth size="large" onClick={()=> navigator("/summary")}>
        Finalizar compra
      </Button>
    </Paper>
  );
}

export default CartSummary;
