Feature: manage contents
    As an admin user 
    I want to manage the contents
    So that can create, modify or delete contents

Scenario: Register a movie 
    Given the user is logged as admin
    And the user does not visualize content registered with title "A Múmia"
    When the user selects "Adicionar conteúdo"
    Then the user visualizes the text "Criar conteúdo"
    When the user fills the data "Título" with "A Múmia"
    And the user fills the data "Sinopse" with "A Múmia é um filme de ação"
    And  the user selects "Confirmar"
    Then the user is in the page "contents/movies"
    And the user visualizes a content registered with title "A Múmia"

Scenario: Try to register a movie with title that already exists
    Given the user is logged as admin
    And the user visualizes a content registered with title "Carros 2"
    When the user selects "Adicionar conteúdo"
    Then the user is in the page "create_content"
    When the user fills the data "Título" with "Carros 2"
    When the user fills the data "Sinopse" with "Um filme para toda família"
    And  the user selects "Confirmar"
    Then appears an message saying "O conteúdo já existe"
    And the user is in the page "create_content"

Scenario: see movie details
    Given the user is logged as admin
    And the user visualizes a content registered with title "Carros 2"
    When the user selects the content "Carros 2"
    Then the user is in the page "/contents/movies/Carros%202"
    And the user visualizes "Título" "Carros 2"

Scenario: update movie information
    Given the user is logged as admin
    And the user visualizes a content registered with title "Carros 2"
    When the user selects the content "Carros 2"
    Then the user is in the page "/contents/movies/Carros%202"
    And the user visualizes "Gênero" "Comédia"
    When the user selects "Atualizar conteúdo"
    And the user fills the data "Gênero" with "Familia"
    And the user selects "Confirmar"
    Then the user visualizes "Gênero" "Familia"

Scenario: update movie information with title that already exists
    Given the user is logged as admin
    And the user visualizes a content registered with title "Carros 2"
    And the user visualizes a content registered with title "Carros 3"
    When the user selects the content "Carros 2"
    Then the user is in the page "/contents/movies/Carros%202"
    When the user selects "Atualizar conteúdo"
    And the user fills the data "Título" with "Carros 3"
    And the user selects "Confirmar"
    Then appears an message saying "já existe um outro conteúdo com esse título"

Scenario: delete a movie
    Given the user is logged as admin
    And the user visualizes a content registered with title "Carros 2"
    When the user selects the content "Carros 2"
    Then the user is in the page "/contents/movies/Carros%202"
    And the user visualizes "Título" "Carros 2"
    When the user selects "Deletar conteúdo"
    Then the user is in the page "/contents/movies"
    And the user does not visualize content registered with title "Carros 2"
