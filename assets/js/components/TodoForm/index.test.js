import { MemoryRouter } from "react-router";
import { MockedProvider } from "tests/utils";
import { CREATE_TODO } from "queries/todo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { TodoForm } from "./index";

const clearDependencies = jest.fn();
const changeDependencies = jest.fn();
const createTodo = {
  id: 5,
  __typename: "Todo",
  uuid: "fake-todo",
  title: "my next todo",
  completed: false,
  locked: false,
  dependencies: [
    { id: 1, __typename: "Todo" },
    { id: 2, __typename: "Todo" },
    { id: 4, __typename: "Todo" }
  ]
};
const mocks = [
  {
    request: {
      query: CREATE_TODO,
      variables: { title: "my next todo", groupId: 2, dependencies: [1, 2, 4] }
    },
    result: { data: { createTodo } }
  }
];

const cache = new InMemoryCache().restore({
  "Group:2": {
    id: 2,
    title: "group 2",
    todos: [],
    __typename: "Group",
    uuid: "fake-group-2"
  },
  ROOT_QUERY: {
    "groups({\"listUuid\":\"fake-list\"})": [
      { type: "id", generated: false, id: "Group:2", typename: "Group" }
    ]
  }
});

const groups = [
  { uuid: "fake-group-1", id: 1, title: "group 1", todos: [] },
  { uuid: "fake-group-2",
    id: 2,
    title: "group 2",
    todos: [
      { id: 1, title: "todo 1", completed: true, locked: true },
      { id: 2, title: "todo 2", completed: true, locked: false },
      { id: 3, title: "todo 3", completed: false, locked: true },
      { id: 4, title: "todo 4", completed: false, locked: false }
    ] },
  { uuid: "fake-group-3", id: 3, title: "group 3", todos: [] }
];

const group = { id: 2, title: "todo 2", completed: true, locked: false };
const dependencies = [
  { label: "todo 1", value: 1 },
  { label: "todo 2", value: 2 },
  { label: "todo 4", value: 4 }
];

describe("TodoForm", () => {
  it("creates a new todo and clears the dependencies select", async () => {
    const component = mount(
      <MockedProvider mocks={mocks} cache={cache}>
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <TodoForm
            group={group}
            groups={groups}
            dependencies={dependencies}
            clearDependencies={clearDependencies}
            changeDependencies={changeDependencies}
          />
        </MemoryRouter>
      </MockedProvider>
    );

    const input = component.find("input[name='title']");
    input.instance().value = "my next todo";

    const form = component.find("form");
    form.simulate("submit");

    await new Promise(setTimeout);

    expect(cache.data.data).toMatchObject({
      "Todo:5": {
        id: 5,
        title: "my next todo",
        completed: false,
        locked: false,
        dependencies: [
          { type: "id", generated: false, id: "Todo:1", typename: "Todo" },
          { type: "id", generated: false, id: "Todo:2", typename: "Todo" },
          { type: "id", generated: false, id: "Todo:4", typename: "Todo" }
        ],
        __typename: "Todo"
      }
    });

    expect(clearDependencies).toBeCalled();
  });
});
