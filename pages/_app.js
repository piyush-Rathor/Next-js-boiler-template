import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store";
import Auth from "./auth";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Card se</title>
        <link rel="shortcut icon" href="/CardSe-Logo.png" />
      </Head>
      <Auth Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

export default MyApp;
