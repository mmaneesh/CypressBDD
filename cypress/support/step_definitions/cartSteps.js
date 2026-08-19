import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import testData from '../../fixtures/sauceDemo.json';
import CartPage from '../../pages/CartPage';
import InventoryPage from '../../pages/InventoryPage';

const inventoryPage = InventoryPage;
const cartPage = CartPage;
const productId = (name) => {
  const product = Object.values(testData.products).find(
    (item) => item.name === name
  );
  if (!product) {
    throw new Error(`Missing product test data for ${name}`);
  }
  return product.id;
};

When('I add {string} to the cart', (name) =>
  inventoryPage.addProduct(productId(name))
);

When('I add these products to the cart:', (table) => {
  table
    .raw()
    .flat()
    .forEach((name) => inventoryPage.addProduct(productId(name)));
});

Then('the cart badge shows {int} item(s)', (count) => {
  inventoryPage.cartBadge().should('have.text', String(count));
});

When('I remove {string} from the inventory', (name) => {
  inventoryPage.removeProduct(productId(name));
});

Then('the cart badge is not displayed', () => {
  inventoryPage.cartBadge().should('not.exist');
});

When('I open the cart', () => inventoryPage.openCart());

Then('the cart contains {string}', (name) => {
  cartPage.item(name).should('be.visible');
});

Then(
  '{string} has quantity {int} and price {string}',
  (name, quantity, price) => {
    cartPage.itemQuantity(name).should('have.text', String(quantity));
    cartPage.itemPrice(name).should('have.text', price);
  }
);
