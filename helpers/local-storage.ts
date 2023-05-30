import { IMovie } from "@/model/types";
import { LOCAL_STORAGE_FAVORITE_MOVIES_IDENTIFIER } from "@/lib/constants";

export const setFavoriteMoviesToLocalStorage = (moviesToStore: IMovie[]): void => {
  const favoriteMoviesJSON = JSON.stringify(moviesToStore);
  localStorage.setItem(
    LOCAL_STORAGE_FAVORITE_MOVIES_IDENTIFIER,
    favoriteMoviesJSON
  );
}; 

export const extractFavoriteMoviesFromLocalStorage = (): IMovie[] => {
  return JSON.parse(
    String(localStorage.getItem(LOCAL_STORAGE_FAVORITE_MOVIES_IDENTIFIER))
  );
};