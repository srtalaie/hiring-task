import { configureStore } from "@reduxjs/toolkit";
import bookCollReducer from "./reducers/bookCollReducer";
import bookReducer from "./reducers/bookReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    bookCollection: bookCollReducer,
    books: bookReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;