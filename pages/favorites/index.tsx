import FavoriteMoviesList from "@/components/movies/favorites/FavoriteMoviesList";
import { useAppSelector } from "@/hooks/redux-hooks";
import { selectFavoriteMovies } from "@/store/favoriteMovies/favoriteMoviesSlice";

export default function FavoritesPage() {
  const favoriteMovies = useAppSelector(selectFavoriteMovies);
  return (
    <>
      <FavoriteMoviesList favoriteMovies={favoriteMovies} />
    </>
  );
}
