Feature: Curtir posts no fórum
As a usuário comum
I want to curtir posts de outros usuários
So that eu possa mostrar interesse em posts de outros usuários

Scenario: Curtir um post no Feed
Given: Eu estou logado como um usuário comum "Einstein"
And: Eu estou na tela "Feed"
And: O usuário "Tesla" publicou um post com "Título""Post2"
And: Eu visualizo o post "Post2"
And: O campo "Curtir" não está selecionado
When: Eu seleciono a opção "Curtir"
Then: O campo "Curtidas" aumenta em uma unidade
And: O campo "Curtir" muda de cor

Scenario: Remover curtida de um post no Feed
Given: Eu estou logado como um usuário comum "Einstein"
And: Eu estou na tela "Feed"
And: O usuário "Tesla" publicou um post com "Título""Post2"
And: Eu visualizo o post "Post2"
And: O campo "Curtir" está selecionado
When: Eu seleciono a opção "Curtir"
Then: O campo "Curtidas" diminui em uma unidade
And: O campo "Curtir" muda de cor

Scenario: Curtir um post aberto
Given: Eu estou logado como um usuário comum "Einstein"
And: O usuário "Tesla" publicou um post com "Título""Post2"
And: Eu estou na tela "Post" do post com "Título""Post2"
And: O campo "Curtir" não está selecionado
When: Eu seleciono a opção "Curtir"
Then: O campo "Curtidas" aumenta em uma unidade
And: O campo "Curtir" muda de cor

Scenario: Remover curtida de um post aberto
Given: Eu estou logado como um usuário comum "Einstein"
And: O usuário "Tesla" publicou um post com "Título""Post2"
And: Eu estou na tela "Post" do post com "Título""Post2"
And: O campo "Curtir" está selecionado
When: Eu seleciono a opção "Curtir"
Then: O campo "Curtidas" diminui em uma unidade
And: O campo "Curtir" muda de cor

Scenario: Ver lista de usuários que curtiram um post
Given: Eu estou logado como um usuário comum "Einstein"
And: O usuário "Tesla" publicou um post com "Título""Post2"
And: Eu estou na tela "Post" do post "Post2"
When: Eu seleciono a opção "Curtidas"
Then: Eu sou redirecionado para a tela "Curtidas" do post "Post2"
And: Adicionando essa linha pra o roteiro