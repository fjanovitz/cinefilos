Feature: Posts
    As um usuário comum
    I want to criar posts e interagir com outros posts
    So that eu possa compartilhar informações com outros usuários
    
    Scenario: Criar um post
        Given o usuário está na página "forum/newpost"
        When o usuário preenche o campo de "title" com "Post 1"
        And o usuário preenche o campo de "content" com "Conteúdo do post 1"
        And o usuário tenta realizar login apertando em "post"
        Then o usuário deve ser redirecionado para a página "/forum/feed"
        And o usuário deve ver o post "Post 1" na página "/forum/feed"

    Scenario: Criar um post com título vazio
        Given o usuário está na página "forum/newpost"
        When o usuário não preenche o campo de "title"
        And o usuário tenta realizar login apertando em "post"
        Then o usuário permanece na página "forum/newpost"
        And o usuário deve ver a mensagem "Não é possível publicar um post sem título"
    
    Scenario: Visualizar posts
        Given o usuário está na página "forum/feed"
        And o usuário visualiza o post com o título "Post 1"
        When o usuário clica no post com o título "Post 1"
        Then o usuário deve ser redirecionado para a página "/forum/post/0001"
        And o usuário deve visualizar o post com título "Post 1" e o autor "fjanovitz"
    
    Scenario: Ver lista de curtidas de um post
        Given o usuário está na página "/forum/post/0001"
        When o usuário clica no link "curtidas"
        Then o usuário deve ser redirecionado para a página "/forum/post/0001/likes"
        And o usuário visualiza a lista de usuários que curtiram o post "Post 1"

