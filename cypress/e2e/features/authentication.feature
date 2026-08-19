Feature: SauceDemo authentication

  Scenario: A standard user signs in successfully
    Given I open the SauceDemo login page
    When I sign in as the standard user
    Then the inventory page is displayed

  Scenario: A locked user cannot sign in
    Given I open the SauceDemo login page
    When I sign in as the locked user
    Then I see the login error "Epic sadface: Sorry, this user has been locked out."

  Scenario Outline: Invalid credentials are rejected
    Given I open the SauceDemo login page
    When I sign in with username "<username>" and password "<password>"
    Then I see the login error "<message>"

    Examples:
      | username      | password         | message                                                                   |
      | <empty>       | secret_sauce     | Epic sadface: Username is required                                         |
      | standard_user | <empty>          | Epic sadface: Password is required                                         |
      | invalid_user  | invalid_password | Epic sadface: Username and password do not match any user in this service |
