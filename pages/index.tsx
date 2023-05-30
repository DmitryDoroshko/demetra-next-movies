import {Button} from "@mui/material";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useEffect } from "react";
import { extractFavoriteMoviesFromLocalStorage } from "@/helpers/local-storage";
import { setFavoriteMovies } from "@/store/favoriteMovies/favoriteMoviesSlice";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const favoriteMovies = extractFavoriteMoviesFromLocalStorage();
    dispatch(setFavoriteMovies(favoriteMovies));
  }, []);

  return (
      <>
        <h1>
          Welcome to Demetra Movies!
        </h1>
        <Link href={"/movies"}><Button>Go to movies page</Button></Link>
      </>
  );
}
