class LoginPage {
  visit() {
    cy.visit('/');
  }

  enterUsername(username) {
    cy.get('[data-test="username"]').clear().type(username);
  }

  enterPassword(password) {
    cy.get('[data-test="password"]').clear().type(password);
  }

  submit() {
    cy.get('[data-test="login-button"]').click();
  }

  login(username, password) {
    if (username) {
      this.enterUsername(username);
    }
    if (password) {
      this.enterPassword(password);
    }
    this.submit();
  }

  errorMessage() {
    return cy.get('[data-test="error"]');
  }
}

export default new LoginPage();
