export const addTodo = (title, dependencies = []) => {
  dependencies.forEach((dependency) => {
    cy.get(".control input").first().type(dependency, { force: true }).type("{enter}");
  });
  cy.getElement("todo-title").type(title).type("{enter}");
};

export const addGroup = (title) => {
  cy.getElement("group-title").type(title).type("{enter}");
};

export const getTodoInput = title => cy.contains("label", title).find("input");
