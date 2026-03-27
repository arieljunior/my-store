import { Grid, Typography } from "@mui/material";
import type { ResponseProducts } from "../../types";
import CardProduct, { CardSkeleton } from "../CardProduct";
import { PaginationCustom } from "../PaginationCustom";

interface ProductListProps {
  isLoading: boolean;
  isError: boolean;
  data?: ResponseProducts;
  searchText: string;
  page: number;
  totalPage?: number;
  setPage: (page: number) => void;
}
function ProductList({
  isLoading,
  isError,
  data,
  searchText,
  page,
  setPage,
  totalPage = 6,
}: ProductListProps) {
  if (isLoading) {
    return (
      <Grid container spacing={4}>
        {Array.from(new Array(totalPage)).map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <CardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" sx={{ py: 5 }}>
        Erro ao carregar os produtos.
      </Typography>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <Typography align="center" color="text.secondary" sx={{ py: 5 }}>
        Nenhum produto encontrado para "{searchText}".
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={4}>
        {data.data.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.documentId}>
            <CardProduct product={product} />
          </Grid>
        ))}
      </Grid>

      <PaginationCustom
        pageCount={data?.meta?.pagination?.pageCount || 0}
        page={page}
        onChange={setPage}
      />
    </>
  );
}

export default ProductList;
