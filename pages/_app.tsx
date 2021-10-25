import React from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { ApiProvider } from "../contexts/api";
import "tailwindcss/tailwind.css"
import "../styles/globals.css"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ApiProvider>
      <>
      <Component {...pageProps} />
      </>
    </ApiProvider>
  );
}
