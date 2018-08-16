import { LIST_GROUPS } from "queries/list";
import { MockedProvider } from "tests/utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import initStore from "store";
import { createBrowserHistory } from "history";
import { List } from "./index";

const history = createBrowserHistory();
const store = initStore(history);
const data = { groups: [] };
const mocks = [
  {
    request: {
      query: LIST_GROUPS,
      variables: { listUuid: "fake-list" }
    },
    result: { data }
  }
];
const match = {
  params: {
    listUuid: "fake-list"
  }
};

describe("List", () => {
  describe("before the query finishes", () => {
    it("renders a loading message", async () => {
      const component = mount(
        <MockedProvider mocks={mocks}>
          <MemoryRouter initialEntries={["/"]} initialIndex={0}>
            <List match={match} />
          </MemoryRouter>
        </MockedProvider>
      );

      expect(component.text()).toContain("Loading...");
    });
  });

  describe("when the query return an error", () => {
    it("renders an error message", async () => {
      const mocks = [
        {
          request: {
            query: LIST_GROUPS,
            variables: { listUuid: "fake-list" }
          },
          error: new Error("sorry")
        }
      ];
      const component = mount(
        <MockedProvider mocks={mocks}>
          <MemoryRouter initialEntries={["/"]} initialIndex={0}>
            <List match={match} />
          </MemoryRouter>
        </MockedProvider>
      );

      await new Promise(setTimeout);
      component.update();

      expect(component.text()).toContain("Something went wrong");
    });
  });

  describe("after the query finishes", () => {
    describe("when accessing the list url", () => {
      it("renders a list of groups without the list of todos", async () => {
        const component = mount(
          <MockedProvider mocks={mocks}>
            <MemoryRouter initialEntries={["/l/fake-list"]} initialIndex={0}>
              <List match={match} />
            </MemoryRouter>
          </MockedProvider>
        );

        await new Promise(setTimeout);

        component.update();
        const groups = component.find("Groups");
        const todos = component.find("Todos");

        expect(groups.props()).toMatchObject({
          elements: data.groups,
          query: LIST_GROUPS
        });

        expect(todos.exists()).toBeFalsy();
      });
    });

    describe("when accessing the group url", () => {
      it("renders a list of groups along with the list of todos", async () => {
        const component = mount(
          <MockedProvider mocks={mocks}>
            <Provider store={store}>
              <MemoryRouter initialEntries={["/l/fake-list/g/fake-group-1"]} initialIndex={0}>
                <List match={match} />
              </MemoryRouter>
            </Provider>
          </MockedProvider>
        );

        await new Promise(setTimeout);

        component.update();
        const groups = component.find("Groups");
        const todos = component.find("Todos");

        expect(groups.props()).toMatchObject({
          elements: data.groups,
          query: LIST_GROUPS
        });

        expect(todos.props()).toMatchObject({
          query: LIST_GROUPS,
          groups: data.groups
        });
      });
    });
  });
});
