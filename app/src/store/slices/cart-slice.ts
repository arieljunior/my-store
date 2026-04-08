import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import type { RootState } from "..";
import { logout } from "./auth-slice";
import type { CartItem, Product, ResponseCartItems } from "../../types";
import { calculateTotals } from "../../utils/calculateTotals";

const StatusCart = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
} as const;

type StatusCart = (typeof StatusCart)[keyof typeof StatusCart];

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
  status: StatusCart;
  error: string | null;
  processingItemIds: string[];
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  status: StatusCart.IDLE,
  error: null,
  processingItemIds: [],
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ResponseCartItems>(
        "/cart-itens?populate[product][populate][image]=*",
      );
      return data.data
    } catch {
      return rejectWithValue("Não foi possível carregar o carrinho.");
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { documentId, quantity }: { documentId: string; quantity: number },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await api.put(`/cart-itens/${documentId}`, {
        data: { quantity },
      });
      return data.data as CartItem;
    } catch {
      return rejectWithValue("Não foi possível atualizar o item.");
    }
  },
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem", 
  async (product: Product, { dispatch, rejectWithValue }) =>{
    try{
      const { data: existing } = await api.get<ResponseCartItems>(
        `/cart-itens?filters[product][documentId][$eq]=${product.documentId}&populate[product][populate][image]=*`,
      );
      const existingItem = existing.data[0] ?? null;

      if(existingItem){
        await dispatch(
          updateCartItem({
            documentId: existingItem.documentId,
            quantity: existingItem.quantity + 1,
          }),
        );
        return null;
      }

      const { data } = await api.post("/cart-itens", {
        data: {
          product: product.documentId,
          quantity: 1,
        },
      });

      return { ...data.data, product } as CartItem;
    } catch {
      return rejectWithValue("Não foi possível adicionar o item ao carrinho.");
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (documentId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/cart-itens/${documentId}`);
      return documentId;
    } catch {
      return rejectWithValue("Não foi possível remover o item.");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return initialState;
    });

    builder.addCase(fetchCartItems.pending, (state) => {
      state.status = StatusCart.LOADING;
      state.error = null;
    });

    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.status = StatusCart.SUCCEEDED;
      state.items = action.payload;
      const totals = calculateTotals(action.payload);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
    });

    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.status = StatusCart.FAILED;
      state.items = [];
      state.error = action.payload as string;
    });

    builder.addCase(addCartItem.fulfilled, (state, action) => {
      if (action.payload) {
        state.items.push(action.payload);
        const totals = calculateTotals(state.items);
        state.totalAmount = totals.totalAmount;
        state.totalQuantity = totals.totalQuantity;
      }
    });

    builder.addCase(updateCartItem.pending, (state, action) => {
      state.processingItemIds.push(action.meta.arg.documentId);
    });

    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      state.processingItemIds = state.processingItemIds.filter(
        (id) => id !== action.meta.arg.documentId,
      );
      const index = state.items.findIndex(
        (item) => item.documentId === action.payload.documentId,
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.processingItemIds = state.processingItemIds.filter(
        (id) => id !== action.meta.arg.documentId,
      );
    });

    builder.addCase(removeCartItem.pending, (state, action) => {
      state.processingItemIds.push(action.meta.arg);
    });

    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      state.processingItemIds = state.processingItemIds.filter(
        (id) => id !== action.payload,
      );
      state.items = state.items.filter(
        (item) => item.documentId !== action.payload,
      );
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
    });
    builder.addCase(removeCartItem.rejected, (state, action) => {
      state.processingItemIds = state.processingItemIds.filter(
        (id) => id !== action.meta.arg,
      );
    });
  },
});

export const selectCart = (state: RootState) => state.cart;
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
