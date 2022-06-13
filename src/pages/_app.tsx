import type { AppProps } from "next/app";
import NextHead from "next/head";
import { StarknetProvider } from "@starknet-react/core";
import "../global.scss";
import Layout from "~/components/Layout";
import React from "react";
import { Provider } from "react-redux";
import store from "../app/store";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <StarknetProvider>
        <NextHead>
          <title>Magnety Finance</title>
        </NextHead>
        <Layout>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Layout>
      </StarknetProvider>
    </Provider>
  );
}

export default MyApp;
