import {
  addGroup,
  addTodo,
  getTodoInput,
  completeTodo
} from "../support/helpers";

describe("Todo List app", () => {
  it("allows managing todos with dependencies", () => {
    cy.server();
    cy.route("POST", "/api/graphiql").as("request");
    cy.visit("/");
    cy.contains("button", "Create").click();

    addGroup("Shopping");
    addGroup("At a party");

    cy.contains("Shopping").click();

    addTodo("Go to the ATM");
    addTodo("Buy a bottle of rum", ["Go to the ATM"]);
    addTodo("Buy limes", ["Go to the ATM"]);
    addTodo("Buy cane sugar", ["Go to the ATM"]);
    addTodo("Buy peppermint", ["Go to the ATM"]);

    getTodoInput("Go to the ATM").should("not.be.disabled").should("not.be.checked");
    getTodoInput("Buy a bottle of rum").should("be.disabled").should("not.be.checked");
    getTodoInput("Buy limes").should("be.disabled").should("not.be.checked");
    getTodoInput("Buy cane sugar").should("be.disabled").should("not.be.checked");
    getTodoInput("Buy peppermint").should("be.disabled").should("not.be.checked");

    cy.contains("At a party").click();

    addTodo("Prepare ingredients", [
      "Buy a bottle of rum",
      "Buy limes",
      "Buy cane sugar",
      "Buy peppermint"
    ]);

    addTodo("Get some ice from the fridge");
    addTodo("Mix everything together", [
      "Prepare ingredients",
      "Get some ice from the fridge"
    ]);

    getTodoInput("Prepare ingredients").should("be.disabled").should("not.be.checked");
    getTodoInput("Get some ice from the fridge").should("not.be.disabled").should("not.be.checked");
    getTodoInput("Mix everything together").should("be.disabled").should("not.be.checked");

    // start checking
    cy.contains("Shopping").click();

    completeTodo("Go to the ATM");

    getTodoInput("Go to the ATM").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy a bottle of rum").should("not.be.disabled").should("not.be.checked");
    getTodoInput("Buy limes").should("not.be.disabled").should("not.be.checked");
    getTodoInput("Buy cane sugar").should("not.be.disabled").should("not.be.checked");
    getTodoInput("Buy peppermint").should("not.be.disabled").should("not.be.checked");

    completeTodo("Buy a bottle of rum");

    getTodoInput("Go to the ATM").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy a bottle of rum").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy limes").should("not.be.disabled").should("not.be.checked");
    getTodoInput("Buy cane sugar").should("not.be.disabled").should("not.be.checked");
    getTodoInput("Buy peppermint").should("not.be.disabled").should("not.be.checked");

    completeTodo("Buy limes");

    getTodoInput("Go to the ATM").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy a bottle of rum").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy limes").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy cane sugar").should("not.be.disabled").should("not.be.checked");
    getTodoInput("Buy peppermint").should("not.be.disabled").should("not.be.checked");

    completeTodo("Buy cane sugar");

    getTodoInput("Go to the ATM").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy a bottle of rum").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy limes").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy cane sugar").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy peppermint").should("not.be.disabled").should("not.be.checked");

    completeTodo("Buy peppermint");

    getTodoInput("Go to the ATM").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy a bottle of rum").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy limes").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy cane sugar").should("not.be.disabled").should("be.checked");
    getTodoInput("Buy peppermint").should("not.be.disabled").should("be.checked");

    cy.contains("At a party").click();

    getTodoInput("Prepare ingredients").should("not.be.disabled").should("not.be.checked");
    getTodoInput("Get some ice from the fridge").should("not.be.disabled").should("not.be.checked");
    getTodoInput("Mix everything together").should("be.disabled").should("not.be.checked");

    completeTodo("Prepare ingredients");

    getTodoInput("Prepare ingredients").should("not.be.disabled").should("be.checked");
    getTodoInput("Get some ice from the fridge").should("not.be.disabled").should("not.be.checked");
    getTodoInput("Mix everything together").should("be.disabled").should("not.be.checked");

    completeTodo("Get some ice from the fridge");

    getTodoInput("Prepare ingredients").should("not.be.disabled").should("be.checked");
    getTodoInput("Get some ice from the fridge").should("not.be.disabled").should("be.checked");
    getTodoInput("Mix everything together").should("not.be.disabled").should("not.be.checked");

    completeTodo("Mix everything together");

    getTodoInput("Prepare ingredients").should("not.be.disabled").should("be.checked");
    getTodoInput("Get some ice from the fridge").should("not.be.disabled").should("be.checked");
    getTodoInput("Mix everything together").should("not.be.disabled").should("be.checked");
  });
});
