import authSlice from "@/features/auth/authSlice";
import commentsSlice from "@/features/comments/commentSlice";
import postsSlice from "@/features/posts/postSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["auth", "posts", "comments"],
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: ["loading"],
};

const rootReducer = combineReducers({
  [authSlice.reducerPath]: persistReducer(authPersistConfig, authSlice.reducer),
  [postsSlice.reducerPath]: postsSlice.reducer,
  [commentsSlice.reducerPath]: commentsSlice.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
const persistor = persistStore(store);
window.store = store;
export { store, persistor };
