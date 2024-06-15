Feature: Reviews API

    Scenario: Register a movie review on the database
        Given no review from username "edsonneto8" to content_id "123", content_type "movies" is in database
        When a POST request is sent to "/reviews" from username "edsonneto8", content_id "123", content_type "movies", rating "10", report "Incredible"
        Then the json status code is "201"
        And the json response have username "edsonneto8", content_id "123", content_type "movies", rating "10", report "Incredible"

    Scenario: Register a tv show review on the database
        Given no review from username "edsonneto8" to content_id "1234", content_type "tv_shows" is in database
        When a POST request is sent to "/reviews" from username "edsonneto8", content_id "1234", content_type "tv_shows", rating "10", report "Incredible"
        Then the json status code is "201"
        And the json response have username "edsonneto8", content_id "1234", content_type "tv_shows", rating "10", report "Incredible"

    Scenario: Try to register a movie review to a movie that already has been reviewed by the user
        Given a review from username "edsonneto8" to content_id "123", content_type "movies", rating "9", report "good" is in database
        When a POST request is sent to "/reviews" from username "edsonneto8", content_id "123", content_type "movies", rating "10", report "Incredible"
        Then the json status code is "402"
        And the database have review with username "edsonneto8", content_id "123", content_type "movies", rating "9", report "good"

    Scenario: Try to register a tv show review to a tv show that already has been reviewed by the user
        Given a review from username "edsonneto8" to content_id "1234", content_type "tv_shows", rating "9", report "good" is in database
        When a POST request is sent to "/reviews" from username "edsonneto8", content_id "1234", content_type "tv_shows", rating "10", report "Incredible"
        Then the json status code is "402"
        And the database have review with username "edsonneto8", content_id "1234", content_type "tv_shows", rating "9", report "good"

    Scenario: Try to register a movie review to a movie that does not exist in the database
        Given no review from username "edsonneto8" to content_id "123", content_type "movies" is in database
        And no content with content_id "123" and content_type "movies" exist in database
        When a POST request is sent to "/reviews" from username "edsonneto8", content_id "123", content_type "movies", rating "10", report "Incredible"
        Then the json status code is "404"
        And the database does not contain any reviews

    Scenario: Try to register a tv show review to a tv show that does not exist in the database
        Given no review from username "edsonneto8" to content_id "123", content_type "tv_shows" is in database
        And no content with content_id "123" and content_type "tv_shows" exist in database
        When a POST request is sent to "/reviews" from username "edsonneto8", content_id "123", content_type "tv_shows", rating "10", report "Incredible"
        Then the json status code is "404"
        And the database does not contain any reviews

    Scenario: Get a review from a user to a content
        Given username "edsonneto8" made a review to content_id "123", content_type "movies", rating "10", report "Incredible"
        When a GET request is sent to "/reviews/edsonneto8/movies/123"
        Then the json status code is "200"
        And the json response have username "edsonneto8", content_id "123", content_type "movies", rating "10", report "Incredible"

    Scenario: Get review from a user to some content
        Given username "edsonneto8" made a review to content_id "123", content_type "movies", rating "10", report "Incredible"
        And username "edsonneto8" only made "1" reviews
        When a GET request is sent to "/reviews/edsonneto8"
        Then the json status code is "200"
        And the json response have a list of length "1"
        And the list in position "0" have username "edsonneto8", content_id "123", content_type "movies", rating "10", report "Incredible"

    Scenario: Get all reviews to some content
        Given username "edsonneto8" made a review to content_id "123", content_type "movies", rating "10", report "Incredible"
        When a GET request is sent to "/reviews/movies/123"
        Then the json status code is "200"
        And the json response have a list of length "1"
        And the list in position "0" have username "edsonneto8", content_id "123", content_type "movies", rating "10", report "Incredible"

    Scenario: Get all reviews in database
        Given username "edsonneto8" made a review to content_id "123", content_type "movies", rating "10", report "Incredible"
        When a GET request is sent to "/reviews"
        Then the json status code is "200"
        And the json response have a list of length "1"
        And the list in position "0" have username "edsonneto8", content_id "123", content_type "movies", rating "10", report "Incredible"

    Scenario: Get reviews of a content that does not exist in the database
        Given no content with content_id "123" and content_type "movies" exists in the database
        When a GET request is sent to "reviews/movies/123"
        Then the json status code is "404"
        And the database does not have content with content_id "123" and content_type "movies"

    Scenario: Get reviews from a user to a content that does not exist in the database
        Given no content with content_id "123" and content_type "movies" exists in the database
        When a GET request is sent to "reviews/edsonneto8/movies/123"
        Then the json status code is "404"
        And the database does not have content with content_id "123" and content_type "movies"

    Scenario: Get a review from a user to a content that was not reviewed by the user
        Given no review from username "edsonneto8" to content_id "123", content_type "movies" is in database
        When a GET request is sent to "reviews/edsonneto8/movies/123"
        Then the json status code is "404"
        And the database does not have review from user "edsonneto8" to content with content_id "123" and content_type "movies"