import {IMovies} from "@/model/types";
import Image from "next/image";
import {useGetMoviesByTitleQuery} from "@/services/movies.service";

export default function MoviesList({movies}: IMovies) {
  if (!movies) {
    return <h1 style={{textAlign: "center"}}>No movies found.</h1>;
  }

  return (
      <>
        <ul>
          {movies.map(movie => {
            return (<li key={movie.imdbId}>
              <Image src={movie.Poster} alt={movie.Title}/>
              <p>{movie.Title}</p>
            </li>);
          })}
        </ul>
      </>
  );
}