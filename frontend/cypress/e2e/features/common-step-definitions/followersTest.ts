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


  When("the user with username {string} is followed by {string}", (targetUsername: string, followerUsername: string) => {
    cy.request({
        method: 'POST',
        url: `http://127.0.0.1:8000/user/follow/${targetUsername}/${followerUsername}`,
        failOnStatusCode: false
    }).then((response) => {
        if (response.status !== 200) {
            cy.log(`Unexpected response status: ${response.status}`);
            cy.log(`Response body: ${JSON.stringify(response.body)}`);
            throw new Error('Failed to set up follow status with status code ' + response.status);
        }
    });
});

When("the user selects \"Unfollow\" for the user {string}", (username: string) => {
    cy.get(`[data-cy="followingClass-${username}"]`).find(`[data-cy="unfollow-button-${username}"]`).click();
});

When("the user {string} opens the following list", (username: string) => {
    cy.get('[data-cy="following-button"]').click(); 
    cy.get('[data-cy="following-modal"]').should('be.visible');
  });
  
When("the user selects the privacy setting to 'Private'", () => {
    cy.get('[data-cy="privacy-status"]').should('contain', 'Público');
    cy.get('button').contains('Trocar Modo').click(); 
    cy.get('[data-cy="privacy-status"]').should('contain', 'Privado');
    cy.contains('Configurações de privacidade atualizadas').should('be.visible');
});

When("the user with username {string} has sent a follow request to {string}", (requesterUsername: string, targetUsername: string) => {
    cy.log(`Follow request was done in previous steps from ${requesterUsername} to ${targetUsername}`);
  });

When("the user {string} opens the follow request list", (username: string) => {
    cy.get('[data-cy="follow-request-button"]').click(); 
    cy.get('[data-cy="follow-requests-modal"]').should('be.visible'); 
});

When("the user {string} sees the follow request from {string}", (username: string, requesterUsername: string) => {
    cy.get('[data-cy="follow-requests-modal"]').should('be.visible');
    cy.get(`[data-cy="follow-request-${requesterUsername}"]`).should('be.visible');
});