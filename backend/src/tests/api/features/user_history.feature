Feature: User History API

    Scenario: Get user history
        Given user with username "Gusta" is in the database
        When a GET request is sent to the history of the user "Gusta"
        Then the json status code is "200"
        And the json response have a list of posts and reviews

    Scenario: User not found
        Given no user with username "Gusta2" is in the database
        When a GET request is sent to the history of the user "Gusta2"
        Then the json status code is "404"
        And the json response have message "No user with this username found in the database"

    Scenario: Getting history after new review
        Given user with username "Gusta" is in the database
        And user with username "Gusta" has no reviews
        When user with username "Gusta" makes a review to content with id "d7930544-2f92-471d", content type "tv_shows"
        And a GET request is sent to the history of the user "Gusta"
        Then the json status code is "200"
        And the json response list have 1 review