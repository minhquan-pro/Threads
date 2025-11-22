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
  reducers: {
    optimisticUpdateLikePost: (state, action) => {
      const { postId, isLiked } = action.payload;
      const post = state.items.find((post) => post.id === postId);
      if (post) {
        post.likes_count += isLiked ? -1 : 1;
        post.is_liked_by_auth = !isLiked;
      }
    },
  },
  extraReducers: (builder) => {
    // Get posts
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
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { optimisticUpdateLikePost } = postsSlice.actions;

export default postsSlice;
