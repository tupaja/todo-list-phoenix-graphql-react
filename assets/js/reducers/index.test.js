import { CHANGE_DEPENDENCIES } from "actions/todo";
import rootReducer from "./index";

describe("root reducer", () => {
  describe("handling CHANGE_DEPENDENCIES action", () => {
    it("sets new dependencies from the action", () => {
      const state = {
        dependencies: [
          { label: "First", value: "first" }
        ]
      };
      const values = [
        { label: "First", value: "first" },
        { label: "Second", value: "second" }
      ];
      const action = { type: CHANGE_DEPENDENCIES, values };
      const result = rootReducer(state, action);

      expect(result.dependencies).toEqual(values);
    });
  });
});
