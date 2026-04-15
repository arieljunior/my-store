import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { MemoryRouter } from "react-router";
import { darkTheme } from "../../src/theme";
import authReducer from "../../src/store/slices/auth-slice";
import cartReducer from "../../src/store/slices/cart-slice";
import type { ReactElement } from "react";
import type { RootState } from "../../src/store";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: Partial<RootState>;
  initialEntries?: string[];
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    initialEntries = ["/"],
    ...renderOptions
  }: RenderWithProvidersOptions = {},
) {
  const store = configureStore({
    reducer: {
      auth: authReducer as any,
      cart: cartReducer as any,
    },
    preloadedState,
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <MemoryRouter initialEntries={initialEntries}>
              {children}
            </MemoryRouter>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    );
  }

  return {
    store,
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
