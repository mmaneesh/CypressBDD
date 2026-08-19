class CheckoutPage {
  fillInformation(firstName, lastName, postalCode) {
    if (firstName) {
      cy.get('[data-test="firstName"]').type(firstName);
    }
    if (lastName) {
      cy.get('[data-test="lastName"]').type(lastName);
    }
    if (postalCode) {
      cy.get('[data-test="postalCode"]').type(postalCode);
    }
  }

  continue() {
    cy.get('[data-test="continue"]').click();
  }

  cancel() {
    cy.get('[data-test="cancel"]').click();
  }

  finish() {
    cy.get('[data-test="finish"]').click();
  }

  errorMessage() {
    return cy.get('[data-test="error"]');
  }

  completeHeader() {
    return cy.get('[data-test="complete-header"]');
  }
}

export default new CheckoutPage();
