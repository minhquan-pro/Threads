export const selectCommentsByPostId = (state, postId) =>
  state.comments.byPostId[postId] || [];
export const selectCommentsLoading = (state, postId) =>
  state.comments.loading[postId] || [];
