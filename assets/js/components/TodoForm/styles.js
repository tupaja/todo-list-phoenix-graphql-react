import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const TitleInput = styled.input.attrs({
  "data-test": "todo-title",
  className: "control input",
  name: "title",
  type: "text"
})`
  margin: 10px 0 20px 0;
`;
