/// <reference types="cypress" />

describe("Amazon Test", () => {


    it("Login To Amazon", () => {
        cy.visit("https://loanpal.com/about");
        //cy.get('#nav-link-accountList').trigger('mouseover');
        cy.get('.tooltip > ._14pOp').click();
        cy.get('._3VbLo').should('be.visible');
        cy.get('#loginEmail').should('be.visible');
        cy.get('#loginEmail').type("reddymannu@gmail.com");
        cy.get('#pwd').should('exist');
        cy.get('#pwd').type("Mannu@1987");
        cy.get('._20kxA > ._2lvmw').click();
        //cy.get('#nav-link-accountList > .nav-line-1').should('have.text', "Hello, Maneesh")
        //cy.get('#nav-link-accountList > .nav-line-1').contains("Hello, Maneesh")
    })

    it("Logout Of Amazon", () => {
        //cy
    })

})