import Image from "next/image";
import { Button, Card } from "@mui/material";
import React from "react";
import { IMovie } from "@/model/types";
import { useRouter } from "next/router";

type MovieSpecificProps = {
  movie: IMovie | null;
  isMovieWithFullInfo: boolean;
};

export default function MovieSpecific(props: MovieSpecificProps) {
  const { movie, isMovieWithFullInfo } = props;
  const router = useRouter();

  const goBackButtonClickHandler = () => {
    if (!movie) {
      router.push(`/movies`);
      return;
    }
    router.push(`/movies?title=${movie.Title}&year=${movie.Year}&plot=full`);
  };

  if (movie === null) {
    return <h2>No movie found...</h2>;
  }

  let moviePosterProcessed = movie?.Poster;

  if (!movie?.Poster.startsWith("http")) {
    const movieTitleParsed = movie?.Title.replace(/[^a-zA-Z ]/g, "");
    moviePosterProcessed = `https://placehold.co/300x300?text=${movieTitleParsed}`;
  }

  return (
    <Card
      variant={"outlined"}
      sx={{
        margin: "0 auto",
        width: "100%",
        maxWidth: "31.25rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Image src={moviePosterProcessed} alt={movie.Title} width={300} height={300} />
      {!isMovieWithFullInfo && (
        <>
          <p>
            Title: <span style={{ fontWeight: "bold" }}>{movie.Title}</span>
          </p>
          <p>
            ImdbID: <span style={{ fontWeight: "bold" }}>{movie.imdbID}</span>
          </p>
          <p>
            Year:<span style={{ fontWeight: "bold" }}> {movie.Year}</span>
          </p>
          <p>
            Type: <span style={{ fontWeight: "bold" }}>{movie.Type}</span>
          </p>
          <Button variant="contained" sx={{ marginTop: "1rem" }}>
            Go back
          </Button>
        </>
      )}
      {isMovieWithFullInfo && (
        <>
          <p>
            Title: <span style={{ fontWeight: "bold" }}>{movie.Title}</span>
          </p>
          <p>
            ImdbID: <span style={{ fontWeight: "bold" }}>{movie.imdbID}</span>
          </p>
          <p>
            Year: <span style={{ fontWeight: "bold" }}>{movie.Year}</span>
          </p>
          <p>
            Type: <span style={{ fontWeight: "bold" }}>{movie.Type}</span>
          </p>
          <p>
            Actors: <span style={{ fontWeight: "bold" }}>{movie.Actors}</span>
          </p>
          <>
            Ratings:{" "}
            <ul>
              {movie?.Ratings?.map((rating, index) => {
                return (
                  <li key={index}>
                    {rating.Source}:{" "}
                    <span style={{ fontWeight: "bold" }}>{rating.Value}</span>
                  </li>
                );
              })}
            </ul>
          </>
          <p>
            Plot: <span style={{ fontWeight: "bold" }}>{movie.Plot}</span>
          </p>
          <Button
            variant="contained"
            sx={{ marginTop: "1rem" }}
            onClick={goBackButtonClickHandler}
          >
            Go back
          </Button>
        </>
      )}
    </Card>
  );
}
