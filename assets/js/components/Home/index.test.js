import { CREATE_LIST } from "queries/list";
import { MockedProvider } from "tests/utils";
import Home from "./index";

const push = jest.fn();
const createList = { id: 1, __typename: "List", uuid: "fake-list" };
const mocks = [
  {
    request: {
      query: CREATE_LIST,
      variables: {}
    },
    result: { data: { createList } }
  }
];

describe("Home", () => {
  it("redirects after creating a new list", async () => {
    const component = mount(
      <MockedProvider mocks={mocks}>
        <Home history={{ push }} />
      </MockedProvider>
    );

    const btn = component.find("button");
    btn.simulate("click");

    await new Promise(setTimeout);

    expect(push).toBeCalledWith("/l/fake-list");
  });
});
