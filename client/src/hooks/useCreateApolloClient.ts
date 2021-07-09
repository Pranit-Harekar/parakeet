import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'

import possibleTypes from '../shared/possibleTypes.json'

export default function useCreateApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    cache: new InMemoryCache({ possibleTypes }),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
      },
      watchQuery: {
        errorPolicy: 'all',
      },
    },
    link: createHttpLink({
      uri: 'http://localhost:5000/graphql',
    }),
  })
}
