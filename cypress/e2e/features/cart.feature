Feature: SauceDemo shopping cart

  Background:
    Given I am logged in as the standard user

  Scenario: A shopper adds one product to the cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge shows 1 item

  Scenario: A shopper adds multiple products from a data table
    When I add these products to the cart:
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    Then the cart badge shows 2 items
    When I open the cart
    Then the cart contains "Sauce Labs Backpack"
    And the cart contains "Sauce Labs Bike Light"

  Scenario: A shopper removes a product
    Given I add "Sauce Labs Backpack" to the cart
    When I remove "Sauce Labs Backpack" from the inventory
    Then the cart badge is not displayed

  Scenario: Cart product details are accurate
    Given I add "Sauce Labs Backpack" to the cart
    When I open the cart
    Then "Sauce Labs Backpack" has quantity 1 and price "$29.99"
