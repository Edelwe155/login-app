import { createSlice } from "@reduxjs/toolkit";

interface InitialAuthStateProps {
  user: { email: string } | null;
  isLoginLoading: boolean;
  isLogoutLoading: boolean;
  isRegisterLoading: boolean;
}

const INITIAL_USER: InitialAuthStateProps = {
  user: null,
  isLoginLoading: false,
  isLogoutLoading: false,
  isRegisterLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_USER,
  reducers: {
    login: (state, action) => {
      state.isLoginLoading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoginLoading = false;
    },
    loginFailure: (state, action) => {
      state.isLoginLoading = false;
    },
    logout: (state, action) => {
      state.user = null;
      state.isLogoutLoading = true;
    },
    logoutSuccess: (state) => {
      state.isLogoutLoading = false;
    },
    logoutFailure: (state) => {
      state.isLogoutLoading = false;
    },
    register: (state, action) => {
      state.isRegisterLoading = true;
    },
    registerSuccess: (state) => {
      state.isRegisterLoading = false;
    },
    registerFailure: (state) => {
      state.isRegisterLoading = false;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  register,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export default authSlice.reducer;
