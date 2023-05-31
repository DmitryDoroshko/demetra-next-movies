import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "@/model/types";
import { RootState } from "@/store";

export interface IFavoriteMoviesState {
  favoriteMoviesLoaded: IMovie[];
  favoriteMoviesLoading: boolean;
  favoriteMoviesError: string | null;
}

const initialState: IFavoriteMoviesState = {
  favoriteMoviesLoaded: [],
  favoriteMoviesLoading: false,
  favoriteMoviesError: null,
};

export const favoriteMoviesSlice = createSlice({
  name: "favoriteMovies",
  initialState,
  reducers: {
    setFavoriteMovies: (
      state: IFavoriteMoviesState,
      { payload }: PayloadAction<IMovie[]>
    ) => {
      state.favoriteMoviesLoaded = payload;
    },

    setFavoriteMoviesLoading: (
      state: IFavoriteMoviesState,
      { payload }: PayloadAction<boolean>
    ) => {
      state.favoriteMoviesLoading = payload;
    },

    setFavoriteMoviesError: (
      state: IFavoriteMoviesState,
      { payload }: PayloadAction<string | null>
    ) => {
      state.favoriteMoviesError = payload;
    },

    addFavoriteMovie: (
      state: IFavoriteMoviesState,
      { payload }: PayloadAction<IMovie>
    ) => {
      if (
        !state.favoriteMoviesLoaded.some(
          (movie) => movie.imdbID === payload.imdbID
        )
      ) {
        state.favoriteMoviesLoaded = [...state.favoriteMoviesLoaded, payload];
      }
    },
    removeFavoriteMovie: (
      state: IFavoriteMoviesState,
      { payload }: PayloadAction<string>
    ) => {
      state.favoriteMoviesLoaded = state.favoriteMoviesLoaded.filter(
        (favoriteMovie) => favoriteMovie.imdbID !== payload
      );
    },
  },
});

export const {
  setFavoriteMovies,
  addFavoriteMovie,
  removeFavoriteMovie,
} = favoriteMoviesSlice.actions;

export const selectFavoriteMovies = (state: RootState) =>
  state.favoriteMovies.favoriteMoviesLoaded;

export default favoriteMoviesSlice.reducer;
