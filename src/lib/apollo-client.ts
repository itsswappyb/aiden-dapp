import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:8082/v1/graphql' : '/api/graphql',
  cache: new InMemoryCache(),
});
