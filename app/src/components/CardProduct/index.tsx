import { useNavigate } from "react-router";
import { HOST_API } from "../../services/api";
import type { Product } from "../../types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "lucide-react";
import { generateImageUrlProduct } from "../../utils/generateImageProduct";
export { default as CardSkeleton } from './Skeleton';

interface CardProductProps {
  product: Product;
}

function CardProduct({ product }: CardProductProps) {
  const navigate = useNavigate();

  const { documentId, title, price, description, image } = product;

  const imageUrl = generateImageUrlProduct(image?.url);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" gutterBottom noWrap>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color="primary.main" fontWeight="bold">
            R$ {price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<ShoppingCart size={18} />}
            onClick={() => navigate(`/product/${documentId}`)}
          >
            Ver Mais
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CardProduct;
