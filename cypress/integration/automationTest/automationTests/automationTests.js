import {Given, Then,When, And} from 'cypress-cucumber-preprocessor/steps';
import 'cypress-wait-until';
import loanpalLocators from '../../Locators/loanpalPage.json';


Given('I Launch The Loanpal Website', function() {
    cy.visit("https://loanpal.com/");
    cy.get(loanpalLocators.loanpalLogo).should('be.visible');
});

And('I Click On Menu Option', function() {
    cy.get(loanpalLocators.menuOption).should('be.visible');
    cy.get(loanpalLocators.menuOption).click();
});

And('I Select About Us Menu Item', function() {
    cy.xpath(loanpalLocators.aboutUsMenuItem).click({force: true});
    //cy.get('.leadership-intro > .row > .brandon-black').should('be.visible');
});

And('I Navigate To Alice Cathcart Profile', function() {
    cy.get(loanpalLocators.aliceCathcartImage).scrollIntoView();
    cy.get(loanpalLocators.aliceCathcartImage).should('be.visible');
});

When('I Click On Read More Option', function() {
    //cy.get(loanpalLocators.aliceCathcartDesc).should('be.visible');
    cy.get(loanpalLocators.aliceCathcartReadMore).click({force: true});
});

Then('I Should See Alice Cathcart Modal', function() {
    cy.get(loanpalLocators.aliceCathcartModal).should('be.visible');
    cy.get(loanpalLocators.aliceCathcartModal).should('have.attr', 'src', 'https://res.cloudinary.com/loanpal/image/upload/w_auto,q_auto,f_auto,dpr_auto,c_scale/v1582051733/loanpal.com/leadership/about-us/AlicePopup2.jpg');
    cy.get(loanpalLocators.aliceCathcartModal).should('have.attr', 'src').should('include','AlicePopup2.jpg');
});

When('I Click On Next Button', function() {
    cy.get(loanpalLocators.nextButtonOnModal).click({force: true});
});

Then('I Should See Brendon Merkleys Modal', function() {
    cy.get(loanpalLocators.berndonMerkleyModal).should('be.visible');
    cy.get(loanpalLocators.berndonMerkleyModal).should('have.attr', 'src', 'https://res.cloudinary.com/loanpal/image/upload/w_auto,q_auto,f_auto,dpr_auto,c_scale/v1571435514/loanpal.com/leadership/about-us/MerkleyPopup.jpg');
    cy.get(loanpalLocators.berndonMerkleyModal).should('have.attr', 'src').should('include','MerkleyPopup.jpg')
});

When('I Click On Close Button', function() {
    cy.get(loanpalLocators.closeIcon).should('be.visible');
    cy.get(loanpalLocators.closeIcon).click();
});

Then('The Modal Should Be Closed', function() {
    cy.get(loanpalLocators.berndonMerkleyModal).should('not.be.visible');
});