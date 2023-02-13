// Cypress
declare namespace Cypress {
  interface Chainable {

    logout(): () => void;
    // clearSessionStorage: () => void;
  }
}
