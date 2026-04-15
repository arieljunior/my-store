import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../helpers/render-with-providers";
import SummaryPage, { MOCK_ORDER_SUMMARY } from "../../../src/pages/summary";

describe("SummaryPage", () => {
  function renderSummary() {
    return renderWithProviders(<SummaryPage />, {
      initialEntries: ["/summary"],
    });
  }

  it("deve exibir a mensagem de sucesso do pedido", () => {
    renderSummary();
    expect(
      screen.getByText(/pedido realizado com sucesso/i)
    ).toBeInTheDocument();
  });

  it("deve exibir o número do pedido", () => {
    renderSummary();
    expect(
      screen.getByText(MOCK_ORDER_SUMMARY.orderNumber)
    ).toBeInTheDocument();
  });

  it("deve exibir a data do pedido", () => {
    renderSummary();
    expect(
      screen.getByText(MOCK_ORDER_SUMMARY.createdAt)
    ).toBeInTheDocument();
  });

  it("deve listar todos os itens do pedido", () => {
    renderSummary();
    MOCK_ORDER_SUMMARY.items.forEach((item) => {
      expect(screen.getByText(item.product.title)).toBeInTheDocument();
    });
  });

  it("deve exibir o subtotal corretamente", () => {
    renderSummary();
    const totalFormatted = `R$ ${MOCK_ORDER_SUMMARY.totalAmount.toFixed(2)}`;
    const occurrences = screen.getAllByText(totalFormatted);
    expect(occurrences.length).toBeGreaterThan(0);
  });

  it('deve exibir o frete como "Grátis" quando shippingCost for 0', () => {
    renderSummary();
    expect(screen.getByText("Grátis")).toBeInTheDocument();
  });

  it("deve exibir o nome do cliente", () => {
    renderSummary();
    expect(
      screen.getByText(MOCK_ORDER_SUMMARY.customerName)
    ).toBeInTheDocument();
  });

  it("deve exibir o e-mail do cliente", () => {
    renderSummary();
    expect(
      screen.getByText(MOCK_ORDER_SUMMARY.customerEmail)
    ).toBeInTheDocument();
  });

  it("deve exibir o endereço de entrega", () => {
    renderSummary();
    expect(
      screen.getByText(MOCK_ORDER_SUMMARY.shippingAddress)
    ).toBeInTheDocument();
  });

  it('deve renderizar o botão "Continuar comprando"', () => {
    renderSummary();
    expect(
      screen.getByRole("link", { name: /continuar comprando/i })
    ).toBeInTheDocument();
  });

  it('deve renderizar o botão "Voltar à página inicial"', () => {
    renderSummary();
    expect(
      screen.getByRole("link", { name: /voltar à página inicial/i })
    ).toBeInTheDocument();
  });
});
