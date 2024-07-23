Feature: manage tv shows
    As an admin user 
    I want to manage the tv shows
    So that can create, modify or delete tv shows

Scenario: Register a tv show 
    Given the user is logged as admin
    And the user selects "Séries"
    And the user does not visualize content registered with title "Os Simpsons"
    When the user selects "Adicionar conteúdo"
    Then the user visualizes the text "Criar conteúdo"
    When the user fills the data "Título" with "Os Simpsons"
    And the user fills the data "Sinopse" with "Os Simpsons é uma série de televisão onde todos são amarelos"
    And  the user selects "Confirmar"
    Then the user is in the page "contents/tv_shows"
    And the user visualizes a content registered with title "Os Simpsons"

Scenario: Try to register a tv show with title that already exists
    Given the user is logged as admin
    And the user selects "Séries"
    And the user visualizes a content registered with title "Magnum"
    When the user selects "Adicionar conteúdo"
    Then the user is in the page "create_content"
    When the user fills the data "Título" with "Magnum"
    When the user fills the data "Sinopse" with "Uma série clássica de ação e porradaria"
    And  the user selects "Confirmar"
    Then appears an message saying "O conteúdo já existe"
    And the user is in the page "create_content"

Scenario: see tv show details
    Given the user is logged as admin
    And the user selects "Séries"
    And the user visualizes a content registered with title "Magnum"
    When the user selects the content "Magnum"
    Then the user is in the page "/contents/tv_shows/Magnum"
    And the user visualizes "Título" "Magnum"

Scenario: update tv show information
    Given the user is logged as admin
    And the user selects "Séries"
    And the user visualizes a content registered with title "Magnum"
    When the user selects the content "Magnum"
    Then the user is in the page "/contents/tv_shows/Magnum"
    And the user visualizes "Gênero" "Ação"
    When the user selects "Atualizar conteúdo"
    And the user fills the data "Gênero" with "Investigação"
    And the user selects "Confirmar"
    Then the user visualizes "Gênero" "Investigação"

Scenario: update tv show information with title that already exists
    Given the user is logged as admin
    And the user selects "Séries"
    And the user visualizes a content registered with title "Magnum"
    And the user visualizes a content registered with title "Whoopi"
    When the user selects the content "Magnum"
    Then the user is in the page "/contents/tv_shows/Magnum"
    When the user selects "Atualizar conteúdo"
    And the user fills the data "Título" with "Whoopi"
    And the user selects "Confirmar"
    Then appears an message saying "já existe um outro conteúdo com esse título"

Scenario: delete a tv show
    Given the user is logged as admin
    And the user selects "Séries"
    And the user visualizes a content registered with title "Magnum"
    When the user selects the content "Magnum"
    Then the user is in the page "/contents/tv_shows/Magnum"
    And the user visualizes "Título" "Magnum"
    When the user selects "Deletar conteúdo"
    Then the user is in the page "/contents/tv_shows"
    And the user does not visualize content registered with title "Magnum"
