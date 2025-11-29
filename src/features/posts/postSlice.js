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

const optimisticActionPost = (state, postId, isAction, countKey, authKey) => {
  const post = state.items.find((post) => post.id === postId);
  if (!post) return;

  post[countKey] += isAction ? -1 : 1;
  post[authKey] = !isAction;
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    optimisticUpdateLikePost: (state, action) => {
      const { postId, isLiked } = action.payload;
      optimisticActionPost(
        state,
        postId,
        isLiked,
        "likes_count",
        "is_liked_by_auth",
      );
    },

    optimisticUpdateRepostPost: (state, action) => {
      const { postId, isReposted } = action.payload;
      optimisticActionPost(
        state,
        postId,
        isReposted,
        "reposts_and_quotes_count",
        "is_reposted_by_auth",
      );
    },

    optimisticIncrementRepliesCount: (state, action) => {
      const { postId } = action.payload;
      const post = state.items.find((p) => p.id === postId);
      if (post) {
        post.replies_count += 1;
      }
    },

    optimisticDecrementRepliesCount: (state, action) => {
      const { postId } = action.payload;
      const post = state.items.find((p) => p.id === postId);
      if (post) {
        post.replies_count -= 1;
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

export const {
  optimisticUpdateLikePost,
  optimisticUpdateRepostPost,
  optimisticIncrementRepliesCount,
  optimisticDecrementRepliesCount,
} = postsSlice.actions;

export default postsSlice;
