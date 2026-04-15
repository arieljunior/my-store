import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useQuery } from "@tanstack/react-query";
import PageProductDetail from "../../../src/pages/product-detail";
import { renderWithProviders } from "../../helpers/render-with-providers";
import { api } from "../../../src/services/api";
import { MINUTES_30 } from "../../../src/constants";
import type { Product } from "../../../src/types";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "1" }),
}));

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

jest.mock("../../../src/services/api", () => ({
  HOST_API: "http://localhost:1337",
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
}));

const mockToastSuccess = jest.fn();
const mockToastError = jest.fn();

jest.mock("react-toastify", () => ({
  toast: {
    success: (...args: unknown[]) => mockToastSuccess(...args),
    error: (...args: unknown[]) => mockToastError(...args),
  },
}));

const mockProduct: Product = {
  id: 1,
  documentId: "abc123",
  title: "Teclado Mecânico",
  description: "Um teclado mecânico de alta qualidade",
  price: 299.99,
  stock: 10,
  image: { url: "/uploads/teclado.png" },
};

const mockUseQuery = useQuery as jest.Mock;
const mockApiGet = api.get as jest.Mock;
const mockApiPost = api.post as jest.Mock;

function renderProductDetail(preloadedState?: Record<string, unknown>) {
  return renderWithProviders(<PageProductDetail />, {
    preloadedState: {
      auth: {
        isAuthenticated: true,
        token: "fake-token",
        user: { id: 1, username: "test", email: "test@test.com" },
      },
      ...preloadedState,
    },
  });
}

describe("PageProductDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseQuery.mockReturnValue({
      data: { data: mockProduct },
      isLoading: false,
      isError: false,
    });
  });

  describe("1 - Requisição GET", () => {
    it("deve chamar a api com o endpoint correto contendo o id do produto", async () => {
      mockApiGet.mockResolvedValue({ data: { data: mockProduct } });
      renderProductDetail();

      const { queryFn } = mockUseQuery.mock.calls[0][0];
      await queryFn();

      expect(mockApiGet).toHaveBeenCalledWith("/products/1?populate=image");
    });
  });

  describe("2 - Configuração do useQuery", () => {
    it('deve usar queryKey com ["product", "1"]', () => {
      renderProductDetail();

      const { queryKey } = mockUseQuery.mock.calls[0][0];
      expect(queryKey).toEqual(["product", "1"]);
    });

    it("deve ter enabled como true quando id está definido", () => {
      renderProductDetail();

      const { enabled } = mockUseQuery.mock.calls[0][0];
      expect(enabled).toBe(true);
    });

    it(`deve ter staleTime igual a MINUTES_30 (${MINUTES_30}ms)`, () => {
      renderProductDetail();

      const { staleTime } = mockUseQuery.mock.calls[0][0];
      expect(staleTime).toBe(MINUTES_30);
    });
  });

  describe("3 - handleAddToCart", () => {
    it("deve redirecionar para /login quando usuário não está autenticado", async () => {
      const user = userEvent.setup();

      renderProductDetail({
        auth: {
          isAuthenticated: false,
          token: undefined,
          user: undefined,
        },
      });

      await user.click(screen.getByText("Adicionar ao Carrinho"));

      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it("deve chamar toast.success com a mensagem correta ao adicionar produto com sucesso", async () => {
      mockApiGet.mockResolvedValue({ data: { data: [] } });
      mockApiPost.mockResolvedValue({
        data: { data: { id: 10, documentId: "cart-item-1", quantity: 1 } },
      });

      const user = userEvent.setup();
      renderProductDetail();

      await user.click(screen.getByText("Adicionar ao Carrinho"));

      await waitFor(() => {
        expect(mockToastSuccess).toHaveBeenCalledWith(
          `Produto "${mockProduct.title}" adicionado ao carrinho!`,
        );
      });
    });

    it("deve chamar toast.error quando falha ao adicionar produto", async () => {
      mockApiGet.mockRejectedValue(new Error("Erro de rede"));

      const user = userEvent.setup();
      renderProductDetail();

      await user.click(screen.getByText("Adicionar ao Carrinho"));

      await waitFor(() => {
        expect(mockToastError).toHaveBeenCalledWith(
          "Não foi possível adicionar o produto ao carrinho.",
        );
      });
    });
  });

  describe("4 - Estado de loading", () => {
    it("deve exibir o skeleton de loading enquanto os dados carregam", () => {
      mockUseQuery.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      });

      renderProductDetail();

      expect(screen.getByTestId("product-detail-loading")).toBeInTheDocument();
    });
  });

  describe("5 - Estado de error", () => {
    beforeEach(() => {
      mockUseQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
      });
    });

    it('deve exibir o texto "Voltar para produtos"', () => {
      renderProductDetail();

      expect(screen.getByTestId("product-detail-error")).toBeInTheDocument();
      expect(screen.getByText("Voltar para produtos")).toBeInTheDocument();
    });

    it('deve navegar para "/products" ao clicar em "Voltar para produtos"', async () => {
      const user = userEvent.setup();
      renderProductDetail();

      await user.click(screen.getByText("Voltar para produtos"));

      expect(mockNavigate).toHaveBeenCalledWith("/products");
    });
  });

  describe('6 - Botão "Voltar para a vitrine"', () => {
    it('deve exibir o texto "Voltar para a vitrine"', () => {
      renderProductDetail();

      expect(screen.getByText("Voltar para a vitrine")).toBeInTheDocument();
    });

    it('deve navegar para "/products" ao clicar em "Voltar para a vitrine"', async () => {
      const user = userEvent.setup();
      renderProductDetail();

      await user.click(screen.getByText("Voltar para a vitrine"));

      expect(mockNavigate).toHaveBeenCalledWith("/products");
    });
  });
});
