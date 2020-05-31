before(function() {
    //runs for each feature file
    //cy.recordHar();
    cy.clearCookies();
    cy.log('Start of test');
});

beforeEach(function() {
    //runs before each scenario
    cy.viewport(1286, 786);
    cy.log('Start of scenario');
    cy.window().then(win => {
        win.sessionStorage.clear();
    });
});

afterEach(function() {
    //runs after each scenario
    cy.log('End of scenario');
});

after(function() {
    //runs at the end of each feature file
    //cy.saveHar();
    cy.clearCookies();
    cy.log('End of test');
});
