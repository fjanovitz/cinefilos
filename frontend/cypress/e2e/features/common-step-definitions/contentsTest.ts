import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Register a movie on the database

Given("the user is logged as admin", () => {
    cy.visit("/login");
    cy.get("[data-cy=email]").type("admin@gmail.com");
    cy.get("[data-cy=password]").type("Admin123");
    cy.get("[data-cy=ENTRAR]").click();
    cy.wait(50);
});

Given("the user visits the page {string}", (page: string) => {
    cy.visit(page);
    cy.wait(50)
  });
  

When(
    "the user does not visualize content registered with title {string}",
    (title: string) => {
        cy.wait(50)
        cy.get(`[data-cy="${title}"]`).should("not.exist");
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
        cy.get(`[data-cy="${field}"]`).clear().type(value);
    }
)

Then(
    "the user is in the page {string}",
    (page: string) => {
        cy.url().should("include", page);
    }
)

Then(
    "the user visualizes a content registered with title {string}", 
    (title: string) => {
        cy.get(`[data-cy="${title}"]`).should("exist");
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
        cy.get(`[data-cy="${title}"]`).click();
    }
)