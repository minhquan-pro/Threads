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
      const { postId, ...commentData } = action.payload;
      if (!state.byPostId[postId]) state.byPostId[postId] = [];
      state.byPostId[postId].unshift(commentData);
    },
    updateComment: (state, action) => {
      const { reply, idFake, postId } = action.payload;
      const comments = state.byPostId[postId];

      if (comments) {
        const commentIndex = comments.findIndex(
          (comment) => comment.id === idFake,
        );
        if (commentIndex !== -1) {
          state.byPostId[postId][commentIndex] = reply;
        }
      }
    },
    removeOptimisticComment: (state, action) => {
      const { postId, commentId } = action.payload;
      const comments = state.byPostId[postId];

      if (comments) {
        state.byPostId[postId] = comments.filter(
          (comment) => comment.id !== commentId,
        );
      }
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
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading[action.meta.arg.postId] = false;
      });
  },
});

export const { addCommentOptimistic, updateComment, removeOptimisticComment } =
  commentsSlice.actions;
export default commentsSlice;
