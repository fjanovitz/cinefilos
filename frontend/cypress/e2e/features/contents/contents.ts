import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: cadastrar filme corretamente 

Given("o usuário visita a página {string}", (page: string) => {
    cy.visit(page);
  });
  

When(
    "o usuário não visualiza conteúdo cadastrado com título {string}",
    (title: string) => {
        cy.wait(50)
        cy.get(`[data-cy="content-item-${title}"]`).should("not.exist");
    }
)

When(
    "o usuário seleciona {string}",
    (button: string) => {
        //cy.get(`[data-cy="${button}"]`).click();
        cy.contains(button).click();
    }
)

Then(
    "o usuário está na página {string}", 
    (page: string) => {
        cy.contains(page);
    }
)

When(
    "o usuário preenche os dados de {string} com {string}",
    (field: string, value: string) => {
        cy.get(`[data-cy="${field}"]`).type(value);
    }
)