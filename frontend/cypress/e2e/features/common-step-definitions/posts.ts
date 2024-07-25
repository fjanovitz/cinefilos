import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Then("o usuário deve ver a mensagem {string}", (message: string) => {
    cy.wait(200);
    cy.contains(message).should('be.visible');
});

Then("o usuário deve ver o post {string} na página {string}", (postTitle: string, page: string) => {
    cy.visit(page);
    cy.contains(postTitle).should('be.visible');
});

When("o usuário clica no post com o título {string}", (postTitle: string) => {
    cy.contains(postTitle).click();
});

Then("o usuário visualiza o post com o título {string}", (postTitle: string) => {
    cy.contains(postTitle).should('be.visible');
});

Then("o usuário deve visualizar o post com título {string} e o autor {string}", (postTitle: string, author: string) => {
    cy.contains(postTitle).should('be.visible');
    cy.contains(author).should('be.visible');
});

Given("o usuário não curtiu o post com o título {string}", (postTitle: string) => {
    cy.visit("/forum/post/0001");
    cy.contains(postTitle).should('be.visible');
});

Then("o usuário visualiza o botão {string} do post com o título {string} com a cor alterada", (button: string, postTitle: string) => {
    cy.contains(postTitle).should('be.visible');
    cy.contains(button).should('have.css', 'color', 'rgb(255, 0, 0)');
});

When("o usuário clica no link {string}", (test: string) => {
    cy.getDataCy(`test-item-${test}`).click();
  });