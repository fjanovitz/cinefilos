import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import api from '../../../../src/services/api';

const postContent = async (username: string, category: string, content_id: string, content_type: string) => {
    const params = {
        username, 
        category,
        content_id,
        content_type
    }
    const response = await api.post(`/watch_list/user/`, {}, {params});
}

Given(
    "the user is on the page {string}",
    (page: string) => {
        cy.wait(200);
        cy.visit(page);
    }
);

Given(
    "the user is on the {string} tab",
    (profileTab: string) => {
        cy.wait(1000);
        cy.getDataCy(profileTab).click();
    }
)

Given(
    "the movie with id {string}, type {string} is on the user {string} list of the user {string}",
    (content_id: string, content_type: string, category: string, username: string) => {
        // postContent(username, category, content_id, content_type);
        console.log('content on the db');
    }
)

Given(
    "the user is not logged in",
    () => {
        console.log('n logado')
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

When(
    "the user hovers the movie with id {string}",
    (content_id: string) => {
        cy.getDataCy(content_id).trigger('mouseover');
    }
)

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

Then(
    "the {string} button is not on the card",
    (option_button: string) => {
        cy.getDataCy(option_button).should('not.exist');
    }
)
