Feature: watch list
    As an user 
    I want to mark contents as watched/want to watch/abandoned
    So that others can see what I'm up to

Scenario: Change category tab
    Given the user is on the page "profile/edsonneto8"
    And the user is on the "watch_list_tab" tab
    When the user goes to the "quero_assistir_category" category tab
    Then the user is on the "quero_assistir_category" category tab

Scenario: Change category of content
    Given the user is on the page "profile/edsonneto8"
    And the user is on the "watch_list_tab" tab
    When the user clicks the "options_button" button for the movie with id "Magnum"
    And the user clicks the "quero_assistir_option" option
    Then the movie with id "Magnum" is not on the page
    When the user goes to the "quero_assistir_category" category tab
    Then the movie with id "Magnum" is on the page

Scenario: Remove content from category
    Given the user is on the page "profile/edsonneto8"
    And the user is on the "watch_list_tab" tab
    When the user clicks the "options_button" button for the movie with id "Magnum"
    And the user clicks the "quero_assistir_option" option
    Then the movie with id "Magnum" is not on the page
