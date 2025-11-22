import { getPosts } from "@/services/Posts/postService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    last_page: 0,
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        const { data, pagination } = action.payload;
        state.loading = false;
        state.pagination = pagination;

        const newPosts = data.filter((newPost) => {
          const isNewPost = state.items.some((p) => p.id === newPost.id);
          return !isNewPost;
        });

        state.items = [...state.items, ...newPosts];
      });
  },
});

export default postsSlice;
