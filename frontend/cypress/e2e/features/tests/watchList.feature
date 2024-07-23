Feature: watch list
    As an user
    I want to mark contents as watched/want to watch/abandoned
    So that others can see what I'm up to

Scenario: Change category tab
    Given the user is on the page "profile/gusta"
    And the user is on the "watch_list_tab" tab
    When the user goes to the "quero_assistir_category" category tab
    Then the user is on the "quero_assistir_category" category tab

Scenario: Change category of content
    Given the user is logged in as "gusta"
    And the user is on the page "profile/gusta"
    And the movie with id "292177", type "movies" is on the user "assistidos" list of the user "gusta"
    And the user is on the "watch_list_tab" tab
    When the user clicks the "options_button" button for the movie with id "292177"
    And the user clicks the "quero_assistir_option" option
    Then the movie with id "292177" is not on the page
    When the user goes to the "quero_assistir_category" category tab
    Then the movie with id "292177" is on the page

Scenario: Remove content from category
    Given the user is logged in as "gusta"
    And the user is on the page "profile/gusta"
    And the movie with id "292177", type "movies" is on the user "assistidos" list of the user "gusta"
    And the user is on the "watch_list_tab" tab
    When the user clicks the "options_button" button for the movie with id "292177"
    And the user clicks the "quero_assistir_option" option
    Then the movie with id "292177" is not on the page

Scenario: Adding content to category
    Given the user is logged in as "gusta"
    And the user logged to the page "contents/movies"
    When the user clicks the "options_button" button for the movie with id "292177"
    And the user clicks the "assistidos_option" option
    And the user is on its profile
    And the user is on the "watch_list_tab" tab
    Then the movie with id "292177" is on the page

Scenario: Trying to add content to category not logged in
    Given the user is on the page "contents/movies"
    And the user is not logged in
    When the user hovers the movie with id "292177"
    Then the "options_button" button is not on the card
