export const selectorList = (state) => {
  return state.posts.items.map((id) => state.posts.byId[id]);
};
export const selectItemsById = (state, postId) => {
  return state.posts.byId[postId];
};
export const selectorLoading = (state, postId) =>
  state.posts.loadingById[postId];
export const selectorPagination = (state) => state.posts.pagination;
