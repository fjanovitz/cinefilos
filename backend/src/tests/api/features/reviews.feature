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