import { MemoryRouter } from "react-router";
import { MockedProvider } from "tests/utils";
import { CREATE_GROUP } from "queries/group";
import { LIST_GROUPS } from "queries/list";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GroupForm } from "./index";

const push = jest.fn();
const createGroup = {
  id: 1,
  __typename: "Group",
  uuid: "fake-group",
  title: "my next group",
  todos: []
};
const mocks = [
  {
    request: {
      query: CREATE_GROUP,
      variables: { title: "my next group", listUuid: "fake-list" }
    },
    result: { data: { createGroup } }
  }
];

const match = {
  params: {
    listUuid: "fake-list"
  }
};

const cache = new InMemoryCache().restore({
  ROOT_QUERY: {
    "groups({\"listUuid\":\"fake-list\"})": []
  }
});

describe("GroupForm", () => {
  it("creates a new group and redirect to it afterwards", async () => {
    const component = mount(
      <MockedProvider mocks={mocks} cache={cache}>
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <GroupForm query={LIST_GROUPS} history={{ push }} match={match} />
        </MemoryRouter>
      </MockedProvider>
    );

    const input = component.find("input");
    input.instance().value = "my next group";

    const form = component.find("form");
    form.simulate("submit");

    await new Promise(setTimeout);

    expect(cache.data.data).toMatchObject({
      "Group:1": {
        id: 1,
        title: "my next group",
        uuid: "fake-group",
        todos: [],
        __typename: "Group"
      }
    });

    expect(push).toBeCalledWith("/l/fake-list/g/fake-group");
  });
});
