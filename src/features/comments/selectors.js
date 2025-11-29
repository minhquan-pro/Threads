export const selectCommentsByPostId = (state, postId) => {
  const comments = state.comments.byPostId[postId];
  if (!comments || comments.length === 0) {
    return [];
  }
  return [...comments].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
};

export const selectCommentsLoading = (state, postId) =>
  state.comments.loading[postId];
