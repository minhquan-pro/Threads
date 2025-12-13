import { http } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await http.post("/posts", postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await http.post(`/posts/${postId}`, {
        _method: "DELETE",
      });
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ commentId }, { rejectWithValue }) => {
    try {
      await http.post(`/posts/${commentId}`, {
        _method: "DELETE",
      });
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getPosts = createAsyncThunk(
  "posts/getList",
  async ({ type, page = 1, per_page = 10 }) => {
    const response = await http.get(
      `posts/feed?type=${type}&page=${page}&per_page=${per_page}`,
    );
    return response;
  },
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await http.get(`/posts/${postId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getPostById = async (postId) => {
  try {
    const response = await http.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};
