Feature: Criar posts no fórum
As a Usuário comum
I want to poder criar e visualizar posts no fórum
So that eu posso interagir com outros usuários

Scenario: Criação de post bem sucedida
Given Eu estou logado como um usuário comum "Einstein"
And Eu estou na tela "Feed"
When Eu seleciono a opção "Novo Post"
And Eu preencho o campo "Título" com "Post1"
And Eu preencho o campo "Texto" com "Esse é um post básico"
And Eu seleciono a opção "Postar"
Then Eu retorno para a tela "Feed"
And Eu posso ver meu post "Post1" na tela
And Eu posso ver o texto "Esse é um post básico" no post "Post1"
And Eu posso ver o apelido "Einstein" no post "Post1"
And Eu posso ver a foto "einstein.jpg" no post "Post1"

Scenario: Criação de post sem título
Given Eu estou logado como um usuário comum "Einstein"
And Eu estou na tela "Feed"
When Eu seleciono a opção "Novo Post"
And Eu preencho o campo "Texto" com "Esse é um post básico"
And Eu seleciono a opção "Postar"
Then Eu recebo uma mensagem de erro na tela
And Eu retorno para a tela "Novo Post"

Scenario: Criação de post vazio
Given Eu estou logado como um usuário comum "Einstein"
And Eu estou na tela "Feed"
When Eu seleciono a opção "Novo Post"
And Eu seleciono a opção "Postar"
Then Eu recebo uma mensagem de erro na tela
And Eu continuo na tela "Novo Post"

Scenario: Remoção de um post
Given Eu estou logado como um usuário comum "Einstein"
And Eu estou na tela "Posts" do "Perfil" "Einstein"
And Eu publiquei um post com "Título""Post1"
When Eu seleciono a opção "Excluir Post"
Then Eu recebo uma mensagem de confirmação da remoção
And O post não está mais visível no Feed

Scenario: Abertura de um Post
Given Eu estou logado como um usuário comum "Einstein"
And Eu estou na tela "Feed"
And O usuário "Tesla" publicou um post com "Título""Post2"
When Eu seleciono o post "Post2"
Then Eu sou redirecionado para a tela "Post"
And Eu visualizo o post "Post2"

Scenario: Adição de post no sistema
Given O usuário comum "Einstein" está cadastrado no sistema
When O usuário "Einstein" cria um post
And O post possui "Título""Post1"
And O post possui "Texto""Este é um post básico"
Then O post "Post1" é armazenado no sistema
And O post "Post1" possui "ID""0001"

Scenario: Tentativa de adição de post sem título ao sistema
Given O usuário comum "Einstein" está cadastrado no sistema
When O usuário "Einstein" cria um novo post
And O post possui "Texto""Este é um post básico"
Then O sistema retorna uma mensagem de erro
And O sistema permanece inalterado

Scenario: Tentativa de adição de post sem conteúdo ao sistema
Given O usuário comum "Einstein" está cadastrado no sistema
When O usuário "Einstein" cria um novo post
And O post possui "Título""Post1"
Then O sistema retorna uma mensagem de erro
And O sistema permanece inalterado

Scenario: Remoção de post do sistema
Given O usuário comum "Einstein" está cadastrado no sistema
And O usuário "Einstein" possui um post com "ID""0001"
When O usuário "Einstein" exclui o post
Then O sistema remove o post com "ID""0001"