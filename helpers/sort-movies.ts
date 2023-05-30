import { IMovie } from "@/model/types";

export function sortAscendingFunc(
  firstParam: IMovie,
  secondParam: IMovie
): number {
  if (firstParam.Title < secondParam.Title) return -1;
  if (firstParam.Title > secondParam.Title) return 1;
  return 0;
}

export function sortDescendingFunc(
  firstParam: IMovie,
  secondParam: IMovie
): number {
  if (firstParam.Title < secondParam.Title) return 1;
  if (firstParam.Title > secondParam.Title) return -1;
  return 0;
}

export function sortMovies(
  moviesToSort: IMovie[],
  sortOrderValue:
    | "movie-sort-not-sorted"
    | "movie-sort-descending"
    | "movie-sort-ascending"
): IMovie[] {
  let sortedMovies: IMovie[] = [...moviesToSort];

  if (sortOrderValue === "movie-sort-descending") {
    return sortedMovies.sort(sortDescendingFunc);
  }

  if (sortOrderValue === "movie-sort-ascending") {
    return sortedMovies.sort(sortAscendingFunc);
  }

  return sortedMovies;
}
