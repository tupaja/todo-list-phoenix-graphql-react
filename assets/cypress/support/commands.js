Cypress.Commands.add("getElement", name => cy.get(`[data-test="${name}"]`));

Cypress.Commands.add("checkoutSession", async () => {
  const response = await fetch("/sandbox", {
    cache: "no-store",
    method: "POST"
  });

  const sessionId = await response.text();
  return Cypress.env("sessionId", sessionId);
});

Cypress.Commands.add("dropSession", () => fetch("/sandbox", {
  method: "DELETE",
  headers: { "x-session-id": Cypress.env("sessionId") }
}));
