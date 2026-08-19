import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import testData from '../../fixtures/sauceDemo.json';
import InventoryPage from '../../pages/InventoryPage';
import LoginPage from '../../pages/LoginPage';

const loginPage = LoginPage;
const inventoryPage = InventoryPage;
const valueOf = (value) => (value === '<empty>' ? '' : value);

Given('I open the SauceDemo login page', () => loginPage.visit());

When('I sign in as the standard user', () => {
  loginPage.login(testData.users.standard, testData.users.password);
});

When('I sign in as the locked user', () => {
  loginPage.login(testData.users.locked, testData.users.password);
});

When(
  'I sign in with username {string} and password {string}',
  (username, password) => loginPage.login(valueOf(username), valueOf(password))
);

Then('the inventory page is displayed', () => {
  cy.url().should('include', '/inventory.html');
  inventoryPage.title().should('have.text', 'Products');
});

Then('I see the login error {string}', (message) => {
  loginPage.errorMessage().should('be.visible').and('have.text', message);
});
