import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router";
import { getImageUrlProduct } from "../utils/generateImageProduct";
import type { CartItem } from "../types";

interface OrderSummaryData {
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
  shippingCost: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
}

export const MOCK_ORDER_SUMMARY: OrderSummaryData = {
  orderNumber: "PED-2026-00142",
  createdAt: "14/04/2026 às 10:32",
  customerName: "Ariel Silva",
  customerEmail: "ariel@email.com",
  shippingAddress: "Rua das Flores, 123 - São Paulo, SP - CEP 01310-100",
  shippingCost: 0,
  totalAmount: 449.97,
  totalQuantity: 3,
  items: [
    {
      id: 1,
      documentId: "item-001",
      quantity: 2,
      product: {
        id: 10,
        documentId: "prod-001",
        title: "Tênis Runner Pro X",
        price: 149.99,
        image: undefined,
      },
    },
    {
      id: 2,
      documentId: "item-002",
      quantity: 1,
      product: {
        id: 20,
        documentId: "prod-002",
        title: "Mochila Urban Cargo 30L",
        price: 149.99,
        image: undefined,
      },
    },
  ],
};

function SummaryPage() {
  const {
    orderNumber,
    createdAt,
    items,
    totalAmount,
    totalQuantity,
    shippingCost,
    customerName,
    customerEmail,
    shippingAddress,
  } = MOCK_ORDER_SUMMARY;

  return (
    <Box>
      <Alert
        icon={<CheckCircle size={24} />}
        severity="success"
        sx={{ mb: 4, alignItems: "center" }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          Pedido realizado com sucesso!
        </Typography>
        <Typography variant="body2">
          Você receberá um e-mail de confirmação em breve.
        </Typography>
      </Alert>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Itens do pedido
              </Typography>
              <Chip
                label={`${totalQuantity} ${totalQuantity === 1 ? "item" : "itens"}`}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>

            <Divider sx={{ mb: 2 }} />

            {items.map((item) => {
              const imageUrl = getImageUrlProduct(item.product.image?.url);
              const subtotal = item.product.price * item.quantity;

              return (
                <Box key={item.documentId}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}
                  >
                    <Box
                      component="img"
                      src={imageUrl}
                      alt={item.product.title}
                      sx={{
                        width: 72,
                        height: 72,
                        objectFit: "cover",
                        borderRadius: 1,
                        flexShrink: 0,
                      }}
                    />

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" fontWeight={600} noWrap>
                        {item.product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qtd.: {item.quantity} &times; R${" "}
                        {item.product.price.toFixed(2)}
                      </Typography>
                    </Box>

                    <Typography variant="subtitle2" fontWeight={700}>
                      R$ {subtotal.toFixed(2)}
                    </Typography>
                  </Box>
                  <Divider />
                </Box>
              );
            })}
          </Paper>

          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Dados do cliente
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="text.secondary" minWidth={80}>
                  Nome:
                </Typography>
                <Typography variant="body2">{customerName}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="text.secondary" minWidth={80}>
                  E-mail:
                </Typography>
                <Typography variant="body2">{customerEmail}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2" color="text.secondary" minWidth={80}>
                  Endereço:
                </Typography>
                <Typography variant="body2">{shippingAddress}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Resumo do pedido
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Número do pedido
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {orderNumber}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Data
                </Typography>
                <Typography variant="body2">{createdAt}</Typography>
              </Box>

              <Divider />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Subtotal ({totalQuantity} itens)
                </Typography>
                <Typography variant="body2">
                  R$ {totalAmount.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Frete
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight={600}>
                  {shippingCost === 0 ? "Grátis" : `R$ ${shippingCost.toFixed(2)}`}
                </Typography>
              </Box>

              <Divider />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Total
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color="primary.main"
                >
                  R$ {(totalAmount + shippingCost).toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              component={Link}
              to="/products"
            >
              Continuar comprando
            </Button>

            <Button
              variant="outlined"
              fullWidth
              size="large"
              sx={{ mt: 1.5 }}
              component={Link}
              to="/"
            >
              Voltar à página inicial
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SummaryPage;
