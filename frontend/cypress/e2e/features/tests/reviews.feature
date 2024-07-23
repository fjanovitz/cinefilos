Feature: manage reviews
    As an user 
    I want to manage my reviews
    So that can create, modify or delete my reviews

Scenario: Register a review
    Given the user "edsonneto8" visits the page "/contents/movies/Interestelar"
    And the user "edsonneto8" does not visualize a review registered with username "edsonneto8"
    When the user "edsonneto8" selects "Adicione uma avaliação"
    Then the user "edsonneto8" visualizes the text "Interestelar (2014)"
    When the user "edsonneto8" fills the data "Título da Avaliação" with "Melhor filme da história"
    And the user "edsonneto8" fills the data "Avaliação" with "Sem palavras"
    And the user "edsonneto8" selects the data "10" for field "Nota"
    And the user "edsonneto8" selects "Enviar Avaliação"
    Then the user is in the page "/contents/movies/Interestelar"
    And the user "edsonneto8" visualizes a review registered with username "edsonneto8"

Scenario: Try to register a review to a content that was already reviewed by the user
    Given the user "edsonneto8" visits the page "/contents/movies/Inferno"
    And the user "edsonneto8" visualizes a review registered with username "edsonneto8"
    When the user "edsonneto8" selects "Adicione uma avaliação"
    Then the user "edsonneto8" visualizes the text "Inferno (2016)"
    When the user "edsonneto8" fills the data "Título da Avaliação" with "Melhor filme da história"
    And the user "edsonneto8" fills the data "Avaliação" with "Sem palavras"
    And the user "edsonneto8" selects the data "10" for field "Nota"
    And the user "edsonneto8" selects "Enviar Avaliação"
    Then appears a message saying "Você já fez uma avaliação para este conteúdo."
    And the user is in the page "/contents/movies/Inferno"  

Scenario: Update review information
    Given the user is logged as "edsonneto8"
    And the user "edsonneto8" selects "Username"
    And the user is in the page "profile/edsonneto8"
    And the user "edsonneto8" visualizes a review registered for the content_type "movies" and content_id "323675" 
    And the user "edsonneto8" visualizes "review-title-edsonneto8-movies-323675" "Muito engraçado"
    When the user "edsonneto8" selects "update-review-button-movies-323675"
    And the user "edsonneto8" fills the data "Título da Avaliação" with "Excelente filme"
    And the user "edsonneto8" selects "Enviar Avaliação"    
    Then the user "edsonneto8" visualizes "review-title-edsonneto8-movies-323675" "Excelente filme"

Scenario: Delete a review 
    Given the user is logged as "edsonneto8"
    And the user "edsonneto8" selects "Username"
    And the user is in the page "profile/edsonneto8"
    And the user "edsonneto8" visualizes a review registered for the content_type "movies" and content_id "323675" 
    When the user "edsonneto8" selects "delete-review-button-movies-323675"
    Then the user is in the page "profile/edsonneto8"
    And the user "edsonneto8" does not visualize a review registered for the content_type "movies" and content_id "323675"
    And appears a message saying "Review deletada com sucesso."

Scenario: Try to register a review without title
    Given the user "edsonneto8" visits the page "/contents/movies/Logan"
    And the user "edsonneto8" does not visualize a review registered with username "edsonneto8"
    When the user "edsonneto8" selects "Adicione uma avaliação"
    Then the user "edsonneto8" visualizes the text "Logan (2017)"
    And the user "edsonneto8" fills the data "Avaliação" with "Sem palavras"
    And the user "edsonneto8" selects the data "10" for field "Nota"
    And the user "edsonneto8" selects "Enviar Avaliação"
    Then the user is in the page "/contents/movies/Logan/create_review"

Scenario: Try to register a review without report
    Given the user "edsonneto8" visits the page "/contents/movies/Logan"
    And the user "edsonneto8" does not visualize a review registered with username "edsonneto8"
    When the user "edsonneto8" selects "Adicione uma avaliação"
    Then the user "edsonneto8" visualizes the text "Logan (2017)"
    When the user "edsonneto8" fills the data "Título da Avaliação" with "Melhor filme da história"
    And the user "edsonneto8" selects the data "10" for field "Nota"
    And the user "edsonneto8" selects "Enviar Avaliação"
    Then the user is in the page "/contents/movies/Logan/create_review"