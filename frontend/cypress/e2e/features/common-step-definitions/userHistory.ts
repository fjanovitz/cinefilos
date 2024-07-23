import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given(
    "there is a review for the movie with id {string}",
    (content_id: string) => {
        cy.getDataCy(content_id).should('exist');
    }
)

When(
    "the user clicks the card of the movie with id {string}",
    (content_id: string) => {
        cy.getDataCy(content_id).click();
    }
)

When(
    "the user clicks the {string} button",
    (button: string) => {
        cy.getDataCy(button).click();
    }
)

Then(
    "the user goes to the page {string}",
    (page: string) => {
        cy.wait(200);
        cy.url().should("include", page);
    }
)

Then(
    "there is no longer a review for the movie with id {string}",
    (content_id: string) => {
        cy.getDataCy(content_id).should('not.exist');
    }
)
