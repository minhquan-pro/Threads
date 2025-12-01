import { fetchComments } from "@/services/comment";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byPostId: {},
  loading: {},
  pagination: {},
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addCommentOptimistic: (state, action) => {
      const { postId, comment } = action.payload;
      if (!state.byPostId[postId]) state.byPostId[postId] = [];
      state.byPostId[postId].unshift(comment);
    },
  },
  extraReducers: (builder) => {
    // fetch comments
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.loading[action.meta.arg.postId] = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments, pagination } = action.payload;
        const oldComments = state.byPostId[postId] || [];

        const newComments = comments.filter((newComment) => {
          return !oldComments?.some(
            (oldComment) => oldComment.id === newComment.id,
          );
        });

        state.byPostId[postId] = [...oldComments, ...newComments];
        state.loading[postId] = false;
        state.pagination[postId] = pagination;
      });
  },
});

export const { addCommentOptimistic } = commentsSlice.actions;
export default commentsSlice;
