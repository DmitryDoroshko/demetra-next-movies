import {IMovie} from "@/model/types";
import Image from "next/image";

interface MoviesListProps {
  movies: IMovie[];
}

export default function MoviesList({movies}: MoviesListProps) {
  if (!movies) {
    return <h1 style={{textAlign: "center"}}>No movies found.</h1>;
  }

  return (
      <>
        <ul>
          {movies.map(movie => {
            return (<li key={movie.imdbID}>
              <Image src={movie.Poster} alt={movie.Title} width={300} height={300}/>
              <p>{movie.Title}</p>
            </li>);
          })}
        </ul>
      </>
  );
}