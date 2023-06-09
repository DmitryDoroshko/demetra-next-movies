import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import Layout from "@/components/layout/Layout";
import {store} from "@/store";
import {Provider} from "react-redux";

export default function MyApp({Component, pageProps}: AppProps) {
  return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
  );
}

