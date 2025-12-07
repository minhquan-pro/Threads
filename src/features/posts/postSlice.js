import { createPost, getPosts } from "@/services/Posts/postService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  byId: {},
  loading: false,
  loadingById: {},
  error: null,
  pagination: {
    last_page: 0,
  },
};

const optimisticActionPost = (state, postId, isAction, countKey, authKey) => {
  const post = state.items.find((post) => post.id === postId);
  if (post) {
    post[countKey] += isAction ? -1 : 1;
    post[authKey] = !isAction;
  }

  if (state.byId[postId]) {
    state.byId[postId][countKey] += isAction ? -1 : 1;
    state.byId[postId][authKey] = !isAction;
  }
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
      if (state.byId[postId]) {
        state.byId[postId].replies_count += 1;
      }
    },

    optimisticDecrementRepliesCount: (state, action) => {
      const { postId } = action.payload;
      const post = state.items.find((p) => p.id === postId);
      if (post) {
        post.replies_count -= 1;
      }
      if (state.byId[postId]) {
        state.byId[postId].replies_count -= 1;
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

        const newPostIds = [];
        data.forEach((post) => {
          state.byId[post.id] = post;

          if (!state.items.includes(post.id)) {
            newPostIds.push(post.id);
          }
        });

        state.items = [...state.items, ...newPostIds];
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.error.message;
      });
    // Create Post
    builder
      .addCase(createPost.pending, (state, action) => {
        const { content, idFake, user } = action.meta.arg;

        const postFakeData = {
          id: idFake,
          content,
          user,
          created_at: new Date().toISOString(),
          likes_count: 0,
          replies_count: 0,
          reposts_and_quotes_count: 0,
          views_count: 0,
          is_liked_by_auth: false,
          is_reposted_by_auth: false,
          is_saved: false,
          _isPending: true,
        };

        state.byId = { [idFake]: postFakeData, ...state.byId };
        state.items = [idFake, ...state.items];
        state.loadingById[idFake] = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        const { idFake } = action.meta.arg;
        const realPost = action.payload;
        const realId = realPost.id;

        delete state.byId[idFake];
        delete state.loadingById[idFake];

        state.byId[realId] = { ...realPost, _isPending: false };

        const indexIdFake = state.items.findIndex((id) => id === idFake);
        if (indexIdFake !== -1) {
          state.items[indexIdFake] = realId;
        }

        state.pagination.total += 1;
      })
      .addCase(createPost.rejected, (state, action) => {
        const { idFake } = action.meta.arg;
        delete state.byId[idFake];
        delete state.loadingById[idFake];
        state.items = state.items.filter((id) => id !== idFake);
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
