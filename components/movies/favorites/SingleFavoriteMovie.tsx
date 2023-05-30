import { Grid } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
  selectFavoriteMovies,
} from "@/store/favoriteMovies/favoriteMoviesSlice";
import { IMovie } from "@/model/types";
import {
  extractFavoriteMoviesFromLocalStorage,
  setFavoriteMoviesToLocalStorage,
} from "@/helpers/local-storage";
import FavoriteMovieCard from "@/components/movies/favorites/FavoriteMovieCard";

export default function SingleFavoriteMovie(props: { movie: IMovie }) {
  const { movie } = props;
  const [isMovieLiked, setIsMovieLiked] = useState(true);
  const router = useRouter();
  const favoriteMovies = useAppSelector(selectFavoriteMovies);
  const dispatch = useAppDispatch();
  const goToSpecificMoviePageHandler = () => {
    router.push(`/movies/details/${movie.imdbID}`);
  };

  const toggleMovieLikeHandler = () => {
    setIsMovieLiked((prevState) => !prevState);
    let favoriteMovies = extractFavoriteMoviesFromLocalStorage() || [];

    if (isMovieLiked) {
      dispatch(removeFavoriteMovie(movie.imdbID));
      favoriteMovies = favoriteMovies.filter(
        (favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID
      );
    } else {
      dispatch(addFavoriteMovie(movie as IMovie));
      if (
        !favoriteMovies.some(
          (favoriteMovie) => favoriteMovie.imdbID === movie.imdbID
        )
      ) {
        favoriteMovies.push(movie as IMovie);
      }
    }
    setFavoriteMoviesToLocalStorage(favoriteMovies);
  };

  if (favoriteMovies.length === 1) {
    return (
      <Grid item xs={6} sm={6} md={12} xl={16}>
        <FavoriteMovieCard movie={movie} />
      </Grid>
    );
  } else if (favoriteMovies.length === 2) {
    return (
      <Grid item xs={6} sm={3} md={6} xl={8}>
        <FavoriteMovieCard movie={movie} />
      </Grid>
    );
  } else if (favoriteMovies.length === 3) {
    return (
      <Grid item xs={6} sm={6} md={4} xl={5}>
        <FavoriteMovieCard movie={movie} />
      </Grid>
    );
  }

  return (
    <>
      <Grid item xs={4} sm={3} md={4} xl={4}>
        <FavoriteMovieCard movie={movie} />
      </Grid>
    </>
  );
}
