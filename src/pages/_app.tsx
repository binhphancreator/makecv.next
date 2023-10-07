import React from "react";
import { Provider } from "react-redux";
import store from "~/store";
import { AppPropsWithLayout } from "~/types/app";
import { appWithTranslation } from "next-i18next";
import "@/index.scss";

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>;
};

export default appWithTranslation(App);
