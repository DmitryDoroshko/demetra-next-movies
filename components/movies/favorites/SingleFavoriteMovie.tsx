import { Grid } from "@mui/material";
import { useAppSelector } from "@/hooks/redux-hooks";
import { selectFavoriteMovies } from "@/store/favoriteMovies/favoriteMoviesSlice";
import { IMovie } from "@/model/types";
import FavoriteMovieCard from "@/components/movies/favorites/FavoriteMovieCard";

export default function SingleFavoriteMovie(props: { movie: IMovie }) {
  const { movie } = props;
  const favoriteMovies = useAppSelector(selectFavoriteMovies);

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
