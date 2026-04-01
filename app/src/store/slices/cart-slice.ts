import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import type { RootState } from "..";
import { logout } from "./auth-slice";
import type { CartItem } from "../../types";

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
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  status: StatusCart.IDLE,
  error: null,
};

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
  },
});

export const selectAuth = (state: RootState) => state.cart;
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
