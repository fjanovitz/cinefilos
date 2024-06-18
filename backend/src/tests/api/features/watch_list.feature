Feature: Watch List API

    Scenario: Add movie to category
        Given user with username "Gusta" is in the database
        Given no content with title "Duna 2" is in the "assistidos" list of the user "Gusta"
        And content with title "Duna 2", content_id "d7930544", content type "movies" is in the database
        When a POST request is sent to the list "assistidos" of the user "Gusta", content_id "d7930544", content type "movies"
        Then the json status code is "201"
        And the json response have title "Duna 2", content_id "d7930544"

    Scenario: Add Tv Show to category
        Given user with username "Gusta" is in the database
        And no content with title "The Office" is in the "assistidos" list of the user "Gusta"
        And content with title "The Office", content_id "d7930544-2f92-471d", content type "tv_shows" is in the database
        When a POST request is sent to the list "assistidos" of the user "Gusta", content_id "d7930544-2f92-471d", content type "tv_shows"
        Then the json status code is "201"
        And the json response have title "The Office", content_id "d7930544-2f92-471d"

    Scenario: Add movie that is already in category
        Given content with title "Duna", content_id "d7930544-2f92-471d-86d1-48c463fbff85", content type "movies" is in the database
        And user with username "Gusta" is in the database
        And content with title "Duna" is in the "assistidos" list of the user "Gusta", content type "movies"
        When a POST request is sent to the list "assistidos" of the user "Gusta", content_id "d7930544-2f92-471d-86d1-48c463fbff85", content type "movies"
        Then the json status code is "422"
        And the json response have message "This movie is already in the category"

    Scenario: Add Tv Show that is already in category
        Given content with title "The Office", content_id "d7930544-2f92-471d", content type "tv_shows" is in the database
        And user with username "Gusta" is in the database
        And content with title "The Office" is in the "assistidos" list of the user "Gusta", content type "tv_shows"
        When a POST request is sent to the list "assistidos" of the user "Gusta", content_id "d7930544-2f92-471d", content type "tv_shows"
        Then the json status code is "422"
        And the json response have message "This movie is already in the category"

    Scenario: Add movie that is not in database to category
        Given no content with title "Duna 3" is in the database
        And user with username "Gusta" is in the database
        When a POST request is sent to the list "assistidos" of the user "Gusta", content_id "48c463fbff85", content type "movies"
        Then the json status code is "404"
        And the json response have message "No movie with this ID found in the database"

    Scenario: Add Tv Show that is not in database to category
        Given no content with title "The Office" is in the database
        And user with username "Gusta" is in the database
        When a POST request is sent to the list "assistidos" of the user "Gusta", content_id "d7930544-2f92-471d", content type "tv_shows"
        Then the json status code is "404"
        And the json response have message "No movie with this ID found in the database"

    Scenario: Get movie from category list
        Given content with title "Duna", content_id "d7930544-2f92-471d-86d1-48c463fbff85", content type "movies" is in the database
        And user with username "Gusta" is in the database
        And content with title "Duna" is in the "assistidos" list of the user "Gusta", content type "movies"
        When a GET request is sent to the list "assistidos" of the user "Gusta"
        Then the json status code is "200"
        And the json response contains the content with title "Duna"

    Scenario: Get Tv Show from category list
        Given content with title "The Office", content_id "d7930544-2f92-471d", content type "tv_shows" is in the database
        And user with username "Gusta" is in the database
        And content with title "The Office" is in the "assistidos" list of the user "Gusta", content type "tv_shows"
        When a GET request is sent to the list "assistidos" of the user "Gusta"
        Then the json status code is "200"
        And the json response contains the content with title "The Office"

    Scenario: Get category list
        Given user with username "Gusta" is in the database
        When a GET request is sent to the list "assistidos" of the user "Gusta"
        Then the json status code is "200"
        And the json response contains a items_list
    
    Scenario: Remove movie from category
        Given content with title "Duna", content_id "d7930544-2f92-471d-86d1-48c463fbff85", content type "movies" is in the database
        And user with username "Gusta" is in the database
        And content with title "Duna" is in the "assistidos" list of the user "Gusta", content type "movies"
        When a DELETE request is sent to the list "assistidos" of the user "Gusta", content_id "d7930544-2f92-471d-86d1-48c463fbff85"
        Then the json status code is "200"
        And the json response have title "Duna", content_id "d7930544-2f92-471d-86d1-48c463fbff85"
        
    Scenario: Remove movie not in the category
        Given user with username "Gusta" is in the database
        And no content with title "Duna 3" is in the "assistidos" list of the user "Gusta"
        When a DELETE request is sent to the list "assistidos" of the user "Gusta", content_id "d7930544-2f92-471d"
        Then the json status code is "404"
        And the json response have message "No movie with this ID found in this category"
