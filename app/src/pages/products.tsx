import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Box, TextField, Typography } from "@mui/material";
import type { ResponseProducts } from "../types";
import ProductList from "../components/ProductList";
import { useDebounce } from "../hooks/useDebounce";
import { MINUTES_30 } from "../constants";


function Products() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = 1;

  const debouncedSearch = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useQuery<ResponseProducts>({
    queryKey: ["products", page, debouncedSearch],
    queryFn: async () => {
      let url = `/products?populate=image&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

      if (debouncedSearch) {
        url += `&filters[$or][0][title][$containsi]=${debouncedSearch}`;
        url += `&filters[$or][1][description][$containsi]=${debouncedSearch}`;
      }
      const { data } = await api.get(url);
      return data;
    },
    staleTime: MINUTES_30,
    placeholderData: (previousData) => previousData,
  });

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 4, color: "primary.main" }}
      >
        Nossos Produtos
      </Typography>

      <SearchBar onChange={setSearchTerm} value={searchTerm} />
      <ProductList
        isLoading={isLoading}
        isError={isError}
        data={data}
        searchText={debouncedSearch}
        page={page}
        setPage={setPage}
        totalPage={pageSize}
      />
    </Box>
  );
}

export default Products;

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <Box sx={{ mb: 4 }}>
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Buscar por nome ou descrição..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ backgroundColor: "background.paper", borderRadius: 1 }}
    />
  </Box>
);
