class CartPage {
  items() {
    return cy.get('[data-test="inventory-item"]');
  }

  item(productName) {
    return cy.contains('[data-test="inventory-item"]', productName);
  }

  itemName(productName) {
    return this.item(productName).find('[data-test="inventory-item-name"]');
  }

  itemPrice(productName) {
    return this.item(productName).find('[data-test="inventory-item-price"]');
  }

  itemQuantity(productName) {
    return this.item(productName).find('[data-test="item-quantity"]');
  }

  removeProduct(productId) {
    cy.get(`[data-test="remove-${productId}"]`).click();
  }

  checkout() {
    cy.get('[data-test="checkout"]').click();
  }
}

export default new CartPage();
