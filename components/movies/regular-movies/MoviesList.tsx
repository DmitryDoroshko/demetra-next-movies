import { useAppSelector } from "@/hooks/redux-hooks";
import {
  selectMoviesLoading,
  selectMoviesLoadingError,
  selectMoviesToDisplay,
} from "@/store/movies/moviesSlice";
import { Grid, CircularProgress } from "@mui/material";
import SingleMovieCard from "@/components/movies/regular-movies/SingleMovieCard";
import MoviesPagination from "@/components/pagination/MoviesPagination";
import { useEffect, useState } from "react";
import { areTwoArraysEqual } from "@/helpers/check-equality";

export default function MoviesList() {
  const moviesToDisplay = useAppSelector(selectMoviesToDisplay);
  const areMoviesLoading = useAppSelector(selectMoviesLoading);
  const moviesError = useAppSelector(selectMoviesLoadingError);
  const [moviesDisplayedInPagination, setMoviesDisplayedInPagination] =
    useState(moviesToDisplay);

  if (!areMoviesLoading && moviesToDisplay.length === 0) {
    return (
      <h1 style={{ textAlign: "center" }}>
        No movies found. Please search one.
      </h1>
    );
  }

  if (areMoviesLoading) {
    return (
      <h1 style={{ textAlign: "center" }}>
        <CircularProgress />
      </h1>
    );
  }

  if (moviesError) {
    return <h1 style={{ textAlign: "center" }}>{moviesError}</h1>;
  }

  let moviesDisplayedContent;

  // If there's only one item in moviesList
  if (moviesDisplayedInPagination.length === 1) {
    const movie = moviesDisplayedInPagination[0];
    if (!movie.Poster.startsWith("https")) {
      const movieTitleParsed = movie.Title.replace(/[^a-zA-Z ]/g, "")
        .split(" ")
        .join("+");

      moviesDisplayedContent = (
        <Grid item key={movie.imdbID} xs={12} sm={3} md={4} xl={16}>
          <SingleMovieCard
            movie={{
              ...movie,
              Poster: `https://placehold.co/300x300?text=${movieTitleParsed}`,
            }}
          />
        </Grid>
      );
    } else {
      moviesDisplayedContent = (
        <Grid item key={movie.imdbID} xs={12} sm={6} md={12} xl={16}>
          <SingleMovieCard movie={movie} />
        </Grid>
      );
    }
  } /* If there's only one item in moviesList */ else if (
    moviesDisplayedInPagination.length === 2
  ) {
    moviesDisplayedContent = moviesDisplayedInPagination.map((movie) => {
      if (!movie.Poster.startsWith("https")) {
        const movieTitleParsed = movie.Title.replace(/[^a-zA-Z ]/g, "")
          .split(" ")
          .join("+");
        return (
          <Grid item key={movie.imdbID} xs={12} sm={3} md={6} xl={8}>
            <SingleMovieCard
              movie={{
                ...movie,
                Poster: `https://placehold.co/300x300?text=${movieTitleParsed}`,
              }}
            />
          </Grid>
        );
      }
      return (
        <Grid item key={movie.imdbID} xs={12} sm={3} md={6} xl={8}>
          <SingleMovieCard movie={movie} />
        </Grid>
      );
    });
  } /* There are at least 3 elements in the moviesList*/ else {
    moviesDisplayedContent = moviesDisplayedInPagination.map((movie) => {
      if (!movie.Poster.startsWith("https")) {
        const movieTitleParsed = movie.Title.replace(/[^a-zA-Z ]/g, "")
          .split(" ")
          .join("+");
        return (
          <Grid item key={movie.imdbID} xs={12} sm={3} md={4} xl={4}>
            <SingleMovieCard
              movie={{
                ...movie,
                Poster: `https://placehold.co/300x300?text=${movieTitleParsed}`,
              }}
            />
          </Grid>
        );
      }
      return (
        <Grid item key={movie.imdbID} xs={12} sm={3} md={4} xl={4}>
          <SingleMovieCard movie={movie} />
        </Grid>
      );
    });
  }

  // There are at least 4 movies displayed after all these `if` checks
  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          padding: { xs: "0.5rem", sm: "1rem", md: "3rem" },
        }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 6, md: 12, xl: 16 }}
        justifyItems={{
          xs: "center",
          sm: "center",
          md: "space-between",
          xl: "space-between",
        }}
      >
        {moviesDisplayedContent}
      </Grid>
      <MoviesPagination
        pageSize={4}
        allAvailableMovies={moviesToDisplay}
        setMovies={(movies) => setMoviesDisplayedInPagination(movies)}
      />
    </>
  );
}
