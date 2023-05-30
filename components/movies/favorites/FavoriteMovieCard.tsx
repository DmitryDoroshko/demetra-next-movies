import Image from "next/image";
import { Button, Card, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { IMovie } from "@/model/types";
import { extractFavoriteMoviesFromLocalStorage, setFavoriteMoviesToLocalStorage } from "@/helpers/local-storage";
import { addFavoriteMovie, removeFavoriteMovie } from "@/store/favoriteMovies/favoriteMoviesSlice";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useRouter } from "next/router";

interface FavoriteMovieCardProps {
  movie: IMovie;
}

export default function FavoriteMovieCard({movie}: FavoriteMovieCardProps) {
  const [isMovieLiked, setIsMovieLiked] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const goToSpecificMoviePageHandler = () => {
    router.push(`/movies/details/${movie.imdbID}`);
  };
  const toggleMovieLikeHandler = () => {
    setIsMovieLiked((prevState) => !prevState);
    let favoriteMovies = extractFavoriteMoviesFromLocalStorage() || [];
    if (isMovieLiked) {
      dispatch(removeFavoriteMovie(movie.imdbID));
      favoriteMovies = favoriteMovies.filter(
        (favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID
      );
    } else {
      dispatch(addFavoriteMovie({...movie, IsLiked: true}));
      if (
        !favoriteMovies.some(
          (favoriteMovie) => favoriteMovie.imdbID === movie.imdbID
        )
      ) {
        favoriteMovies.push(movie as IMovie);
      }
    }
    setFavoriteMoviesToLocalStorage(favoriteMovies);
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
      }}
    >
      <div style={{ position: "relative" }}>
        <Image src={movie.Poster} alt={movie.Title} width={300} height={300} />
        <Tooltip title={isMovieLiked ? "Remove like" : "Add like"}>
          <FontAwesomeIcon
            icon={faHeart}
            size="2x"
            color="lightblue"
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
            }}
            className={`heart-icon ${isMovieLiked && "active"}`}
            onClick={toggleMovieLikeHandler}
          />
        </Tooltip>
      </div>
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