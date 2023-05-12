import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {API_URL, API_KEY} from "@/lib/constants";
import {IMovie} from "@/model/types";

const generateQueryStringWithTitle = (movieTitle: string) => {
  const queryInfo = movieTitle.toLowerCase().split(" ").join("+");
  return `/?i=tt3896198&apikey=${API_KEY}&s=${queryInfo}`;
};

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    getMoviesByTitle: builder.query<IMovie[], string>({
      query: (movieTitle: string) => {
        const queryString = generateQueryStringWithTitle(movieTitle);
        return {url: queryString};
      },
      providesTags: result => ["Movies"],
    }),
  }),
});

export const {useGetMoviesByTitleQuery} = moviesApi;