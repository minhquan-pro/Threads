import { http } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createComments = async (id, data) => {
  try {
    await http.post(`/posts/${id}/reply`, data);
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchComments = createAsyncThunk(
  "posts/getReply",
  async ({ postId, page = 1, per_page = 10 }) => {
    try {
      const response = await http.get(
        `posts/${postId}/replies?page=${page}&per_page=${per_page}`,
      );
      return {
        postId,
        comments: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      console.log(error);
    }
  },
);

export const getReplies = async (postId) => {
  try {
    const response = await http.get(`posts/${postId}/replies`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
