import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Register a movie on the database

Given("the user visits the page {string}", (page: string) => {
    cy.visit(page);
  });
  

When(
    "the user does not visualize content registered with title {string}",
    (title: string) => {
        cy.wait(50)
        cy.get(`[data-cy="content-item-${title}"]`).should("not.exist");
    }
)

When(
    "the user selects {string}",
    (button: string) => {
        cy.contains(button).click();
    }
)

When(
    "the user visualizes the text {string}",
    (text: string) => {
        cy.contains(text);
    }
)

When(
    "the user fills the data {string} with {string}",
    (field: string, value: string) => {
        cy.get(`[data-cy="${field}"]`).type(value);
    }
)

Then(
    "the user visualizes a content registered with title {string}", 
    (title: string) => {
        cy.get(`[data-cy="content-item-${title}"]`).should("exist");
    }
)

// Scenario: Try to register a movie on the database with title that already exists

Then(
    "appears an message saying {string}",
    (message: string) => {
        cy.on('window:alert',(t)=>{
            //assertions
            expect(t).to.contains(message);
         })
    }
)

// Scenario: get a movie by title on the database
Then(
    "the user visualizes {string} {string}",
    (field: string, value: string) => {
        cy.get(`[data-cy="${field}"]`).contains(value);
    }
)

// Scenario: get a movie by title on the database
When(
    "the user selects the content {string}",
    (title: string) => {
        cy.get(`[data-cy="content-item-${title}"]`).click();
    }
)