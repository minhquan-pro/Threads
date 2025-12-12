import {
  forgotPassword,
  getCurrentUser,
  login,
  logout,
  register,
  resetPassword,
} from "@/services/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingCurrentUser: false,
  currentUser: null,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state) => {
  state.loading = false;
  state.error = "Có lỗi xảy ra";
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GetCurrentUser
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loadingCurrentUser = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loadingCurrentUser = false;
        state.error = null;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loadingCurrentUser = false;
        state.error =
          action.payload?.message || "Không thể tải thông tin người dùng";
      });

    // Login
    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, handleRejected);

    // Register
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, handleRejected);

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, handlePending)
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, handleRejected);

    // Reset Password
    builder
      .addCase(resetPassword.pending, handlePending)
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, handleRejected);

    // Logout
    builder
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.currentUser = null;
      })
      .addCase(logout.rejected, handleRejected);
  },
});

export const { setCurrentUser, clearError } = authSlice.actions;
export default authSlice;
