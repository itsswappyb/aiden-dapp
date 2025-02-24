import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharactersForUser($userId: uuid!) {
    characters(where: { userId: { _eq: $userId } }) {
      id
      userId
      isActive
      isPublished
      character
    }
  }
`;
