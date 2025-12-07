export const selectorList = (state) => {
  return state.posts.items.map((id) => state.posts.byId[id]);
};
export const selectItemsById = (state, id) => {
  return state.posts.byId[id];
};
export const selectorLoading = (state) => state.posts.loading;
export const selectorPagination = (state) => state.posts.pagination;
