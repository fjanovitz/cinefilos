Feature: Posts API

    Scenario: Get post that exists in the database
        Given Exists a post with ID "1234", title "Post Básico" and content "Um texto genérico" in the database
        When a GET request is sent to "/forum/post/1234"
        Then the json status code is "200"
        And the json response have ID "1234", title "Post Básico" and content "Um texto genérico"

    Scenario: Get post that does not exist in the database
        Given Does not exist a post with ID "1234" in the database
        When a GET request is sent to "/post/1234"
        Then the json status code is "404"
        And the json response have the message "Este post não existe ou foi excluído"
    
    Scenario: Create a post successfully
        Given Does not exist a post with ID "1234" in the database
        When a POST request is sent to "forum/newpost"

    Scenario: Try to create a post without a title

    Scenario: Delete a post successfully

    Scenario: Try to delete a post that does not exists in database

    Scenario: Like a post successfully

    Scenario: Remove the like from a post successfully

    Scenario: Get the list of the users who liked a post