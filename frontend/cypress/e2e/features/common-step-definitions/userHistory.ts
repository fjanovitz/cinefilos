import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given(
    "there is a review for the movie with id {string}",
    (content_id: string) => {
        cy.getDataCy(content_id).should('exist');
    }
)

Given(
    "the user is logged in as {string}",
    (username: string) => {
        cy.visit("/login");
        cy.get("[data-cy=email]").type(`${username}@gmail.com`);
        cy.get("[data-cy=password]").type("Senha123");
        cy.get("[data-cy=ENTRAR]").click();
        cy.wait(50);
    }
)

Given(
    "the user is on its profile",
    () => {
        cy.wait(1000);
        cy.getDataCy('Username').click();
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

Then(
    "there is a post with id {string} and title {string}",
    (post_id: string, title: string) => {
        cy.getDataCy(`post-title-${post_id}`).should('exist');
        cy.getDataCy(`post-title-${post_id}`).should('have.text', title);
    }
)

Then(
    "the user is now on the {string} tab",
    (profileTab: string) => {
        cy.getDataCy(profileTab).should('exist');
    }
)
