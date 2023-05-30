import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Main from "@/components/layout/Main";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { extractFavoriteMoviesFromLocalStorage } from "@/helpers/local-storage";
import { setFavoriteMovies } from "@/store/favoriteMovies/favoriteMoviesSlice";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const favoriteMovies = extractFavoriteMoviesFromLocalStorage();
    dispatch(setFavoriteMovies(favoriteMovies));
  }, []);

  return <>
    <Header/>
    <Main>{children}</Main>
    <Footer/>
  </>
}