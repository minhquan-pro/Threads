export const selectCommentsByPostId = (state, postId, sortOrder) => {
  const comments = state.comments.byPostId[postId];
  if (!comments || !comments.length) return;
  const sortComments = [...comments].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  return sortOrder === "recent" ? sortComments : comments;
};

export const selectCommentByPostId = (state, parentId, postId) => {
  const comments = state.comments.byPostId[parentId];

  // Guard clause
  if (!comments || !Array.isArray(comments)) {
    return null;
  }

  return comments.find((comment) => comment.id === postId) || null;
};

export const selectCommentsLoading = (state, postId) =>
  state.comments.loading[postId];

export const selectCommentsPagination = (state, postId) => {
  return state.comments.pagination[postId];
};

export const selectReplyByCommentId = (state, commentId) =>
  state.comments.repliesByCommentId[commentId] || [];

export const selectRepliesLoading = (state, commentId) =>
  state.comments.repliesLoading[commentId] || false;
