import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the user joins the page {string}", (page: string) => {
    cy.visit(page);
    cy.url().should('include', page);
    cy.get(`[data-cy="full_name"]`).should('be.visible');
});

Given("the user enters the page {string}", (page: string) => {
    cy.visit(page);
    cy.url().should('include', page);
    cy.get('form').should('be.visible');
});

Given("the user is logged in with email {string} and password {string}", (email: string, password: string) => {
    cy.request({
        method: 'POST',
        url: 'http://127.0.0.1:8000/users/login', 
        body: { email, password },
        failOnStatusCode: false
    }).then((response) => {
        if (response.status !== 200) {
            cy.log(`Unexpected response status: ${response.status}`);
            cy.log(`Response body: ${JSON.stringify(response.body)}`);
            throw new Error('Login failed with status code ' + response.status);
        }
        expect(response.status).to.eq(200);
    });
});

When("the user does not visualize content registered with username {string} and phone number {string}", (username: string, phoneNumber: string) => {
    cy.get(`[data-cy="user-username-${username}"]`).should("not.exist");
    cy.get(`[data-cy="user-phoneNumber-${phoneNumber}"]`).should("not.exist");
});

When("the user fills with {string} with {string}", (field: string, value: string) => {
    cy.get(`[data-cy="${field}"]`).clear().type(value);
});

When("the user press {string}", (button: string) => {
    cy.get(`[data-cy="submit-button"]`).should('be.visible').should('not.be.disabled').click({ force: true });
});

When("the user leaves the data {string} empty", (field: string) => {
    cy.get(`[data-cy="${field}"]`).clear();
});


Then("the user sees the text {string}", (text: string) => {
    cy.contains(text).should('be.visible');
});

