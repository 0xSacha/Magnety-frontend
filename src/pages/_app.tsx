import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { StarknetProvider } from '@starknet-react/core'
import '../global.scss'
import Layout from '~/components/Layout'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../app/store'
import { ChakraProvider } from '@chakra-ui/react'
<<<<<<< HEAD

=======
import 'focus-visible/dist/focus-visible'
import { Global, css } from '@emotion/core'


const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
     outline: none;
     box-shadow: none;
   }
   margin-inline-start: 0;
   -webkit-margin-start:0;
`;
>>>>>>> pr/7

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <Provider store={store}>
      <StarknetProvider>
        <NextHead>
          <title>Magnety Finance</title>
        </NextHead>
        <Layout>
          <ChakraProvider>
          <Global styles={GlobalStyles} />
            <Component {...pageProps} />
          </ChakraProvider>
        </Layout>
      </StarknetProvider>
    </Provider>
  )
}

export default MyApp
