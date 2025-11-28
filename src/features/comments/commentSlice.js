import { fetchComments } from "@/services/Posts/postService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byPostId: {},
  loading: {},
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addCommentOptimistic: (state, action) => {
      const { postId, comment } = action.payload;
      if (!state.byPostId[postId]) state.byPostId[postId] = [];
      state.byPostId[postId].push(comment);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.loading[action.meta.arg] = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.byPostId[postId] = comments;
        state.loading[postId] = false;
      });
  },
});

export const { addCommentOptimistic } = commentsSlice.actions;
export default commentsSlice;
