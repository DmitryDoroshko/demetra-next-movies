import { IMovie } from "@/model/types";
import { Grid } from "@mui/material";
import SingleFavoriteMovie from "@/components/movies/favorites/SingleFavoriteMovie";

interface FavoriteMoviesListProps {
  favoriteMovies: IMovie[];
}

export default function FavoriteMoviesList({
  favoriteMovies,
}: FavoriteMoviesListProps) {
  if (favoriteMovies.length === 0) {
    return <h1>No favorite movies yet.</h1>;
  }

  return (
    <>
      <h1 style={{textAlign: "center"}}>Favorite Movies List</h1>
      <Grid
        container
        sx={{ width: "100%", padding: { xs: "0.5rem", sm: "1rem", md: "3rem" } }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 6, md: 12, xl: 16 }}
        justifyItems={{
          xs: "center",
          sm: "center",
          md: "space-between",
          xl: "space-between",
        }}
      >
        {favoriteMovies.map((favoriteMovie) => {
          return <SingleFavoriteMovie key={favoriteMovie.imdbID} movie={favoriteMovie} />;
        })}
      </Grid>
    </>
  );
}
