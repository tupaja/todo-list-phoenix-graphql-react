export const addTodo = (title, dependencies = []) => {
  dependencies.forEach((dependency) => {
    cy.get(".control input").first().type(dependency, { force: true }).type("{enter}");
  });
  cy.getElement("todo-title").type(title).type("{enter}");
  cy.wait("@request");
};

export const addGroup = (title) => {
  cy.getElement("group-title").type(title).type("{enter}");
  cy.wait("@request");
};

export const getTodoInput = title => cy.contains("label", title).find("input");

export const completeTodo = (title) => {
  getTodoInput(title).click();
  cy.wait("@request");
};
