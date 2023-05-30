export const parseMovieTitle = (title: string) => {
  return title.toLowerCase().split(" ").join("+");
};