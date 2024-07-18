Feature: cadastro de conteúdo
    As a um usuário
    I want to gerenciar os conteúdos 
    So that eu possa cadastrar um novo conteúdo

Scenario: cadastrar filme corretamente 
    Given o usuário visita a página "contents/movies"
    And o usuário não visualiza conteúdo cadastrado com título "A Múmia"
    When o usuário seleciona "Adicione um conteúdo"
    Then o usuário está na página "Criar conteúdo"
    When o usuário preenche os dados de "Título" com "A Múmia"
    And o usuário preenche os dados de "Sinopse" com "A Múmia é um filme de ação"
    And o usuário seleciona "Confirmar"

