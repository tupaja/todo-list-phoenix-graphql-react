import "./commands";

beforeEach(() => {
  cy.checkoutSession();
});

afterEach(() => {
  cy.dropSession();
});

/* eslint-disable no-param-reassign */
Cypress.on("window:before:load", (win) => {
  win.fetch = null;
  const { send } = win.XMLHttpRequest.prototype;
  win.XMLHttpRequest.prototype.send = function (...args) {
    this.setRequestHeader("x-session-id", Cypress.env("sessionId"));
    send.apply(this, args);
  };
});
/* eslint-enable no-param-reassign */
