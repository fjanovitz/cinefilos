import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Then("o usuário deve ver a mensagem {string}", (message: string) => {
    cy.wait(200);
    cy.contains(message).should('be.visible');
});

Then("o usuário deve ver o post {string} na página {string}", (postTitle: string, page: string) => {
    cy.visit(page);
    cy.contains(postTitle).should('be.visible');
});