Feature: Comment on Posts

    Scenario: Add a comment to a post
        Given post with post_id "123" in the database
        When a POST request is sent to "/post/123" by user "ersaraujo", content "This is a comment"
        Then the json status code is "200"
        And the json response contains the comment_id, author "ersaraujo", content "This is a comment"

    Scenario: Remove a comment from a post
        Given post with post_id "123" in the database
        And post with comment_id "789", author "ersaraujo", content "This is a comment"
        When a DELETE request is sent to "/post/789" by user "ersaraujo"
        Then the json status code is "200"
        And the json response contains the post without comment_id "789"

    Scenario: Add a comment to a post with empty content
        Given post with post_id "123" in the database
        When a POST request is sent to "/post/123" with post_id "123" by user "ersaraujo", content " "
        Then the json status code is "422"
        And the json response contains the error message "Content cannot be empty"