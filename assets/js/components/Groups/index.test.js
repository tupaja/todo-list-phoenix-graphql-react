import { MemoryRouter } from "react-router";
import { MockedProvider } from "tests/utils";
import { LIST_GROUPS } from "queries/list";
import { Groups } from "./index";

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

const elements = [
  { uuid: "fake-group-1", id: 1, title: "group 1" },
  { uuid: "fake-group-2", id: 2, title: "group 2" },
  { uuid: "fake-group-3", id: 3, title: "group 3" }
];

describe("Groups", () => {
  it("renders a list of groups and shows the currently chosen one", async () => {
    const component = mount(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={["/l/fake-list/g/fake-group-2"]} initialIndex={0}>
          <Groups query={LIST_GROUPS} elements={elements} match={match} />
        </MemoryRouter>
      </MockedProvider>
    );

    const group1 = component.find("a[href='/l/fake-list/g/fake-group-1']");
    const group2 = component.find("a[href='/l/fake-list/g/fake-group-2']");
    const group3 = component.find("a[href='/l/fake-list/g/fake-group-3']");

    expect(group1.text()).toEqual("group 1");
    expect(group2.text()).toEqual("group 2");
    expect(group3.text()).toEqual("group 3");

    expect(group1.prop("className")).not.toMatch("is-active");
    expect(group2.prop("className")).toMatch("is-active");
    expect(group3.prop("className")).not.toMatch("is-active");
  });

  it("renders a form component", async () => {
    const component = mount(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={["/l/fake-list/g/fake-group-2"]} initialIndex={0}>
          <Groups query={LIST_GROUPS} elements={elements} match={match} />
        </MemoryRouter>
      </MockedProvider>
    );

    const form = component.find("form");
    expect(form.exists()).toBeTruthy();
  });
});
