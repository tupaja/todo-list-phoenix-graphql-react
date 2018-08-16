import gql from "graphql-tag";

export const CREATE_LIST = gql`
  mutation {
    createList {
      id
      uuid
    }
  }
`;

export const LIST_GROUPS = gql`
  query groups($listUuid: String!) {
    groups(listUuid: $listUuid) {
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
  }
`;
