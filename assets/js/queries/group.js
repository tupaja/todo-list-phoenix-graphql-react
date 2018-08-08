import gql from "graphql-tag";

export const CREATE_GROUP = gql`
  mutation createGroup($title: String!, $listUuid: String!) {
    createGroup(title: $title, listUuid: $listUuid) {
      id
      uuid
      title
      todos {
        id
        title
        completed
        dependencies {
          id
        }
      }
    }
  }
`;

export const GROUP_FRAGMENT = gql`
  fragment group on Group {
    id
    uuid
    title
    todos {
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
