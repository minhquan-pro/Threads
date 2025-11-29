export const selectCommentsByPostId = (state, postId, sortOrder) => {
  const comments = state.comments.byPostId[postId];

  console.log(sortOrder);

  if (!comments || !comments.length) return;

  const sortComments = [...comments].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  return sortOrder === "recent" ? sortComments : comments;
};

export const selectCommentsLoading = (state, postId) =>
  state.comments.loading[postId];

export const selectCommentsPagination = (state, postId) => {
  return state.comments.pagination[postId];
};
