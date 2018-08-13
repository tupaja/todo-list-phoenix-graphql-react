import { Todos } from "./index";

describe("Todos", () => {
  it("", () => {
    const component = shallow(
      <Todos
        refetch={ () => {} }
        match={ { params: "" } }
        groups={ [] }
      />
    );
    console.log(component.debug());
  });
});
