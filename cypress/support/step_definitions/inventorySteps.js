import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import InventoryPage from '../../pages/InventoryPage';
import ProductPage from '../../pages/ProductPage';

const inventoryPage = InventoryPage;
const productPage = ProductPage;

Then('I see {int} inventory products', (count) => {
  inventoryPage.items().should('have.length', count);
});

When('I open the {string} product', (name) => inventoryPage.openProduct(name));

Then('the product detail shows {string} priced {string}', (name, price) => {
  productPage.name().should('have.text', name);
  productPage.price().should('have.text', price);
});

When('I sort products by {string}', (sort) => inventoryPage.sortBy(sort));

Then('the first product is {string}', (name) => {
  inventoryPage.productNames().first().should('have.text', name);
});

Then('the last product is {string}', (name) => {
  inventoryPage.productNames().last().should('have.text', name);
});
