Feature: histórico de reviews e posts
As a um usuário
I want to ver as postagens e reviews minhas ou de outros usuários
So that eu possa acompanhar o que os outros postam

Scenario ver informações de review de filme
Given o usuário está na página "Histórico de reviews e posts" do usuário "einstein"
And o usuário "einstein" fez a review do filme “Duna”
When você "Seleciona" a review do filme "Duna" feita pelo usuário “einstein”
Then o usuário está na tela “Exibição de review“
And o usuário vê a review do filme “Duna” feita pelo usuário “einstein”

Scenario ver informações de review de série
Given o usuário está na página "Histórico de reviews e posts" do usuário "einstein"
And o usuário "einstein" fez uma review da série "The Office"
And o usuário consegue ver a review da série "The Office" listada no histórico
When você "Seleciona" a review da série "The Office" feita pelo usuário “einstein”
Then o usuário está na tela “Exibição de review“
And o usuário vê a review da série "The Office" feita pelo usuário “einstein”

Scenario ir para a página de post
Given o usuário está na página "Histórico de reviews e posts" do usuário "einstein"
And o usuário "einstein" fez uma postagem com título “Essa cena foi boa“ e texto “texto básico“
And o usuário consegue ver o título “Essa cena foi boa” listado no histórico
When você "Seleciona" a postagem com título "Essa cena foi boa"
Then o usuário está na página "Página de Post"
And o usuário consegue ver o título “Essa cena foi boa“ título “Essa cena foi boa“
And o usuário consegue ver o texto “texto básico“
