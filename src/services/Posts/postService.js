import { http } from "@/utils";
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

export const getPostById = async (postId) => {
  try {
    const response = await http.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const likePost = async (postId) => {
  try {
    const response = await http.post(`/posts/${postId}/like`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const repostPost = async (postId) => {
  try {
    const response = await http.post(`/posts/${postId}/repost`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const quotePost = async (postId, data) => {
  try {
    const response = await http.post(`posts/${postId}/quote`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
