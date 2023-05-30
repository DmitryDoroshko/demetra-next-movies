import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import moviesReducer from "./movies/moviesSlice";
import favoriteMoviesReducer from "./favoriteMovies/favoriteMoviesSlice";
import { demetraMoviesApi } from "@/services/movies.service";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favoriteMovies: favoriteMoviesReducer,
    [demetraMoviesApi.reducerPath]: demetraMoviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(demetraMoviesApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;


