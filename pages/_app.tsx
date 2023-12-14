import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'

import { client } from '@/graphql/apollo-client'
import { setupStore } from '@/store/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={setupStore()}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  )
}
