export interface IMovies {
  movies: IMovie[];
}

export interface IMovie {
  Title: string;
  Year: number;
  imdbId: string;
  Type: string;
  Poster: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Language?: string;
  Country?: string;
}