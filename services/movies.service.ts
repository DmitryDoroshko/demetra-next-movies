import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_KEY, API_URL } from "@/lib/constants";
import { IMovie } from "@/model/types";
import {
  generateQueryStringForFetchingSingleMovieByImdbID,
  generateQueryStringWithTitle,
  generateQueryStringWithTitleAndPlot,
  generateQueryStringWithTitleAndYear,
  generateQueryStringWithTitleAndYearAndPlot,
} from "@/helpers/query-strings";

export const demetraMoviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: [
    "MoviesByTitle",
    "MoviesByTitleAndYear",
    "MoviesByTitleAndYearAndPlot",
    "MoviesByTitleAndPlot",
    "SingleMovie",
  ],
  endpoints: (builder) => ({
    getMoviesByTitle: builder.query<IMovie[], string>({
      query: (movieTitle: string) => {
        const queryString = generateQueryStringWithTitle(movieTitle);
        return { url: queryString };
      },
      transformResponse: (response: { Search: IMovie[] }, meta, arg) =>
        response.Search,
      providesTags: (result) => ["MoviesByTitle"],
    }),

    getMoviesByTitleAndYear: builder.query<
      IMovie[],
      { movieTitle: string; movieYear: number }
    >({
      query: (movieData: { movieTitle: string; movieYear: number }) => {
        const queryString = generateQueryStringWithTitleAndYear(movieData);
        return { url: queryString };
      },
      transformResponse: (response: { Search: IMovie[] }, meta, arg) =>
        response.Search,
      providesTags: (result) => ["MoviesByTitleAndYear"],
    }),

    getMoviesByTitleAndYearAndPlot: builder.query<
      IMovie[],
      {
        movieTitle: string;
        movieYear: number;
        moviePlot: "movie-short" | "movie-full";
      }
    >({
      query: (movieData: {
        movieTitle: string;
        movieYear: number;
        moviePlot: "movie-short" | "movie-full";
      }) => {
        const queryString =
          generateQueryStringWithTitleAndYearAndPlot(movieData);
        return { url: queryString };
      },
      transformResponse: (response: { Search: IMovie[] }, meta, arg) =>
        response.Search,
      providesTags: (result) => ["MoviesByTitleAndYearAndPlot"],
    }),

    getMoviesByTitleAndPlot: builder.query<
      IMovie[],
      {
        movieTitle: string;
        moviePlot: "movie-short" | "movie-full";
      }
    >({
      query: (movieData: {
        movieTitle: string;
        moviePlot: "movie-short" | "movie-full";
      }) => {
        const queryString = generateQueryStringWithTitleAndPlot(movieData);
        return { url: queryString };
      },
      transformResponse: (response: { Search: IMovie[] }, meta, arg) =>
        response.Search,
      providesTags: (result) => ["MoviesByTitleAndPlot"],
    }),

    getSingleMovieByImdbID: builder.query<IMovie, string>({
      query: (movieImdbID: string) => {
        const queryString =
          generateQueryStringForFetchingSingleMovieByImdbID(movieImdbID);
        return { url: queryString };
      },
      transformResponse: (response: IMovie, meta, arg) => response,
      providesTags: (result) => ["SingleMovie"],
    }),
  }),
});

export const {
  useLazyGetMoviesByTitleQuery,
  useLazyGetSingleMovieByImdbIDQuery,
  useLazyGetMoviesByTitleAndYearQuery,
  useLazyGetMoviesByTitleAndPlotQuery,
  useLazyGetMoviesByTitleAndYearAndPlotQuery,
} = demetraMoviesApi;
