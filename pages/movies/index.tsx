import SearchMovie from "@/components/search-movie/SearchMovie";
import MoviesList from "@/components/movies/MoviesList";
import { useLazyGetMoviesByTitleQuery } from "@/services/movies.service";
import {useEffect, useState} from "react";
import { useAppSelector } from "@/hooks/redux-hooks";
import { selectSearchMovieTitleString } from "@/store/movies/moviesSlice";

export default function MoviesPage() {
  const searchMovieTitle = useAppSelector(selectSearchMovieTitleString);

  const [moviesLoaded, setMoviesLoaded] = useState([]);
  const [areMoviesLoading, setAreMoviesLoading] = useState(false);

  // const { data, isLoading } = useLazyGetMoviesByTitleQuery(searchMovieTitle);

  useEffect(() => {
    if (searchMovieTitle && searchMovieTitle.trim().length > 0) {
      const { data, isLoading } = useLazyGetMoviesByTitleQuery(searchMovieTitle);
      setAreMoviesLoading(isLoading);

      if (data) {

      }
      setMoviesLoaded(data);
    }
  }, [searchMovieTitle]);

  return (
    <>
      <SearchMovie />
      {!areMoviesLoading && <MoviesList movies={moviesLoaded} />}
      {areMoviesLoading && <p>Loading...</p>}
    </>
  );
}
