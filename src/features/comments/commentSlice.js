import { fetchComments, fetchReplies } from "@/services/comment";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byPostId: {},
  loading: {},
  pagination: {},
  repliesByCommentId: {},
  repliesLoading: {},
  repliesPagination: {},
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

    addReplyOptimistic: (state, action) => {
      const { commentId, ...replyData } = action.payload;
      if (!state.repliesByCommentId[commentId]) {
        state.repliesByCommentId[commentId] = [];
      }
      state.repliesByCommentId[commentId].unshift(replyData);
    },
    updateReply: (state, action) => {
      const { reply, idFake, commentId } = action.payload;
      const replies = state.repliesByCommentId[commentId];

      if (replies) {
        const replyIndex = replies.findIndex((r) => r.id === idFake);
        if (replyIndex !== -1) {
          state.repliesByCommentId[commentId][replyIndex] = reply;
        }
      }
    },
    removeOptimisticReply: (state, action) => {
      const { commentId, replyId } = action.payload;
      const replies = state.repliesByCommentId[commentId];

      if (replies) {
        state.repliesByCommentId[commentId] = replies.filter(
          (reply) => reply.id !== replyId,
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
    // fetch reply
    builder
      .addCase(fetchReplies.pending, (state, action) => {
        state.repliesLoading[action.meta.arg.commentId] = true;
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        const { commentId, replies, pagination } = action.payload;
        const oldComments = state.repliesByCommentId[commentId] || [];

        const newComments = replies.filter((newComment) => {
          return !oldComments?.some(
            (oldComment) => oldComment.id === newComment.id,
          );
        });
        state.repliesByCommentId[commentId] = [...oldComments, ...newComments];
        state.repliesLoading[commentId] = false;
        state.repliesPagination[commentId] = pagination;
      })
      .addCase(fetchReplies.rejected, (state, action) => {
        state.repliesLoading[action.meta.arg.postId] = false;
      });
  },
});

export const {
  addCommentOptimistic,
  updateComment,
  removeOptimisticComment,
  updateReply,
  addReplyOptimistic,
  removeOptimisticReply,
} = commentsSlice.actions;
export default commentsSlice;
