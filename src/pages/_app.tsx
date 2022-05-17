import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { InjectedConnector, StarknetProvider } from '@starknet-react/core'
import '../global.scss'
import Layout from '~/components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = [new InjectedConnector()]

  return (
    <StarknetProvider autoConnect connectors={connectors}>
      <NextHead>
        <title>StarkNet ❤️ React</title>
      </NextHead>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StarknetProvider>
  )
}

export default MyApp
