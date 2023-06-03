import SearchMovie from "@/components/search-movie/SearchMovie";
import MoviesList from "@/components/movies/regular-movies/MoviesList";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { selectFavoriteMovies } from "@/store/favoriteMovies/favoriteMoviesSlice";
import {
  selectMoviesLoaded,
  setMoviesLoaded,
} from "@/store/movies/moviesSlice";
import { useEffect } from "react";
import { areTwoArraysEqual } from "@/helpers/check-equality";

export default function MoviesPage() {
  const favoriteMovies = useAppSelector(selectFavoriteMovies);
  const moviesLoaded = useAppSelector(selectMoviesLoaded);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const moviesLoadedCopy = moviesLoaded.map((movie) => {
      if (!favoriteMovies) {
        return movie;
      }

      for (const favoriteMovie of favoriteMovies) {
        if (movie.imdbID === favoriteMovie.imdbID) {
          return { ...movie, IsLiked: true };
        }
      }
      return movie;
    });

    if (!areTwoArraysEqual(moviesLoaded, moviesLoadedCopy)) {
      dispatch(setMoviesLoaded(moviesLoadedCopy));
    }
  }, [moviesLoaded, favoriteMovies]);

  return (
    <>
      <SearchMovie />
      <MoviesList />
    </>
  );
}
