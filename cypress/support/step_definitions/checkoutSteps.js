import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import testData from '../../fixtures/sauceDemo.json';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';

const cartPage = CartPage;
const checkoutPage = CheckoutPage;
const valueOf = (value) => (value === '<empty>' ? '' : value);

Given('I begin checkout', () => cartPage.checkout());

When(
  'I continue checkout with first name {string}, last name {string}, and postal code {string}',
  (firstName, lastName, postalCode) => {
    checkoutPage.fillInformation(
      valueOf(firstName),
      valueOf(lastName),
      valueOf(postalCode)
    );
    checkoutPage.continue();
  }
);

Then('I see the checkout error {string}', (message) => {
  checkoutPage.errorMessage().should('be.visible').and('have.text', message);
});

When('I cancel checkout', () => checkoutPage.cancel());

Then('the cart page is displayed', () => {
  cy.url().should('include', '/cart.html');
});

When('I enter valid checkout information', () => {
  checkoutPage.fillInformation(
    testData.checkout.firstName,
    testData.checkout.lastName,
    testData.checkout.postalCode
  );
  checkoutPage.continue();
});

When('I finish checkout', () => checkoutPage.finish());

Then('the order confirmation says {string}', (message) => {
  checkoutPage.completeHeader().should('have.text', message);
});
