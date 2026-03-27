export interface ResponseProducts {
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

export interface Product {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  image?: {
    url: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}