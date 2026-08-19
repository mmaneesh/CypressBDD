class InventoryPage {
  title() {
    return cy.get('[data-test="title"]');
  }

  items() {
    return cy.get('[data-test="inventory-item"]');
  }

  productNames() {
    return cy.get('[data-test="inventory-item-name"]');
  }

  productPrices() {
    return cy.get('[data-test="inventory-item-price"]');
  }

  productLink(productName) {
    return cy.contains('[data-test="inventory-item-name"]', productName);
  }

  openProduct(productName) {
    this.productLink(productName).click();
  }

  sortBy(value) {
    cy.get('[data-test="product-sort-container"]').select(value);
  }

  addProduct(productId) {
    cy.get(`[data-test="add-to-cart-${productId}"]`).click();
  }

  removeProduct(productId) {
    cy.get(`[data-test="remove-${productId}"]`).click();
  }

  cartBadge() {
    return cy.get('[data-test="shopping-cart-badge"]');
  }

  openCart() {
    cy.get('[data-test="shopping-cart-link"]').click();
  }
}

export default new InventoryPage();
