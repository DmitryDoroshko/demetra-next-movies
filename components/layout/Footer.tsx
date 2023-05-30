import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.main",
        paddingTop: ".75rem",
        paddingBottom: ".75rem",
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item xs={6}>
            <Typography color="white" variant="h5">
              DemetraMovies
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box display={"flex"} justifyContent={"flex-end"}>
              <Typography color="white" variant="subtitle1">
                <Link
                  href="https://t.me/DmytroDoroshko"
                  color={"#fff"}
                  style={{ textDecoration: "none" }}
                  target={"_blank"}
                >
                  &copy; Dmytro Doroshko
                </Link>
                {` | React | NextJS | Material UI | ${new Date().getFullYear()}`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
