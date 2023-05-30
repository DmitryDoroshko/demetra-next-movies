import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  useLazyGetMoviesByTitleQuery,
  useLazyGetMoviesByTitleAndYearQuery,
  useLazyGetMoviesByTitleAndPlotQuery,
  useLazyGetMoviesByTitleAndYearAndPlotQuery,
} from "@/services/movies.service";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  setMoviesLoaded,
  setMoviesLoading,
  setMoviesLoadingError,
  setSearchMoviePlot,
  setSearchMovieTitleString,
  setSearchMovieYear,
  setMovieSortOrderValue, setFilterMoviesValue
} from "@/store/movies/moviesSlice";
import AlertDialogSlide from "@/components/ui/AlertDialogSlide";
import { IMovie } from "@/model/types";
import { areTwoArraysEqual } from "@/helpers/check-equality";
import { selectFavoriteMovies } from "@/store/favoriteMovies/favoriteMoviesSlice";

const plots = [
  { value: "movie-short", label: "Short" },
  { value: "movie-full", label: "Full" },
];

const moviesOrder = [
  { value: "movie-sort-not-sorted", label: "Not Sorted" },
  { value: "movie-sort-descending", label: "Descending" },
  { value: "movie-sort-ascending", label: "Ascending" },
];

export default function SearchMovie() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [enteredMovieTitle, setEnteredMovieTitle] = useState<string>("");
  const [enteredMovieYear, setEnteredMovieYear] = useState<string>("");
  const [enteredMoviePlot, setEnteredMoviePlot] = useState<
    "movie-short" | "movie-full"
  >("movie-short");
  const favoriteMovies = useAppSelector(selectFavoriteMovies);

  const [triggerSearchMoviesByTitle] = useLazyGetMoviesByTitleQuery();
  const [triggerSearchMoviesByTitleAndYear] =
    useLazyGetMoviesByTitleAndYearQuery();
  const [triggerSearchMoviesByTitleAndPlot] =
    useLazyGetMoviesByTitleAndPlotQuery();
  const [triggerSearchMoviesByTitleAndYearAndPlot] =
    useLazyGetMoviesByTitleAndYearAndPlotQuery();

  const dispatch = useAppDispatch();

  const enteredMovieTitleChangeHandler = (event: any) => {
    const value = event.target.value;
    dispatch(setSearchMovieTitleString(event.target.value));
    setEnteredMovieTitle(event.target.value);
  };

  const enteredMovieYearChangeHandler = (event: any) => {
    const value = event.target.value;
    setEnteredMovieYear(value);
    dispatch(setSearchMovieYear(+value));
  };

  const enteredMoviePlotChangeHandler = (event: any) => {
    const value = event.target.value;
    setEnteredMoviePlot(value);
  };

  const handleSettingDataAndErrorAndLoading = (
    data: IMovie[] | undefined,
    error: any
  ) => {
    if (error) {
      dispatch(setMoviesLoadingError(error.toString()));
      dispatch(setMoviesLoading(false));
      return;
    }

    if (data) {
      const moviesLoadedCopy = data.map((movie) => {
        for (const favoriteMovie of favoriteMovies) {
          if (movie.imdbID === favoriteMovie.imdbID) {
            return { ...movie, IsLiked: true };
          }
        }
        return movie;
      });

      dispatch(setMoviesLoaded(moviesLoadedCopy));
      dispatch(setMoviesLoading(false));
      return;
    }

    dispatch(setMoviesLoading(false));
  };

  const formSubmitHandler = async (event: any) => {
    event.preventDefault();

    const isEnteredTitleValid = enteredMovieTitle.trim().length > 0;
    const isEnteredYearValid = Boolean(enteredMovieYear);
    const isEnteredPlotValid = Boolean(enteredMoviePlot);

    if (!isEnteredTitleValid) {
      setShowAlert(true);
      return;
    }

    dispatch(setMoviesLoading(true));

    // Search movies only by Title
    if (isEnteredTitleValid && !isEnteredYearValid && isEnteredPlotValid) {
      const { data, error, isLoading } = await triggerSearchMoviesByTitle(
        enteredMovieTitle,
        false
      );

      dispatch(setMoviesLoading(isLoading));
      handleSettingDataAndErrorAndLoading(data, error);
    }

    // Search movies by title and plot (and not year)
    if (
      isEnteredTitleValid &&
      !isEnteredYearValid &&
      enteredMoviePlot === "movie-full"
    ) {
      const { data, isLoading, error } =
        await triggerSearchMoviesByTitleAndPlot({
          movieTitle: enteredMovieTitle,
          moviePlot: enteredMoviePlot,
        });

      dispatch(setMoviesLoading(isLoading));
      handleSettingDataAndErrorAndLoading(data, error);
      return;
    }

    // Search movies by Title and Year and Plot
    if (
      isEnteredTitleValid &&
      isEnteredYearValid &&
      enteredMoviePlot === "movie-full"
    ) {
      const { data, error, isLoading } =
        await triggerSearchMoviesByTitleAndYearAndPlot(
          {
            movieTitle: enteredMovieTitle,
            movieYear: parseInt(enteredMovieYear),
            moviePlot: enteredMoviePlot,
          },
          false
        );

      dispatch(setMoviesLoading(isLoading));
      handleSettingDataAndErrorAndLoading(data, error);
      return;
    }

    // Search movies by Title and Year
    if (
      isEnteredTitleValid &&
      isEnteredYearValid &&
      enteredMoviePlot === "movie-short"
    ) {
      const { data, error, isLoading } =
        await triggerSearchMoviesByTitleAndYear(
          {
            movieTitle: enteredMovieTitle,
            movieYear: parseInt(enteredMovieYear),
          },
          false
        );

      dispatch(setMoviesLoading(isLoading));
      handleSettingDataAndErrorAndLoading(data, error);
      return;
    }
  };

  const formResetHandler = () => {
    setEnteredMovieTitle("");
    setEnteredMovieYear("");
    setEnteredMoviePlot("movie-short");

    dispatch(setFilterMoviesValue(""));
    dispatch(setSearchMovieTitleString(""));
    dispatch(setSearchMovieYear(null));
    dispatch(setSearchMoviePlot("movie-short"));
  };

  const movieSortingOrderChangeHandler = (event: any) => {
    dispatch(setMovieSortOrderValue(event.target.value));
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <Box>
          <Grid
            container
            spacing={3}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            marginBottom={"1rem"}
          >
            <Grid item xs={4} md={8}>
              <Grid
                container
                columnSpacing={5}
                alignItems={"center"}
                direction={{ xs: "column", md: "row" }}
                justifyContent={{ xs: "flex-start", md: "space-between" }}
              >
                <Grid item xs={12} md={5}>
                  <Typography variant={"subtitle1"}>
                    Enter movie title:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <TextField
                    id="outlined-movie-title"
                    label="Movie title"
                    variant="outlined"
                    size={"small"}
                    onChange={enteredMovieTitleChangeHandler}
                    value={enteredMovieTitle}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/*Movie title items*/}

            <Grid item xs={4} md={8}>
              <Grid
                container
                columnSpacing={5}
                alignItems={"center"}
                direction={{ xs: "column", md: "row" }}
                justifyContent={{ xs: "flex-start", md: "space-between" }}
              >
                <Grid item xs={12} md={5}>
                  <Typography variant={"subtitle1"}>
                    Enter movie year:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <TextField
                    id="outlined-movie-year"
                    type={"number"}
                    label="Movie year"
                    variant="outlined"
                    size={"small"}
                    onChange={enteredMovieYearChangeHandler}
                    value={enteredMovieYear}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/*Movie Year items*/}

            <Grid item xs={4} md={8}>
              <Grid
                container
                columnSpacing={5}
                alignItems={"center"}
                direction={{ xs: "column", md: "row" }}
                justifyContent={{ xs: "flex-start", md: "space-between" }}
              >
                <Grid item xs={12} md={5}>
                  <Typography variant={"subtitle1"}>
                    Enter movie plot:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <TextField
                    select
                    id="outlined-movie-plot"
                    label="Movie plot"
                    defaultValue={"movie-short"}
                    helperText="Please select your movie plot"
                    variant="outlined"
                    size={"small"}
                    onChange={enteredMoviePlotChangeHandler}
                  >
                    {plots.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            {/*  Movie plot items */}

            <Grid
              item
              container
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid item container justifyContent={"center"}>
                <TextField
                  select
                  id={"outlined-movie-sorting-order"}
                  defaultValue={"movie-sort-not-sorted"}
                  helperText={"Select movies sorting order"}
                  color={"primary"}
                  label={"Movies sorting order"}
                  size={"small"}
                  onChange={movieSortingOrderChangeHandler}
                >
                  {moviesOrder.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            {/* Movie sorting order items */}

            <Grid
              item
              container
              rowSpacing={2}
              justifyContent={"center"}
              columnGap={1}
            >
              <Grid item container xs={12} md={6} justifyContent={"center"}>
                <Button type={"submit"} variant={"contained"} color={"success"}>
                  Search
                </Button>
                <Button
                  type={"button"}
                  variant={"contained"}
                  color={"error"}
                  onClick={formResetHandler}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
            {/*  Grid Actions Buttons */}
          </Grid>
        </Box>
      </form>
      {showAlert && (
        <AlertDialogSlide
          message={"Title should not be empty..."}
          onOk={() => {
            setShowAlert(false);
          }}
        />
      )}
    </>
  );
}
