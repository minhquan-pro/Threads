import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get("auth/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  },
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/auth/login", data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
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
      return rejectWithValue(error.response?.data || error.message);
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
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Reset password
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/auth/reset-password", data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await http.post("/auth/logout");
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const validateToken = async ({ token }) => {
  try {
    const response = await http.get(
      `/auth/reset-password/validate?token=${token}`,
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const checkExistEmail = async (email) => {
  const response = await http.post("auth/validate/email", { email });
  return response.data.available;
};

export const checkExistUsername = async (username) => {
  const response = await http.post("auth/validate/username", { username });
  return response.data.available;
};

// Verify email
export const verifyEmail = createAsyncThunk(
  "auth/verify-email",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/auth/verify-email", data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
