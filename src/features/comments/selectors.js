export const selectCommentsByPostId = (state, postId) => {
  const comments = state.comments.byPostId[postId];
  return comments;
};

export const selectCommentsLoading = (state, postId) =>
  state.comments.loading[postId];

export const selectCommentsPagination = (state, postId) => {
  return state.comments.pagination[postId];
};
