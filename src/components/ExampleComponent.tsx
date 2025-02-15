import { gql, useQuery } from '@apollo/client';

const GET_EXAMPLE_DATA = gql`
  query GetExampleData {
    examples {
      id
      title
      description
    }
  }
`;

export default function ExampleComponent() {
  const { loading, error, data } = useQuery(GET_EXAMPLE_DATA);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.examples.map((example: any) => (
        <div key={example.id}>
          <h2>{example.title}</h2>
          <p>{example.description}</p>
        </div>
      ))}
    </div>
  );
}
