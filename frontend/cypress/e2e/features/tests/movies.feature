Feature: manage contents
    As an admin user 
    I want to manage the contents
    So that can create, modify or delete contents

Scenario: Register a movie on the database
    Given the user visites the page "contents/movies"
    And the user does not visualize content registred with title "A Múmia"
    When the user selects "Adicione um conteúdo"
    Then the user visualizes the text "Criar conteúdo"
    When the user fills the data "Título" with "A Múmia"
    And the user fills the data "Sinopse" with "A Múmia é um filme de ação"
    And  the user selects "Confirmar"
    Then the user visites the page "contents/movies"
    And the user visualizes a content registred with title "A Múmia"

Scenario: Try to register a movie on the database with title that already exists
    Given the user visites the page "contents/movies"
    And the user visualizes a content registred with title "Carros 2"
    When the user selects "Adicione um conteúdo"
    Then the user visualizes the text "Criar conteúdo"
    When the user fills the data "Título" with "Carros 2"
    When the user fills the data "Sinopse" with "Um filme para toda família"
    And  the user selects "Confirmar"
    Then appears an message saying "O conteúdo já existe"
    And the user visualizes the text "Criar conteúdo"

Scenario: get a movie by title on the database
    Given the user visites the page "contents/movies"
    And the user visualizes a content registred with title "Carros 2"
    When the user selects the content "Carros 2"
    Then the user visites the page "/contents/movies/Carros 2"
    And the user visualizes "Título" "Carros 2"