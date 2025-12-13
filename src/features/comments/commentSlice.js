import { fetchComments, fetchReplies } from "@/services/comment";
import { deleteComment } from "@/services/Posts";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byPostId: {},
  loading: {},
  pagination: {},
  repliesByCommentId: {},
  repliesLoading: {},
  repliesPagination: {},
  backup: {},
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addCommentOptimistic: (state, action) => {
      const { postId, parentId, ...commentData } = action.payload;
      if (!parentId) {
        if (!state.byPostId[postId]) state.byPostId[postId] = [];
        state.byPostId[postId].unshift(commentData);
      } else {
        if (!state.repliesByCommentId[parentId]) {
          state.repliesByCommentId[parentId] = [];
        }
        state.repliesByCommentId[parentId].unshift(commentData);

        const postComments = state.byPostId[postId] || [];
        const parentInPost = postComments.find((c) => c.id === parentId);
        if (parentInPost) {
          parentInPost.replies_count = parentInPost.replies_count + 1;
        } else {
          Object.keys(state.repliesByCommentId).forEach((key) => {
            const replies = state.repliesByCommentId[key];
            const parentInReplies = replies.find((c) => c.id === parentId);
            if (parentInReplies) {
              parentInReplies.replies_count =
                (parentInReplies.replies_count || 0) + 1;
            }
          });
        }
      }
    },
    updateComment: (state, action) => {
      const { reply, idFake, postId, parentId } = action.payload;
      if (!parentId) {
        const comments = state.byPostId[postId];
        if (comments) {
          const commentIndex = comments.findIndex((c) => c.id === idFake);
          if (commentIndex !== -1) {
            state.byPostId[postId][commentIndex] = reply;
          }
        }
      } else {
        const replies = state.repliesByCommentId[parentId];
        if (replies) {
          const replyIndex = replies.findIndex((c) => c.id === idFake);
          if (replyIndex !== -1) {
            state.repliesByCommentId[parentId][replyIndex] = reply;
          }
        }
      }
    },
    removeOptimisticComment: (state, action) => {
      const { postId, commentId, parentId } = action.payload;
      if (!parentId) {
        const comments = state.byPostId[postId];
        if (comments) {
          state.byPostId[postId] = comments.filter((c) => c.id !== commentId);
        }
      }
    },

    optimisticUpdateLikeComment: (state, action) => {
      const { parentId, postId, isLiked } = action.payload;
      const comments = state.byPostId[parentId];
      const comment = comments?.find((c) => c.id === postId);
      if (comment) {
        comment.likes_count += isLiked ? -1 : 1;
      } else {
        const replies = state.repliesByCommentId[parentId];
        const reply = replies?.find((r) => r.id === postId);
        if (reply) {
          reply.likes_count += isLiked ? -1 : 1;
        }
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

    // Delete comment
    builder
      .addCase(deleteComment.pending, (state, action) => {
        const { commentId, parentId } = action.meta.arg;

        state.backup[commentId] = {
          parentId,
          comment: null,
          commentIndex: -1,
          reply: null,
          replyIndex: -1,
        };

        const comments = state.byPostId[parentId];
        if (comments) {
          const index = comments.findIndex((c) => c.id === commentId);
          if (index !== -1) {
            state.backup[commentId].comment = comments[index];
            state.backup[commentId].commentIndex = index;
            comments.splice(index, 1);
          }
        }

        const replyComments = state.repliesByCommentId[parentId];
        if (replyComments) {
          const replyIndex = replyComments.findIndex(
            (reply) => reply.id === commentId,
          );

          if (replyIndex !== -1) {
            state.backup[commentId].reply = replyComments[replyIndex];
            state.backup[commentId].replyIndex = replyIndex;
            replyComments.splice(replyIndex, 1);
          }
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { commentId } = action.meta.arg;

        if (state.backup?.[commentId]) {
          delete state.backup[commentId];
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        const { commentId } = action.meta.arg;
        const { comment, parentId, index } = state.backup[commentId];

        state.byPostId[parentId].splice(index, 0, comment);
        delete state.backup[commentId];
      });
  },
});

export const {
  addCommentOptimistic,
  updateComment,
  removeOptimisticComment,
  optimisticUpdateLikeComment,
} = commentsSlice.actions;
export default commentsSlice;
