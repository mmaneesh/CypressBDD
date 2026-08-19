Feature: SauceDemo inventory

  Background:
    Given I am logged in as the standard user

  Scenario: The complete product catalog is displayed
    Then I see 6 inventory products

  Scenario: A shopper can open a product detail page
    When I open the "Sauce Labs Backpack" product
    Then the product detail shows "Sauce Labs Backpack" priced "$29.99"

  Scenario Outline: Products can be sorted
    When I sort products by "<sort>"
    Then the first product is "<first>"
    And the last product is "<last>"

    Examples:
      | sort  | first                                      | last                                       |
      | az    | Sauce Labs Backpack                        | Test.allTheThings() T-Shirt (Red)           |
      | za    | Test.allTheThings() T-Shirt (Red)          | Sauce Labs Backpack                         |
      | lohi  | Sauce Labs Onesie                          | Sauce Labs Fleece Jacket                    |
      | hilo  | Sauce Labs Fleece Jacket                   | Sauce Labs Onesie                           |
