Feature: Reviews API

    Scenario: register a movie review on the database
        Given no review from username "edsonneto8" to content_id "interstellar", content_type "movie" is in database
        When a POST request is sent to "/reviews" from user "edsonneto8", content_id "interstellar", content_type "movie", rating "10", report "Incredible"
        Then the json status code is "201"
        And the json response have username "edsonneto8", content_id "interstellar", content_type "movie", rating "10", report "Incredible"
