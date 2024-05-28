Feature: lista de assistidos, quero assistir e abandonados
As a um usuário
I want to definir quais séries e filmes eu vi, estou vendo ou abandonei
So that outros usuários possam ver o que eu assisto, e eu possa ver o de outros usuários

Scenario: remover categoria de filme
    Given o usuário está na página "Listas" do próprio perfil
    And visualizando a lista "Lista de assistidos"
    And o filme "Duna" está na categoria "Assistido"
    When você escolhe a opção "Remover categoria" para a categoria "Assistido" do filme "Duna"
    Then o usuário ainda está na página "Listas"
    And o filme "Duna" não está mais na lista "Lista de assistidos"

Scenario: remover categoria da série
    Given o usuário está na página "Listas" do próprio perfil
    And visualizando a lista "Lista de assistidos"
    And a série "The Office" está na categoria "Assistido"
    When você escolhe a opção "Remover categoria" para a categoria "Assistido" da série "The Office"
    Then o usuário ainda está na página "Listas"
    And a série "The Office" não está mais na lista "Lista de assistidos"

Scenario: mudar categoria de filme já listado
    Given o usuário está na página "Listas" do próprio perfil
    And visualizando a lista "Lista de quero assistir"
    And o filme "Duna" está na categoria "Quero assistir"
    When você escolhe a opção "Selecionar categoria" para a categoria "Assistido" do filme "Duna"
    Then o usuário ainda está na página "Listas"
    And o filme "Duna" não está mais na categoria "Quero assistir"
    And o filme "Duna" não está mais na lista "Lista de quero assistir"
    And o filme "Duna" está na categoria "Assistido"

Scenario: mudar categoria de série já listada
    Given o usuário está na página "Listas" do próprio perfil
    And visualizando a lista "Lista de quero assistir"
    And a série "The Office" está na categoria "Quero assistir"
    When você escolhe a opção "Selecionar categoria" para a categoria "Assistido" da série "The Office"
    Then o usuário ainda está na página "Listas"
    And a série "The Office" não está mais na categoria "Quero assistir"
    And a série "The Office" não está mais na lista "Lista de quero assistir"
    And a série "The Office" está na categoria "Assistido"

Scenario: ver informações de série já listada
    Given o usuário está na página "Listas" do usuário "einstein"
    And o usuário está na lista "Lista de assistidos"
    And a série "The Office" está na categoria "Assistidos" para o usuário "einstein"
    When você "Seleciona" a série "The Office"
    Then o usuário está vendo as informações da série "The Office"

Scenario: ver informações de filme já listado
    Given o usuário está na página "Listas" do usuário "einstein"
    And o usuário está na lista "Lista de assistidos"
    And o filme "Duna" está na categoria "Assistidos" para o usuário "einstein"
    When você "Seleciona" o filme "Duna"
    Then o usuário está vendo as informações do filme "Duna"

Scenario: trocar lista
    Given o usuário está na página "Listas" do usuário "einstein"
    And o usuário está na lista "Lista de assistidos"
    When o usuário selecionar "Mudar" para a lista "Lista de quero assistir"
    Then o usuário ainda está na página "Listas" do usuário "einstein"
    And o usuário está na lista "Lista de quero assistir"

Scenario: cadastrar categoria em filme
    Given o filme "Duna" não está na lista de nenhuma categoria para o usuário “einstein” no sistema
    When o usuário “einstein” adiciona a categoria "Assistido" ao filme "Duna"
    Then o filme "Duna" é adicionado à lista da categoria "Assistido" do usuário “einstein” no sistema

Scenario: cadastrar categoria em série
    Given a série "The Office" não está na lista de nenhuma categoria para o usuário “einstein” no sistema
    When o usuário “einstein” adiciona a categoria "Assistido" à série "The Office"
    Then a série "The Office" é adicionada à lista da categoria "Assistido" do usuário “einstein” no sistema

Scenario: mudar categoria de filme
    Given o filme "Duna" está na lista da categoria "Quero assistir" para o usuário “einstein” no sistema
    When o usuário “einstein” seleciona a categoria "Assistido" ao filme "Duna"
    Then o filme "Duna" é removido da lista da categoria "Quero assistir" do usuário “einstein” no sistema
    And o filme "Duna" é adicionado à lista da categoria "Assistido" do usuário “einstein” no sistema

Scenario: mudar categoria de série
    Given a série "The Office" está na lista da categoria "Quero assistir" para o usuário “einstein” no sistema
    When o usuário “einstein” seleciona a categoria "Assistido" à série "The Office"
    Then a série "The Office" é removido da lista da categoria "Quero assistir" do usuário “einstein” no sistema
    And a série "The Office" é adicionada à lista da categoria "Assistido" do usuário “einstein” no sistema

Scenario: remover categoria de filme
    Given o filme "Duna" está na lista da categoria "Quero assistir" para o usuário “einstein” no sistema
    When o usuário “einstein” remove a categoria "Assistido" do filme "Duna"
    Then o filme "Duna" é removido da lista da categoria "Assistido" do usuário “einstein” no sistema

Scenario: remover categoria de série
    Given a série "The Office" está na lista da categoria "Quero assistir" para o usuário “einstein” no sistema
    When o usuário “einstein” remove a categoria "Assistido" da série "The Office"
    Then a série "The Office" é removida da lista da categoria "Assistido" do usuário “einstein” no sistema