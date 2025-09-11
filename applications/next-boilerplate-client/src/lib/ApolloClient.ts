import { HttpLink } from '@apollo/client'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import { __DEV__ } from '@apollo/client/utilities/globals'

import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:4000/',
    }),
  })
})

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages()
  loadErrorMessages()
}
