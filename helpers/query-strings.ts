import { parseMovieTitle } from "@/helpers/parse";
import { API_KEY } from "@/lib/constants";

export const generateQueryStringWithTitle = (movieTitle: string) => {
  const queryInfo = parseMovieTitle(movieTitle);
  return `/?apikey=${API_KEY}&s=${queryInfo}`;
};

export const generateQueryStringWithTitleAndYear = (movieData: {
  movieTitle: string;
  movieYear: number;
}) => {
  const { movieTitle, movieYear } = movieData;
  const movieTitleParsed = parseMovieTitle(movieTitle);
  const queryInfo = `s=${movieTitleParsed}&y=${movieYear}`;
  return `/?apikey=${API_KEY}&${queryInfo}`;
};

export const generateQueryStringWithTitleAndPlot = (movieData: {
  movieTitle: string;
  moviePlot: "movie-short" | "movie-full";
}) => {
  const { movieTitle, moviePlot } = movieData;
  const movieTitleParsed = parseMovieTitle(movieTitle);
  const moviePlotPlaceholder = moviePlot === "movie-full" ? `plot=full` : "";
  const queryInfo = `s=${movieTitleParsed}&${moviePlotPlaceholder}`;
  return `/?apikey=${API_KEY}&${queryInfo}`;
};

export const generateQueryStringWithTitleAndYearAndPlot = (movieData: {
  movieTitle: string;
  movieYear: number;
  moviePlot: "movie-short" | "movie-full";
}) => {
  const { movieTitle, movieYear, moviePlot } = movieData;
  const movieTitleParsed = parseMovieTitle(movieTitle);
  const moviePlotPlaceholder = moviePlot === "movie-full" ? `plot=full` : "";
  const queryInfo = `s=${movieTitleParsed}&y=${movieYear}&${moviePlotPlaceholder}`;
  return `/?apikey=${API_KEY}&${queryInfo}`;
};

export const generateQueryStringForFetchingSingleMovieByImdbID = (movieImdbID: string) => {
  return `/?apikey=${API_KEY}&i=${movieImdbID}`;
};
