import { IMovie } from "@/model/types";

export function filterMovies(moviesToFilter: IMovie[], filterString: string) {
  return moviesToFilter.filter(movie => movie.Title.toLowerCase().includes(filterString.toLowerCase()));
}