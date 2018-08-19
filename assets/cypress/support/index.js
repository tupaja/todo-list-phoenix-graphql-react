import './commands'

beforeEach(() => {
  cy.checkoutSession();
});

afterEach(() => {
  cy.dropSession();
});

Cypress.on("window:before:load", win => {
  win.fetch = null;
  var send = win.XMLHttpRequest.prototype.send;
  win.XMLHttpRequest.prototype.send = function(){
    this.setRequestHeader("x-session-id", Cypress.env("sessionId"));
    send.apply(this, arguments);
  }
});
