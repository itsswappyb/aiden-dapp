import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharactersForUser($userId: uuid!) {
    characters(where: { userId: { _eq: $userId } }) {
      userId
      # isActive
      # isPublished
      character
    }
  }
`;
