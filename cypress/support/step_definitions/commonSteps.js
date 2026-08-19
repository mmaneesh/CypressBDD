import { Given } from '@badeball/cypress-cucumber-preprocessor';
import testData from '../../fixtures/sauceDemo.json';
import LoginPage from '../../pages/LoginPage';

const loginPage = LoginPage;

Given('I am logged in as the standard user', () => {
  loginPage.visit();
  loginPage.login(testData.users.standard, testData.users.password);
});
