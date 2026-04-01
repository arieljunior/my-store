import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types";
import type { RootState } from "..";

interface AuthState {
  user?: User;
  token?: string;
  isAuthenticated: boolean;
}

const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const initialState: AuthState = {
  isAuthenticated: !!savedToken,
  token: savedToken || undefined,
  user: savedUser ? JSON.parse(savedUser) : undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = undefined;
      state.token = undefined;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
