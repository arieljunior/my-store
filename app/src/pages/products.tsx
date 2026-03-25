import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Box, CircularProgress, Typography } from "@mui/material";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: {
    url: string;
  };
}

interface ResponseProducts {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

function Products() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = 6;

  const { 
    data, 
    isLoading, 
    isError, 
    isStale, 
    refetch,
    
} = useQuery<ResponseProducts>({
    queryKey: ["products", page, searchTerm],
    queryFn: async () => {
      let url = `/products?populate=image&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

      if (searchTerm) {
        url += `&filters[$or][0][title][$containsi]=${searchTerm}`;
        url += `&filters[$or][1][description][$containsi]=${searchTerm}`;
      }
      const { data } = await api.get(url);
      return data;
    },
    staleTime: 30 * 1000,
    // refetchInterval: 5 * 1000
    // placeholderData: (previousData) => previousData
  });


//   useEffect(()=>{
//     if(isStale){
//         refetch()
//     }
//   },[isStale])
  return (
    <Box>
      {isLoading ? (
        <Box display="flex" justifyContent="center" py={10}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error" align="center">
          Erro ao carregar os produtos.
        </Typography>
      ) : (
        <>{JSON.stringify(data)}</>
      )}
    </Box>
  );
}

export default Products;
