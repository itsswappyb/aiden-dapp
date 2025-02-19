import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharactersForUser {
    characters(where: { userId: { _eq: "7fd351b3-dc82-406d-a326-bfb6ef7bebce" } }) {
      userId
      isActive
      isPublished
      character
    }
  }
`;
