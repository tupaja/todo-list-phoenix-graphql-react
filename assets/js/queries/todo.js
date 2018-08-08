import gql from "graphql-tag";

export const CREATE_TODO = gql`
  mutation createTodo(
    $title: String!
    $groupId: String!
    $dependencies: [String!]
  ) {
    createTodo(title: $title, groupId: $groupId, dependencies: $dependencies) {
      id
      title
      completed
      locked
      dependencies {
        id
      }
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation toggleTodo($id: String!) {
    toggleTodo(id: $id) {
      id
      title
      completed
      dependencies {
        id
      }
    }
  }
`;
