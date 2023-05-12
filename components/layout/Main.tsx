import {Grid} from "@mui/material";
import {Roboto} from "next/font/google";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function Main({children}) {
  return (
      <main className={roboto.className}>
        <Grid
            container
            spacing={0}
            marginTop={"5rem"}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            style={{minHeight: "100vh"}}>
          <Grid item xs={3}>
            {children}
          </Grid>
        </Grid>
      </main>
  );
}