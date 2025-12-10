/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Comando personalizado para seleccionar por data-cy
     * @example cy.dataCy('boton-guardar')
     */
    dataCy(value: string): Chainable<JQuery<HTMLElement>>
		login(email: string, password: string): Chainable<void>
  }
}