import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:8082/v1/graphql',
  cache: new InMemoryCache(),
});
