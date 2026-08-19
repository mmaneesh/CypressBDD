class ProductPage {
  name() {
    return cy.get('[data-test="inventory-item-name"]');
  }

  price() {
    return cy.get('[data-test="inventory-item-price"]');
  }

  backToProducts() {
    cy.get('[data-test="back-to-products"]').click();
  }
}

export default new ProductPage();
