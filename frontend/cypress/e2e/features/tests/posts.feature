Feature: Posts
    As um usuário comum
    I want to criar posts e interagir com outros posts
    So that eu possa compartilhar informações com outros usuários
    
    Scenario: Criar um post
        Given o usuário está na página "forum/newpost"
        When o usuário preenche o campo de "title" com "Post 1"
        And o usuário preenche o campo de "content" com "Conteúdo do post 1"
        And o usuário tenta realizar login apertando em "post"
        Then o usuário deve ser redirecionado para a página "forum/feed"
        And o usuário deve ver o post "Post 1" na página "forum/feed"

    Scenario: Criar um post com título vazio
        Given o usuário está na página "forum/newpost"
        When o usuário não preenche o campo de "title"
        And o usuário tenta realizar login apertando em "podt"
        Then o usuário permanece na página "forum/newpost"
        And o usuário deve ver a mensagem "Não é possível publicar um post sem título"
    
    Scenario: Visualizar posts
        Given o usuário está na página "feed"
        And o usuário visualiza o post com o título "Post 1"
        When o usuário clica no post com o título "Post 1"
        Then o usuário deve ser redirecionado para a página "post/0001"
        And o usuário deve visualizar as informações do post "Post 1"

    Scenario: Deletar um post com sucesso
        Given o usuário está na página "post/0001"
        And o usuário visualiza o post "Post 1"
        When o usuário clica no botão "delete" do post "Post 1"
        Then o usuário deve ver a mensagem "Post deletado com sucesso!"
        And o usuário está na página "feed"
        And o usuário não visualiza o post "Post 1"
    
    Scenario: Tentar deletar um post sem ser o autor
        Given o usuário está na página "post/0001"
        And o usuário não é o autor do post "Post 1"
        When o usuário clica no botão "delete" do post "Post 1" sem ser o autor
        Then o usuário deve ver a mensagem "O post só pode ser excluído pelo autor"
        And o usuário está na página "feed"
        And o usuário visualiza o post "Post 1"

    Scenario: Curtir um post
        Given o usuário está na página "post/0001"
        And o usuário não curtiu o post "Post 1"
        When o usuário clica no botão "like" do post "Post 1"
        Then o usuário visualiza o botão "like" do post "Post 1" com a cor alterada
        And o usuário visualiza o post "Post 1" com a quantidade de curtidas incrementada em 1
        And o usuário curtiu o post "Post 1"
    
    Scenario: Remover curtida um post
        Given o usuário está na página "post/0001"
        And o usuário curtiu o post "Post 1"
        When o usuário clica no botão "like" do post "Post 1"
        Then o usuário visualiza o botão "like" do post "Post 1" com a cor alterada
        And o usuário visualiza o post "Post 1" com a quantidade de curtidas diminuída em 1
        And o usuário curtiu o post "Post 1"
    
    Scenario: Ver lista de curtidas de um post
        Given o usuário está na página "post/0001"
        When o usuário clica no botão "likes" do post "Post 1"
        Then o usuário é redirecionado para a página "post/0001/likes"
        And o usuário visualiza a lista de usuários que curtiram o post "Post 1"

