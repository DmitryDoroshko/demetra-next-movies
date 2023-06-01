import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IMovie } from "@/model/types";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import React from "react";

interface IMoviesPaginationProps {
  pageSize: number;
  setMovies: Dispatch<SetStateAction<IMovie[]>>;
  allAvailableMovies: IMovie[];
}

export default function MoviesPagination({
  setMovies,
  pageSize,
  allAvailableMovies
}: IMoviesPaginationProps) {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    const moviesMinified = allAvailableMovies.slice(pagination.from, pagination.to);
    setPagination({...pagination, count: allAvailableMovies.length})
    setMovies(moviesMinified);
  }, [pagination.from, pagination.to]);

  const pageChangeHandler = (event: React.ChangeEvent<unknown>, page: number) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from, to });
  };

  return <Box justifyContent={"center"} alignItems={"center"} display={"flex"} sx={{margin: "2rem 0"}}>
    <Pagination color={"primary"} count={Math.ceil(pagination.count / pageSize)} onChange={pageChangeHandler}/>
  </Box>;
}