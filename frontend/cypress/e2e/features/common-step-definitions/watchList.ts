import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given(
    "the user is on the page {string}",
    (page: string) => {
      cy.visit(page);
    }
);

Given(
    "the user is on the {string} tab",
    (profileTab: string) => {
        cy.getDataCy(profileTab).click();
    }
)

When(
    "the user clicks the {string} button for the movie with id {string}",
    (button: string, content_id: string) => {
        cy.getDataCy(content_id).trigger('mouseover');
        cy.getDataCy(button).click();
});

When(
    "the user clicks the {string} option",
    (option_button: string) => {
        cy.getDataCy(option_button).click();
});

Then(
    "the movie with id {string} is not on the page",
    (content_id: string) => {
        cy.getDataCy(content_id).should('not.exist');
    }
);

When(
    "the user goes to the {string} category tab",
    (category: string) => {
        cy.getDataCy(category).children().click();
    }
)

Then(
    "the movie with id {string} is on the page",
    (content_id: string) => {
        cy.getDataCy(content_id).should('exist');
    }
);

Then(
    "the user is on the {string} category tab",
    (category: string) => {
        cy.getDataCy(category).children().should('be.disabled');
    }
)
