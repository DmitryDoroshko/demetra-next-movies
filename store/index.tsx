import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import moviesReducer, {IMoviesState} from "./movies/moviesSlice";
import {moviesApi} from "@/services/movies.service";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

