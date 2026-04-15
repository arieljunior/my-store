import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../../../src/pages/home";
import { MemoryRouter } from "react-router";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("Home", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  function renderHome() {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  }

  it('deve renderizar o titulo "Tech & Code Store"', () => {
    renderHome();
    expect(
      screen.getByRole("heading", { name: /tech & code store/i })
    ).toBeInTheDocument();
  });

  it("deve renderizar o texto descritivo da loja", () => {
    renderHome();
    expect(
      screen.getByText(
        "A loja oficial para programadores que buscam performance, estilo e as melhores ferramentas para o dia a dia."
      )
    ).toBeInTheDocument();
  });

  describe("Features", () => {
    const expectedFeatures = [
      {
        title: "Entrega Rápida",
        description:
          "Receba seus produtos em tempo recorde em todo o Brasil.",
      },
      {
        title: "Compra Segura",
        description:
          "Seus dados protegidos com criptografia de ponta a ponta.",
      },
      {
        title: "Suporte 24/7",
        description:
          "Nossa equipe de especialistas pronta para te ajudar.",
      },
    ];

    it.each(expectedFeatures)(
      'deve renderizar a feature "$title" com sua descricao',
      ({ title, description }) => {
        renderHome();
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
      }
    );

  });

  describe("Botao Explorar Produtos", () => {
    it('deve renderizar o botao "Explorar Produtos"', () => {
      renderHome();
      // expect(
      //   screen.getByTestId("explore-products-button")
      // ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /explorar produtos/i })
      ).toBeInTheDocument();
    });

    it("deve navegar para /products ao clicar no botao", async () => {
      const user = userEvent.setup();

      renderHome();

      const button = screen.getByTestId("explore-products-button");
      await user.click(button);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/products");
    });
  });
});
