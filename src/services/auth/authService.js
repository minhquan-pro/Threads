import { http } from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/auth/loginn", data);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/auth/register", data);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

// Forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/auth/forgot-password", data);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const validateToken = async ({ token }) => {
  try {
    const response = await http.get(
      `auth/reset-password/validate?token=${token}`,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await http.post("/auth/logout");
    return response;
  } catch (error) {
    console.log(error);
  }
});
