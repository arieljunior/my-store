import { Box, TextField, Typography } from "@mui/material";
import ProductList from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";


function Products() {
  const {
    data,
    isLoading,
    isError,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    debouncedSearch,
    pageSize,
  } = useProducts();

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
