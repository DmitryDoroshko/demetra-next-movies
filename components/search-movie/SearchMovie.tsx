import {Box, Button, Grid, MenuItem, TextField, Typography} from "@mui/material";
import {useState} from "react";

const plots = [
  {value: "movie-short", label: "Short"},
  {value: "movie-long", label: "Long"},
];

const moviesOrder = [
  {value: "movie-sort-descending", label: "Descending"},
  {value: "movie-sort-ascending", label: "Ascending"},
];

export default function SearchMovie() {
  const [enteredMovieTitle, setEnteredMovieTitle] = useState<string>("");
  const [enteredMovieYear, setEnteredMovieYear] = useState<string>("");
  const [enteredMoviePlot, setEnteredMoviePlot] = useState<"movie-short" | "movie-long">("movie-short");

  const enteredMovieTitleChangeHandler = ({target: {value}}) => {
    setEnteredMovieTitle(value);
  };

  const enteredMovieYearChangeHandler = ({target: {value}}) => {
    setEnteredMovieYear(value);
  };

  const enteredMoviePlotChangeHandler = ({target: {value}}) => {
    setEnteredMoviePlot(value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
      <form onSubmit={formSubmitHandler}>
        <Box xs={{
          width: 500,
          height: 500,
          border: "10px solid black"
        }}>
          <Grid container spacing={3} direction={"column"} justifyContent={"center"} marginBottom={"1rem"}>
            <Grid item xs={4} md={8}>
              <Grid container direction={"row"} columnSpacing={5} alignItems={"center"}
                    justifyContent={"space-between"}>
                <Grid item xs={12} md={5}>
                  <Typography variant={"subtitle1"}>Enter movie title:</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <TextField id="outlined-movie-title" label="Movie title" variant="outlined" size={"small"}
                             onChange={enteredMovieTitleChangeHandler} value={enteredMovieTitle}/>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Grid container direction={"row"} columnSpacing={5} alignItems={"center"}
                    justifyContent={"space-between"}>
                <Grid item xs={12} md={5}>
                  <Typography variant={"subtitle1"}>Enter movie year:</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <TextField id="outlined-movie-year" type={"number"} label="Movie year" variant="outlined"
                             size={"small"} onChange={enteredMovieYearChangeHandler} value={enteredMovieYear}/>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Grid container direction={"row"} columnSpacing={5} alignItems={"center"}
                    justifyContent={"space-between"}>
                <Grid item xs={12} md={5}>
                  <Typography variant={"subtitle1"}>Enter movie plot:</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <TextField select
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
          </Grid>

          <Grid container sx={{marginBottom: "1rem"}} justifyContent={"center"}>
            <Grid item>
              <TextField
                  select
                  id={"outlined-movie-sorting-order"}
                  defaultValue={"movie-sort-descending"}
                  helperText={"Select movies sorting order"}
                  color={"primary"}
                  label={"Movies sorting order"}
                  size={"small"}
              >
                {moviesOrder.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container sx={{my: "1rem"}} rowSpacing={2} justifyContent={"center"} columnGap={1}>
            <Button type={"submit"} variant={"contained"} color={"success"}>Search</Button>
            <Button type={"button"} variant={"contained"} color={"error"}>Reset</Button>
          </Grid>
        </Box>
      </form>
  );
}