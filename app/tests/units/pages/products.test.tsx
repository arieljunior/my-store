import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Products from "../../../src/pages/products";
import { renderWithProviders } from "../../helpers/render-with-providers";
import { useProducts } from "../../../src/hooks/useProducts";
import type { UseProductsReturn } from "../../../src/hooks/useProducts";
import type { ResponseProducts } from "../../../src/types";

jest.mock("../../../src/hooks/useProducts");

jest.mock("../../../src/services/api", () => ({
  HOST_API: "http://localhost:1337",
  api: {
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
}));

const mockSetPage = jest.fn();
const mockSetSearchTerm = jest.fn();

const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;

const mockResponseProducts: ResponseProducts = {
  data: [
    {
      id: 1,
      documentId: "abc123",
      title: "Teclado Mecânico",
      description: "Teclado mecânico com switches azuis",
      price: 299.99,
      stock: 10,
      image: { url: "/uploads/teclado.png" },
    },
    {
      id: 2,
      documentId: "def456",
      title: "Mouse Gamer",
      description: "Mouse gamer com 6 botões",
      price: 149.99,
      stock: 5,
      image: { url: "/uploads/mouse.png" },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageCount: 3,
      pageSize: 9,
      total: 25,
    },
  },
};

const defaultHookReturn: UseProductsReturn = {
  data: mockResponseProducts,
  isLoading: false,
  isError: false,
  page: 1,
  setPage: mockSetPage,
  searchTerm: "",
  setSearchTerm: mockSetSearchTerm,
  debouncedSearch: "",
  pageSize: 9,
};

function renderProducts() {
  return renderWithProviders(<Products />);
}

describe("Products", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseProducts.mockReturnValue(defaultHookReturn);
  });

  it('deve renderizar o título "Nossos Produtos"', () => {
    renderProducts();

    expect(
      screen.getByRole("heading", { name: /nossos produtos/i })
    ).toBeInTheDocument();
  });

  it('deve renderizar o placeholder "Buscar por nome ou descrição..." no campo de busca', () => {
    renderProducts();

    expect(
      screen.getByPlaceholderText("Buscar por nome ou descrição...")
    ).toBeInTheDocument();
  });

  it("deve renderizar os cards de produto", () => {
    renderProducts();

    expect(screen.getByText("Teclado Mecânico")).toBeInTheDocument();
    expect(screen.getByText("Mouse Gamer")).toBeInTheDocument();
  });

  it("deve exibir os skeletons durante o estado de loading", () => {
    mockUseProducts.mockReturnValue({
      ...defaultHookReturn,
      data: undefined,
      isLoading: true,
    });

    renderProducts();

    expect(screen.queryByText("Teclado Mecânico")).not.toBeInTheDocument();
    expect(screen.queryByText("Mouse Gamer")).not.toBeInTheDocument();
  });

  it("deve exibir mensagem de erro quando isError for verdadeiro", () => {
    mockUseProducts.mockReturnValue({
      ...defaultHookReturn,
      data: undefined,
      isError: true,
    });

    renderProducts();

    expect(
      screen.getByText("Erro ao carregar os produtos.")
    ).toBeInTheDocument();
  });

  it("deve chamar setSearchTerm ao digitar no campo de busca", async () => {
    const user = userEvent.setup();

    renderProducts();

    const input = screen.getByPlaceholderText("Buscar por nome ou descrição...");
    await user.type(input, "teclado");

    expect(mockSetSearchTerm).toHaveBeenCalled();
  });

  it("deve chamar setPage ao trocar de página", async () => {
    const user = userEvent.setup();

    mockUseProducts.mockReturnValue({
      ...defaultHookReturn,
      page: 1,
    });

    renderProducts();

    const page2Button = screen.getByRole("button", { name: /go to page 2/i });
    await user.click(page2Button);

    expect(mockSetPage).toHaveBeenCalledWith(2);
  });
});
