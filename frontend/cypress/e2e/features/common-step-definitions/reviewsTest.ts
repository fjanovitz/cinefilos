import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Register a review 

Given("the user {string} visits the page {string}", 
    (user: string, page: string) => {
        cy.visit(page);
        cy.wait(200)
    }
)

When(
    "the user {string} does not visualize a review registered with username {string}",
    (user: string, username: string) => {
        cy.wait(200)
        cy.get(`[data-cy="review-item-${username}"]`).should("not.exist");
    }
)
  
When(
    "the user {string} selects {string}",
    (user: string, button: string) => {
        cy.wait(200)
        cy.get(`[data-cy="${button}"]`).should('be.visible').click();
    }
)

When(
    "the user {string} visualizes the text {string}",
    (user: string, text: string) => {
        cy.wait(200)
        cy.contains(text);
    }
)

When(
    "the user {string} fills the data {string} with {string}",
    (user: string, field: string, value: string) => {
        cy.wait(200)
        cy.get(`[data-cy="${field}"]`).clear().type(value);
    }
)

When(
    "the user {string} selects the data {string} for field {string}",
    (user: string, value: number, field: string) => {
        cy.wait(200)
        cy.get(`[data-cy="${field}"]`).should('be.visible').select(value.toString());
    }
)

Then(
    "the user {string} is in the page {string}",
    (user: string, page: string) => {
        cy.wait(200)
        cy.url().should("include", page);
    }
)

Then(
    "the user {string} visualizes a review registered with username {string}", 
    (user: string, username: string) => {
        cy.wait(200)
        cy.get(`[data-cy="review-item-${username}"]`).should("exist");
    }
)

// Scenario: Try to register a review to a content that was already reviewed by the user

Then(
    "appears a message saying {string}",
    (message: string) => {
        cy.on('window:alert',(t)=>{
            expect(t).to.contains(message);
        })
    }
)

// Scenario: Update review information

Then(
    "the user {string} visualizes a review registered for the content_type {string} and content_id {string}",
    (username: string, content_type: string, content_id: string) => {
        cy.wait(200)
        cy.get(`[data-cy="review-title-${username}-${content_type}-${content_id}"]`).should("exist");
    }
)

Then(
    "the user {string} visualizes {string} {string}",
    (user: string, field: string, value: string) => {
        cy.wait(200)
        cy.get(`[data-cy="${field}"]`).contains(value);
    }
)

// Scenario: Delete a review 

Then(
    "the user {string} does not visualize a review registered for the content_type {string} and content_id {string}",
    (username: string, content_type: string, content_id: string) => {
        cy.wait(200)
        cy.get(`[data-cy="review-title-${username}-${content_type}-${content_id}"]`).should("not.exist");
    }
)

Given(
    "the user is logged as {string}",
    (user: string) => {
        cy.wait(200)
        cy.visit("/login");
        cy.get("[data-cy=email]").type("emn2@cin.ufpe.br");
        cy.get("[data-cy=password]").type("Edson123");
        cy.get("[data-cy=ENTRAR]").click();
        cy.wait(200);
    }
)
