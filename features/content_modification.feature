Feature: remoção e edição de conteúdo
As a um usuário
I want to gerenciar os conteúdos 
So that eu possa remover ou editar um novo conteúdo

Scenario: editar filme corretamente 
    Given o usuário administrador "tiago" está na página "conteúdos"
    And o usuário visualiza conteúdo cadastrado com título "Gato de Botas" na aba "filmes"
    When o usuário seleciona "Editar" no conteúdo "Gato de Botas"
    And edita os dados de "título" com "Divertidamente"
    And o usuário seleciona "confirmar"
    Then aparece uma mensagem de sucesso
    And o usuário está na página "conteúdos"
    And  o usuário visualiza conteúdo cadastrado com título "Divertidamente" na aba "filmes"

Scenario: editar série corretamente 
    Given o usuário administrador "tiago" está na página "conteúdos"
    And o usuário visualiza conteúdo cadastrado com título "Gato de Botas" na aba "séries"
    When o usuário seleciona "Editar" no conteúdo "Gato de Botas"
    And edita os dados de "título" com "Divertidamente"
    And o usuário seleciona "confirmar"
    Then aparece uma mensagem de sucesso
    And o usuário está na página "conteúdos"
    And  o usuário visualiza conteúdo cadastrado com título "Divertidamente" na aba "séries"

Scenario: editar o título de filme para um título já existente
    Given o usuário administrador "tiago" está na página "conteúdos"
    And o usuário administrador visualiza conteúdo cadastrado com título "Jurassic Park" na aba "filmes"
    And o usuário administrador visualiza conteúdo cadastrado com título "Gato de Botas" na aba "filmes"
    When o usuário seleciona "Editar" no conteúdo "Gato de Botas"
    And modifica os dados de "título" com "Jurassic Park"
    And o usuário seleciona "confirmar"
    Then aparece uma mensagem de erro 
    And o usuário está na página “conteúdos”
    And o usuário administrador visualiza conteúdo cadastrado com título "Jurassic Park" na aba “filmes”
    And o usuário administrador visualiza conteúdo cadastrado com título "Gato de Botas" na aba “filmes”
    And o usuário administrador não visualiza outro conteúdo cadastrado com "Jurrassic Park" na aba "filmes"
    And o usuário está na página "conteúdos"
    And o usuário administrador visualiza conteúdo cadastrado com título "Jurassic Park" na aba "filmes"
    And o usuário administrador visualiza conteúdo cadastrado com título "Gato de Botas" na aba "filmes"

Scenario: editar o título de série para um título já existente
    Given o usuário administrador "tiago" está na página "conteúdos"
    And o usuário administrador visualiza conteúdo cadastrado com título "Jurassic Park" na aba "séries"
    And o usuário administrador visualiza conteúdo cadastrado com título "Gato de Botas" na aba "séries"
    When o usuário seleciona "Editar" no conteúdo "Gato de Botas"
    And modifica os dados de "título" com "Jurassic Park"
    And o usuário seleciona "confirmar"
    Then aparece uma mensagem de erro 
    And o usuário está na página "conteúdos"
    And o usuário administrador visualiza conteúdo cadastrado com título "Jurassic Park" na aba "séries"
    And o usuário administrador visualiza conteúdo cadastrado com título "Gato de Botas" na aba "séries"

Scenario: editar o ano de série corretamente
    Given o usuário administrador "tiago" está na página "conteúdos"
    And o usuário administrador visualiza conteúdo cadastrado com título "Jurassic Park" e "ano" com dado "2042" na aba "séries"
    When o usuário seleciona "Editar" no conteúdo "Jurassic Park"
    And modifica os dados de "ano" com "2024"
    And o usuário seleciona "confirmar"
    Then aparece uma mensagem de sucesso
    And o usuário está na página "conteúdos"
    And o usuário administrador visualiza conteúdo cadastrado com título "Jurassic Park" e "ano" com dado "2024" na aba "séries"
