Feature: Comment on Posts

    Scenario: Add a comment to a post
        Given post with post_id "123" in the database
        When a POST request is sent to "/post/123" by user "ersaujo", content "This is a comment"
        Then the json status code is "200"
        And the json response contains the comment

    Scenario: Remove a comment from a post
        Given post with comment_id "789", author "ersaraujo", content "This is a comment"
        When a DELETE request is sent to "/post/789" by user "ersaraujo"
        Then the json status code is "200"
        And the json response contains the removed comment