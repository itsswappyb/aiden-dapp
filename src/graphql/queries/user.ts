import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($wallet_address: String!) {
    users(where: { wallet_address: { _eq: $wallet_address } }) {
      id
    }
  }
`;

export const INSERT_USER = gql`
  mutation InsertUser($wallet_address: String!) {
    insert_users_one(object: { wallet_address: $wallet_address }) {
      id
    }
  }
`;
