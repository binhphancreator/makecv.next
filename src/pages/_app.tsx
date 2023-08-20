import React from "react";
import { Provider } from "react-redux";
import store from "~/store";
import { AppPropsWithLayout } from "~/types/app";
import "@/index.scss";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>;
}
