import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("o usuário escolhe {string}", (button) => {
    cy.wait(200);
    cy.get(`[data-cy="${button}"]`).click();
});

Then("a mensagem {string} é exibida na tela", (message: string) => {
    cy.wait(200);
    cy.contains(message).should("be.visible");
});

Given("existe um usuário cadastrado com o email {string} e com token {string}", (email, recovery_token) => {
});

When("o usuário preenche o campo de {string} com {string}, {string} e nova senha {string}", (fieldEmail: string, email: string, recovery_token: string, novaSenha: string) => {
    cy.wait(200);
    cy.get(`[data-cy="${fieldEmail}"]`).clear().type(email);
    cy.get(`[data-cy="recovery_token"]`).clear().type(recovery_token);
    cy.get(`[data-cy="nova-senha"]`).clear().type(novaSenha);
});


