import React from "react";
import { Provider } from "react-redux";
import store from "~/store";
import "~/styles/main.scss";
import { AppPropsWithLayout } from "~/types/app";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  );
}
