import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the user opens the page {string}", (page: string) => {
    cy.visit(`http://localhost:3000${page}`);
    cy.url().should('include', page);
    cy.get(`[data-cy="username"]`).should('be.visible');
});

Given("the user is logged with email {string} and password {string}", (email: string, password: string) => {
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

When("the user does not see a followed user with username {string}", (username: string) => {
    cy.get(`[data-cy="user-username-${username}"]`).should("not.exist");
});

When("the user enters the username {string} in the follow field", (username: string) => {
    cy.get(`[data-cy="follow-field"]`).clear().type(username);
});

When("the user clicks the follow button", () => {
    cy.get(`[data-cy="follow-button"]`).should('be.visible').click({ force: true });
});

Then("the user should see the success message {string}", (message: string) => {
    cy.contains(message).should('be.visible');
});

Then("the user with username {string} has a public profile", (username: string) => {
    cy.visit(`http://localhost:3000/user/get_user/${username}`);
    cy.get('[data-cy="privacy-status"]').should('contain', 'Público');
    cy.visit(`http://localhost:3000/user/get_user/Carlos33`);
});

Then("the user with username {string} has a private profile", (username: string) => {
    cy.visit(`http://localhost:3000/user/get_user/${username}`);
    cy.get('[data-cy="privacy-status"]').should('contain', 'Privado');
    cy.visit(`http://localhost:3000/user/get_user/Carlos33`);
});

When("the user opens the following modal", () => {
    cy.get(`[data-cy="following-modal"]`).should('be.visible');
    cy.get(`[data-cy="followingClass"]`).should('exist');
});
