import {Button} from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
      <>
        <h1>
          Welcome to Demetra Movies!
        </h1>
        <Link href={"/movies"}><Button>Go to movies page</Button></Link>
      </>
  );
}
