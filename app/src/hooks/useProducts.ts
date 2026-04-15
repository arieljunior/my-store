import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { ResponseProducts } from "../types";
import { useDebounce } from "./useDebounce";
import { MINUTES_30 } from "../constants";

const PAGE_SIZE = 9;

export interface UseProductsReturn {
  data: ResponseProducts | undefined;
  isLoading: boolean;
  isError: boolean;
  page: number;
  setPage: (page: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  debouncedSearch: string;
  pageSize: number;
}

export function useProducts(): UseProductsReturn {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = PAGE_SIZE;

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

  return {
    data,
    isLoading,
    isError,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    debouncedSearch,
    pageSize,
  };
}
