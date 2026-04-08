import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import type { Product } from "../../types";
import { getImageUrlProduct } from "../../utils/generateImageProduct";
export { default as ProductDetailSkeleton } from './Skeleton';

interface ProductDetailProps {
  onAddToCart: () => void;
  product: Product;
}

function ProductDetail({ onAddToCart, product }: ProductDetailProps) {
  const { title, price, description, image, stock } = product;
  const imageUrl = getImageUrlProduct(image?.url);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "background.paper",
        borderRadius: 3,
      }}
    >
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={imageUrl}
            alt={title}
            sx={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "contain",
              borderRadius: 2,
              backgroundColor: "#fff",
              p: 2,
            }}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h3" component="h1" fontWeight="800" gutterBottom>
            {title}
          </Typography>

          <Typography
            variant="h4"
            color="primary.main"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            R$ {price.toFixed(2)}
          </Typography>

          <Divider sx={{ mb: 3, borderColor: "gray" }} />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8, flexGrow: 1 }}
          >
            {description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, flexGrow: 1, mb: 2 }}
          >
            Quantidade: {stock}
          </Typography>

          <Box display="flex" gap={3} mb={4} color="text.secondary">
            <Box display="flex" alignItems="center" gap={1}>
              <Truck size={20} color="#90caf9" />
              <Typography variant="body2">Frete Grátis</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <ShieldCheck size={20} color="#90caf9" />
              <Typography variant="body2">Garantia de 1 ano</Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCart />}
            onClick={onAddToCart}
            sx={{
              py: 2,
              fontSize: "1.1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            fullWidth
          >
            Adicionar ao Carrinho
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProductDetail;
