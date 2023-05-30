import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieSpecific from "@/components/movies/regular-movies/MovieSpecific";
import { IMovie } from "@/model/types";
import { useLazyGetSingleMovieByImdbIDQuery } from "@/services/movies.service";
import { CircularProgress } from "@mui/material";

export default function MovieDetailsPage() {
  const router = useRouter();
  const { movieSlug }  = router.query;
  const [movieFetched, setMovieFetched] = useState<IMovie | null>(null);
  const [isMovieLoading, setIsMovieLoading] = useState<boolean>(true);
  const [movieError, setMovieError] = useState<any>(null);
  const [triggerGetSingleMovieByImdbID] = useLazyGetSingleMovieByImdbIDQuery();

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieSlug) {
        setIsMovieLoading(false);
        return;
      }

      const { data, error, isLoading, isError } = await triggerGetSingleMovieByImdbID(
        movieSlug as string
      );

      setIsMovieLoading(isLoading);

      if (error) {
        setMovieError(error);
        setIsMovieLoading(false);
        return;
      }

      if (data) {
        setMovieFetched(data);
        setIsMovieLoading(false);
        return;
      }
    };

    fetchMovie();
  }, [movieSlug]);

  if (isMovieLoading) {
    return (
      <h1 style={{ textAlign: "center" }}>
        <CircularProgress />
      </h1>
    );
  }

  if (movieError) {
    return <h1 style={{ textAlign: "center" }}>{movieError}</h1>;
  }

  if (!isMovieLoading && !movieFetched) {
    return (
      <h1 style={{ textAlign: "center" }}>No movie found... Try again.</h1>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "1rem"}}>
        Movie {movieFetched && <span style={{color: "blue"}}>{movieFetched.Title}</span>} Details
      </h1>
      <MovieSpecific movie={movieFetched} isMovieWithFullInfo={true} />
    </>
  );
}
