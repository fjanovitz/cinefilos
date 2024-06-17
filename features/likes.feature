Feature: Curtir posts no fórum
As a usuário comum
I want to curtir posts de outros usuários
So that eu possa mostrar interesse em posts de outros usuários

Scenario: Curtir um post
Given Eu estou logado como um usuário comum "Einstein"
And O usuário "Tesla" publicou um post com "Título""Post2"
And Eu estou na tela "Post" do post com "Título""Post2"
And O campo "Curtir" não está selecionado
When Eu seleciono a opção "Curtir"
Then O campo "Curtidas" aumenta em uma unidade
And O campo "Curtir" muda de cor

Scenario: Remover curtida de um post
Given Eu estou logado como um usuário comum "Einstein"
And O usuário "Tesla" publicou um post com "Título""Post2"
And Eu estou na tela "Post" do post com "Título""Post2"
And O campo "Curtir" está selecionado
When Eu seleciono a opção "Curtir"
Then O campo "Curtidas" diminui em uma unidade
And O campo "Curtir" muda de cor

Scenario: Ver lista de usuários que curtiram um post
Given Eu estou logado como um usuário comum "Einstein"
And O usuário "Tesla" publicou um post com "Título""Post2"
And Eu estou na tela "Post" do post "Post2"
When Eu seleciono a opção "Curtidas"
Then Eu sou redirecionado para a tela "Curtidas" do post "Post2"

Scenario: Armazenar curtida no sistema
Given O usuário comum "Einstein" está cadastrado no sistema
And O usuário comum "Tesla" está cadastrado no sistema
And O usuário "Tesla" possui um post com "ID""0002"
When O usuário "Einstein" seleciona a opção "Curtir" no post com "ID""0002"
Then O sistema aumenta o valor "Curtidas" em "1"
And O sistema adiciona o usuário "Einstein" à lista "Usuários que Curtiram" do post com "ID""0002".

Scenario: Remover curtida do sistema
Given O usuário comum "Einstein" está cadastrado no sistema
And O usuário comum "Tesla" está cadastrado no sistema
And O usuário "Tesla" possui um post com "ID""0002"
And O post com "ID""0002" está na lista "Curtidos" do usuário "Einstein"
When O usuário "Einstein" seleciona a opção "Curtir" no post com "ID""0002"
Then O sistema diminui o valor "Curtidas" em "1"
And O sistema remove o usuário "Einstein" à lista "Usuários que Curtiram" do post com "ID""0002".