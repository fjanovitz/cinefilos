import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Then("o usuário deve ver a mensagem {string}", (message: string) => {
    cy.wait(200);
    cy.contains(message).should('be.visible');
});

Then("o usuário deve ver o post {string} na página {string}", (postTitle: string, page: string) => {
    cy.visit(page);
    cy.contains(postTitle).should('be.visible');
});

When("o usuário clica no post com o título {string}", (postTitle: string) => {
    cy.contains(postTitle).click();
});

Then("o usuário visualiza o post com o título {string}", (postTitle: string) => {
    cy.contains(postTitle).should('be.visible');
});

Then("o usuário deve visualizar o post com título {string} e o autor {string}", (postTitle: string, author: string) => {
    cy.contains(postTitle).should('be.visible');
    cy.contains(author).should('be.visible');
});

When("o usuário clica no botão {string}", (button: string) => {
    cy.contains(button).click();
});

/*
    Scenario: Curtir um post
        Given o usuário está na página "/forum/post/0001"
        And o usuário não curtiu o post "Post 1"
        When o usuário clica no botão "curtir" do post com o título "Post 1"
        Then o usuário visualiza o botão "curtir" do post com o título "Post 1" com a cor alterada
        And o usuário visualiza o post "Post 1" com a quantidade de curtidas incrementada em 1
        And o usuário curtiu o post "Post 1"
    
    Scenario: Remover curtida um post
        Given o usuário está na página "/forum/post/0001"
        And o usuário curtiu o post com o título "Post 1"
        When o usuário clica no botão "like" do post "Post 1"
        Then o usuário visualiza o botão "like" do post "Post 1" com a cor alterada
        And o usuário visualiza o post "Post 1" com a quantidade de curtidas diminuída em 1
        And o usuário curtiu o post "Post 1"
    
    Scenario: Ver lista de curtidas de um post
        Given o usuário está na página "/forum/post/0001"
        When o usuário clica no botão "likes" do post "Post 1"
        Then o usuário é redirecionado para a página "/forum/post/0001/likes"
        And o usuário visualiza a lista de usuários que curtiram o post "Post 1"
*/

Given("o usuário não curtiu o post com o título {string}", (postTitle: string) => {
    cy.visit("/forum/post/0001");
    cy.contains(postTitle).should('be.visible');
});

Then("o usuário visualiza o botão {string} do post com o título {string} com a cor alterada", (button: string, postTitle: string) => {
    cy.contains(postTitle).should('be.visible');
    cy.contains(button).should('have.css', 'color', 'rgb(255, 0, 0)');
});

