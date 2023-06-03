import React, { ReactNode } from "react";
import Head from "next/head";
import DefaultLayout from "~/layouts/default";
import { NextPageWithLayout } from "~/types/app";

interface Props {
  children?: ReactNode;
}

const Home: NextPageWithLayout = ({}: Props) => {
  return (
    <>
      <Head>
        <title>Fallora</title>
      </Head>
      <div>Home</div>
    </>
  );
};

Home.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
