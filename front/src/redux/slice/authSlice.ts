import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // 1. slice 생성
import { JwtPayload } from "jwt-decode";

export interface ExtendedJwtPayload extends JwtPayload {
  given_name: string;
  sub: string;
}
export interface AuthState {
  authData: ExtendedJwtPayload;
  token: string;
}
const initialState: Partial<AuthState> = {
  authData: JSON.parse(localStorage.getItem("authData") + "") || undefined,
  token: localStorage.getItem("token") || undefined,
};

export const authSlice = createSlice({
  // 3 slice 생성
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.authData = action.payload.authData;
      state.token = action.payload.token;
      localStorage.setItem("authData", JSON.stringify(action.payload.authData));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.authData = undefined;
      state.token = undefined;
      localStorage.removeItem("authData");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer; // 4. export 된 함수들을 store에 등록
