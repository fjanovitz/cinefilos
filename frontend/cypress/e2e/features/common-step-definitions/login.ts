import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está na página {string}", (page: string) => {
    cy.visit(page);
    cy.wait(200);
});

Given("existe um usuário cadastrado com o email {string} e com senha {string}", (email, senha) => {
});

When("o usuário preenche o campo de {string} com {string}", (field: string, value: string) => {
    cy.wait(200);
    cy.get(`[data-cy="${field}"]`).clear().type(value);
});

When("o usuário tenta realizar login apertando em {string}", (button) => {
    cy.wait(200);
    cy.get(`[data-cy="${button}"]`).click();
});

Then("o usuário deve ser redirecionado para a página {string}", (page) => {
    cy.wait(200);
    cy.url().should("include", page);
});

When("o usuário não preenche o campo de {string}", (field: string) => {
    cy.wait(200);
    cy.get(`[data-cy="${field}"]`).clear();
});

Then("o usuário permanece na página {string}", (page) => {
    cy.wait(200);
    cy.url().should("include", page);
});




