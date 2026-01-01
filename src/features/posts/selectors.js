export const selectLoadingAllPost = (state) => state.posts.loading;

export const selectList = (state) => {
  return state.posts.items.map((id) => state.posts.byId[id]).filter(Boolean);
};

export const selectItemById = (state, postId) => {
  return state.posts.byId[postId] || null;
};

export const selectLoadingById = (state, postId) => {
  return state.posts.loadingById[postId] || false;
};

export const selectPagination = (state) => state.posts.pagination;
