Feature: SauceDemo checkout

  Background:
    Given I am logged in as the standard user
    And I add "Sauce Labs Backpack" to the cart
    And I open the cart
    And I begin checkout

  Scenario Outline: Checkout information is required
    When I continue checkout with first name "<firstName>", last name "<lastName>", and postal code "<postalCode>"
    Then I see the checkout error "<message>"

    Examples:
      | firstName | lastName | postalCode | message                            |
      | <empty>   | Shopper  | 60601      | Error: First Name is required      |
      | Test      | <empty>  | 60601      | Error: Last Name is required       |
      | Test      | Shopper  | <empty>    | Error: Postal Code is required     |

  Scenario: A shopper can cancel checkout
    When I cancel checkout
    Then the cart page is displayed

  Scenario: A shopper completes checkout successfully
    When I enter valid checkout information
    And I finish checkout
    Then the order confirmation says "Thank you for your order!"
