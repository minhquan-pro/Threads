import { http } from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "posts/getList",
  async ({ type, page = 1, per_page = 10 }) => {
    const response = await http.get(
      `posts/feed?type=${type}&page=${page}&per_page=${per_page}`,
    );
    return response;
  },
);
