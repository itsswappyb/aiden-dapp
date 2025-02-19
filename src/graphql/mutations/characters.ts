import { gql } from '@apollo/client';

export const INSERT_CHARACTER = gql`
  mutation InsertCharacter($character: jsonb!, $userId: uuid!, $agentId: uuid) {
    insert_characters_one(object: { character: $character, userId: $userId, agentId: $agentId }) {
      id
      agentId
    }
  }
`;

export const START_AGENT = gql`
  mutation StartAgent($characterId: String!) {
    startAgent(input: { characterId: $characterId }) {
      id
    }
  }
`;
