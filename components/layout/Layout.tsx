import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {Roboto} from "next/font/google";
import Main from "@/components/layout/Main";

export default function Layout({children}) {
  return <>
    <Header/>
    <Main>{children}</Main>
    <Footer/>
  </>
}