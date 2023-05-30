import { useState } from "react";
import { Button, Card, Typography, SvgIcon } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "@/hooks/redux-hooks";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from "@/store/favoriteMovies/favoriteMoviesSlice";
import { Tooltip } from "@mui/material";
import { IMovie } from "@/model/types";
import {
  extractFavoriteMoviesFromLocalStorage,
  setFavoriteMoviesToLocalStorage,
} from "@/helpers/local-storage";

type SingleMovieCardProps = {
  movie: {
    Poster: string;
    Title: string;
    imdbID: string;
    Type: string;
    Year: string | number;
    IsLiked?: boolean | undefined;
  };
};

export default function SingleMovieCard({ movie }: SingleMovieCardProps) {
  const [isMovieLiked, setIsMovieLiked] = useState(movie.IsLiked || false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const goToSpecificMoviePageHandler = () => {
    router.push(`/movies/details/${movie.imdbID}`);
  };

  const toggleMovieLikeHandler = () => {
    let favoriteMoviesFromLocalStorage =
      extractFavoriteMoviesFromLocalStorage() || [];

    if (!isMovieLiked) {
      dispatch(addFavoriteMovie(movie as IMovie));
      if (
        !favoriteMoviesFromLocalStorage.some(
          (favoriteMovie) => favoriteMovie.imdbID === movie.imdbID
        )
      ) {
        favoriteMoviesFromLocalStorage.push(movie as IMovie);
      }
      setIsMovieLiked((prevState) => !prevState);
      setFavoriteMoviesToLocalStorage(favoriteMoviesFromLocalStorage);
      return;
    }

    dispatch(removeFavoriteMovie(movie.imdbID));
    favoriteMoviesFromLocalStorage = favoriteMoviesFromLocalStorage.filter(
      (favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID
    );
    setIsMovieLiked((prevState) => !prevState);
    setFavoriteMoviesToLocalStorage(favoriteMoviesFromLocalStorage);
  };

  return (
    <Card
      variant={"outlined"}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        position: "relative",
      }}
    >
      <Tooltip title={isMovieLiked ? "Remove like" : "Add like"}>
          <FontAwesomeIcon
            icon={faHeart}
            size="2x"
            color="lightblue"
            className={`heart-icon ${isMovieLiked && "active"}`}
            onClick={toggleMovieLikeHandler}
            style={{marginBottom: "1rem"}}
          />
      </Tooltip>
      <Image src={movie.Poster} alt={movie.Title} width={300} height={300} />

      <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
        {movie.Title}
      </Typography>
      <p>
        ImdbID: <span style={{ fontWeight: "bold" }}>{movie.imdbID}</span>
      </p>
      <p>
        Year: <span style={{ fontWeight: "bold" }}>{movie.Year}</span>
      </p>
      <p>
        Type: <span style={{ fontWeight: "bold" }}>{movie.Type}</span>
      </p>
      <Link href={`/movies/details/${movie.imdbID}`}>
        <Button
          variant="contained"
          sx={{ marginTop: "1rem" }}
          onClick={goToSpecificMoviePageHandler}
        >
          Details of {movie.Title}
        </Button>
      </Link>
    </Card>
  );
}
