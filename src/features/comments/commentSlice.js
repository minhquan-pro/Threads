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
      state.byPostId[postId].push(comment);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.loading[action.meta.arg] = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments, pagination } = action.payload;

        const oldComments = state.byPostId[postId] || [];
        state.pagination[postId] = pagination;

        const newComments = comments.filter((newComment) => {
          return !oldComments?.some(
            (oldComment) => oldComment.id === newComment.id,
          );
        });

        state.byPostId[postId] = [...oldComments, ...newComments];
        state.loading[postId] = false;
      });
  },
});

export const { addCommentOptimistic } = commentsSlice.actions;
export default commentsSlice;
