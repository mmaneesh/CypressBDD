Feature: Loanpal test
   Loanpal Sample Automation Test

   Scenario: Loanpal Automation Exercise
        Given I Launch The Loanpal Website
        And I Click On Menu Option
        And I Select About Us Menu Item
        And I Navigate To Alice Cathcart Profile
        When I Click On Read More Option
        Then I Should See Alice Cathcart Modal
        When I Click On Next Button
        Then I Should See Brendon Merkleys Modal
        When  I Click On Close Button
        Then The Modal Should Be Closed

   