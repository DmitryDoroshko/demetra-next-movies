export interface IMovies {
  movies: IMovie[];
}

export interface IMovie {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Actors?: string;
  Released?: string;
  Ratings?: Array<{Source: string; Value: string;}>;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Language?: string;
  Country?: string;
  IsLiked?: boolean;
}