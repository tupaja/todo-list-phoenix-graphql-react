import { MemoryRouter } from "react-router";
import { MockedProvider } from "tests/utils";
import { Provider } from "react-redux";
import initStore from "store";
import { createBrowserHistory } from "history";
import { TOGGLE_TODO } from "queries/todo";
import { Todos } from "./index";

const history = createBrowserHistory();
const store = initStore(history);
const refetch = jest.fn();
const toggleTodo = {
  __typename: "Todo",
  dependencies: [],
  id: 2,
  title: "todo 2",
  completed: true,
  locked: false
};
const mocks = [
  {
    request: {
      query: TOGGLE_TODO,
      variables: { id: 2 }
    },
    result: { data: { toggleTodo } }
  }
];

const match = {
  params: {
    listUuid: "fake-list",
    groupUuid: "fake-group-2"
  }
};

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

describe("Todos", () => {
  it("renders a list of todos and calls the refresh function after toggling", async () => {
    const component = mount(
      <MockedProvider mocks={mocks}>
        <Provider store={store}>
          <MemoryRouter initialEntries={["/l/fake-list/g/fake-group-2"]} initialIndex={0}>
            <Todos refetch={refetch} match={match} groups={groups} />
          </MemoryRouter>
        </Provider>
      </MockedProvider>
    );

    const todo1 = component.find("label").at(0);
    const todo2 = component.find("label").at(1);
    const todo3 = component.find("label").at(2);
    const todo4 = component.find("label").at(3);

    expect(todo1.text()).toEqual("todo 1");
    expect(todo2.text()).toEqual("todo 2");
    expect(todo3.text()).toEqual("todo 3");
    expect(todo4.text()).toEqual("todo 4");

    expect(todo1.prop("className")).toMatch("has-text-grey-light");
    expect(todo2.prop("className")).not.toMatch("has-text-grey-light");
    expect(todo3.prop("className")).toMatch("has-text-grey-light");
    expect(todo4.prop("className")).not.toMatch("has-text-grey-light");

    expect(todo1.find("input").props()).toMatchObject({
      disabled: true,
      checked: true
    });
    expect(todo2.find("input").props()).toMatchObject({
      disabled: false,
      checked: true
    });
    expect(todo3.find("input").props()).toMatchObject({
      disabled: true,
      checked: false
    });
    expect(todo4.find("input").props()).toMatchObject({
      disabled: false,
      checked: false
    });

    todo2.find("input").simulate("click");

    await new Promise(setTimeout);

    expect(refetch).toBeCalled();
  });
});
