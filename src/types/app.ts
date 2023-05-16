import type { ReactElement } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?(page?: ReactElement): ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type SvgProps = {
  width?: number | string,
  height?: number | string,
  color?: string,
}
