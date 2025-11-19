import { http } from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await http.post("/auth/login", data);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await http.post("/auth/logout");
    return response;
  } catch (error) {
    console.log(error);
  }
});
