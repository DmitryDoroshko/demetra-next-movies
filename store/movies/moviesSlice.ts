import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "@/model/types";

export interface IMoviesState {
  moviesLoaded: IMovie[];
  moviesLoading: boolean;
  moviesLoadingError: string | null;
  searchMovieTitleString: string | null;
  searchMovieYear: number | null;
  searchMoviePlot: "movie-short" | "movie-long";
  movieSortOrderValue: "movie-sort-descending" | "movie-sort-ascending";
}

const initialState: IMoviesState = {
  moviesLoaded: [],
  moviesLoading: false,
  moviesLoadingError: null,
  searchMovieTitleString: "",
  searchMovieYear: null,
  searchMoviePlot: "movie-short",
  movieSortOrderValue: "movie-sort-descending",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMoviesLoading(state: IMoviesState, { payload }: PayloadAction<boolean>) {
      state.moviesLoading = payload;
    },
    setMoviesLoadingError(
      state: IMoviesState,
      { payload }: PayloadAction<string | null>
    ) {
      state.moviesLoadingError = payload;
    },
    setMoviesLoadingSuccess(
      state: IMoviesState,
      { payload }: PayloadAction<IMovie[]>
    ) {
      state.moviesLoaded = payload;
    },
    setMoviesLoaded(state: IMoviesState, { payload }: PayloadAction<IMovie[]>) {
      state.moviesLoaded = payload;
    },
    setSearchMovieTitleString(
      state: IMoviesState,
      { payload }: PayloadAction<string>
    ) {
      state.searchMovieTitleString = payload;
    },
    setSearchMovieYear(
      state: IMoviesState,
      { payload }: PayloadAction<number | null>
    ) {
      state.searchMovieYear = payload;
    },
    setSearchMoviePlot(
      state: IMoviesState,
      { payload }: PayloadAction<"movie-short" | "movie-long">
    ) {
      state.searchMoviePlot = payload;
    },
    setMovieSortOrderValue(
      state: IMoviesState,
      {
        payload,
      }: PayloadAction<"movie-sort-descending" | "movie-sort-ascending">
    ) {
      state.movieSortOrderValue = payload;
    },
  },
});

export const {
  setMoviesLoading,
  setMoviesLoadingError,
  setMoviesLoadingSuccess,
  setMoviesLoaded,
  setSearchMovieTitleString,
  setSearchMovieYear,
  setSearchMoviePlot,
  setMovieSortOrderValue,
} = moviesSlice.actions;

export const selectMoviesLoaded = (state: IMoviesState) => state.moviesLoaded;
export const selectMoviesLoading = (state: IMoviesState) => state.moviesLoading;
export const selectMoviesLoadingError = (state: IMoviesState) =>
  state.moviesLoadingError;
export const selectSearchMovieTitleString = (state: IMoviesState) => state.searchMovieTitleString;
export const selectSearchMovieYear = (state: IMoviesState) => state.searchMovieYear;
export const selectSearchMoviePlot = (state: IMoviesState) => state.searchMoviePlot;

export default moviesSlice.reducer;
