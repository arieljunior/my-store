import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import type { Product } from "../types";
import { useQuery } from "@tanstack/react-query";
import { MINUTES_30 } from "../constants";
import { api } from "../services/api";
import { useCallback } from "react";
import { toast } from "react-toastify";
import ProductDetail, { ProductDetailSkeleton } from "../components/ProductDetail";
import { ArrowLeft } from "lucide-react";

interface ResponseSingleProduct {
  data: Product;
}

function PageProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery<ResponseSingleProduct>({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}?populate=image`);
      return response.data;
    },
    enabled: !!id,
    staleTime: MINUTES_30,
  });

  const handleAddToCart = useCallback(() => {
    toast.success(
      `Produto "${productData?.data.title}" adicionado ao carrinho!`,
    );
  }, [productData]);

  if (isLoading) {
    return (
      <Box py={4}>
        <ProductDetailSkeleton />
      </Box>
    );
  }

  if (isError || !productData) {
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h5" color="error" gutterBottom>
          Produto não encontrado.
        </Typography>
        <Button
          startIcon={<ArrowLeft />}
          onClick={() => navigate("/products")}
          sx={{ mt: 2 }}
        >
          Voltar para produtos
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowLeft />}
        onClick={() => navigate("/products")}
        sx={{ mb: 4, color: "text.secondary" }}
      >
        Voltar para a vitrine
      </Button>
      <ProductDetail onAddToCart={handleAddToCart} product={productData.data}/>
    </Box>
  );
}

export default PageProductDetail;
