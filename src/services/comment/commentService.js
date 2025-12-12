import { http } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createComments = async ({ id, content, reply_permission }) => {
  try {
    const response = await http.post(`/posts/${id}/reply`, {
      content,
      reply_permission,
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchComments = createAsyncThunk(
  "comments/fetchByPost",
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
      throw error;
    }
  },
);

export const fetchReplies = createAsyncThunk(
  "comments/fetchByComment",
  async ({ commentId, page = 1, per_page = 10 }) => {
    try {
      const response = await http.get(
        `posts/${commentId}/replies?page=${page}&per_page=${per_page}`,
      );

      return {
        commentId,
        replies: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

// Helper function - không dùng createAsyncThunk
export const getReplies = async (commentId) => {
  try {
    const response = await http.get(`comments/${commentId}/replies`); // ✅ Sửa endpoint
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
