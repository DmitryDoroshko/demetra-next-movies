import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "@/model/types";
import { RootState } from "@/store";
import { sortMovies } from "@/helpers/sort-movies";

export interface IMoviesState {
  moviesLoaded: IMovie[];
  moviesSorted: IMovie[];
  moviesToDisplay: IMovie[];
  moviesLoading: boolean;
  moviesLoadingError: string | null;
  searchMovieTitleString: string | null;
  searchMovieYear: number | null;
  searchMoviePlot: "movie-short" | "movie-full";
  movieSortOrderValue:
    | "movie-sort-not-sorted"
    | "movie-sort-descending"
    | "movie-sort-ascending";
  filterMoviesValue: string;
}

const initialState: IMoviesState = {
  moviesLoaded: [],
  moviesSorted: [],
  moviesToDisplay: [],
  moviesLoading: false,
  moviesLoadingError: null,
  searchMovieTitleString: "",
  searchMovieYear: null,
  searchMoviePlot: "movie-short",
  movieSortOrderValue: "movie-sort-not-sorted",
  filterMoviesValue: "",
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {

    setMoviesLoading: (
      state: IMoviesState,
      { payload }: PayloadAction<boolean>
    ) => {
      state.moviesLoading = payload;
    },

    setMoviesLoadingError: (
      state: IMoviesState,
      { payload }: PayloadAction<string | null>
    ) => {
      state.moviesLoadingError = payload;
    },

    setMoviesLoaded: (
      state: IMoviesState,
      { payload }: PayloadAction<IMovie[]>
    ) => {
      state.moviesLoaded = payload;
      state.moviesSorted = sortMovies(
        state.moviesLoaded,
        state.movieSortOrderValue
      );

      if (!state.filterMoviesValue) {
        state.moviesToDisplay = [...state.moviesSorted];
        return;
      }

      const moviesFiltered = [...state.moviesLoaded].filter((movie) =>
        movie.Title.toLowerCase().includes(
          state.filterMoviesValue.toLowerCase()
        )
      );

      state.moviesToDisplay = sortMovies(
        moviesFiltered,
        state.movieSortOrderValue
      );
    },

    setSearchMovieTitleString: (
      state: IMoviesState,
      { payload }: PayloadAction<string>
    ) => {
      state.searchMovieTitleString = payload;
    },
    setSearchMovieYear: (
      state: IMoviesState,
      { payload }: PayloadAction<number | null>
    ) => {
      state.searchMovieYear = payload;
    },
    setSearchMoviePlot: (
      state: IMoviesState,
      { payload }: PayloadAction<"movie-short" | "movie-full">
    ) => {
      state.searchMoviePlot = payload;
    },
    setMovieSortOrderValue: (
      state: IMoviesState,
      {
        payload,
      }: PayloadAction<
        | "movie-sort-not-sorted"
        | "movie-sort-descending"
        | "movie-sort-ascending"
      >
    ) => {
      state.movieSortOrderValue = payload;
      state.moviesSorted = sortMovies(state.moviesLoaded, payload);

      if (!state.filterMoviesValue) {
        state.moviesToDisplay = [...state.moviesSorted];
        return;
      }

      const moviesFiltered = [...state.moviesLoaded].filter((movie) =>
        movie.Title.toLowerCase().includes(
          state.filterMoviesValue.toLowerCase()
        )
      );
      state.moviesToDisplay = sortMovies(
        moviesFiltered,
        state.movieSortOrderValue
      );
    },
    setFilterMoviesValue: (
      state: IMoviesState,
      { payload }: PayloadAction<string>
    ) => {
      state.filterMoviesValue = payload;

      if (payload.trim().length === 0) {
        state.moviesToDisplay = sortMovies(
          state.moviesLoaded,
          state.movieSortOrderValue
        );
        return;
      }

      const moviesFiltered = [...state.moviesLoaded].filter((movie) =>
        movie.Title.toLowerCase().includes(payload.toLowerCase())
      );
      state.moviesToDisplay = sortMovies(
        moviesFiltered,
        state.movieSortOrderValue
      );
    },
  },
});

export const {
  setMoviesLoading,
  setMoviesLoadingError,
  setMoviesLoaded,
  setSearchMovieTitleString,
  setSearchMovieYear,
  setSearchMoviePlot,
  setMovieSortOrderValue,
  setFilterMoviesValue,
} = moviesSlice.actions;

export const selectMoviesLoaded = (state: RootState) =>
  state.movies.moviesLoaded;
export const selectMoviesLoading = (state: RootState) =>
  state.movies.moviesLoading;
export const selectMoviesLoadingError = (state: RootState) =>
  state.movies.moviesLoadingError;
export const selectSearchMovieTitleString = (state: RootState) =>
  state.movies.searchMovieTitleString;
export const selectSearchMovieYear = (state: RootState) =>
  state.movies.searchMovieYear;
export const selectSearchMoviePlot = (state: RootState) =>
  state.movies.searchMoviePlot;
export const selectMoviesSorted = (state: RootState) =>
  state.movies.moviesSorted;
export const selectMoviesToDisplay = (state: RootState) =>
  state.movies.moviesToDisplay;
export const selectFilterMoviesValue = (state: RootState) =>
  state.movies.filterMoviesValue;

export default moviesSlice.reducer;
