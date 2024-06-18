Feature: Posts API

    Scenario: Get post that exists in the database
        Given Exists a post with ID "1234", author "kiko", title "Post Básico" and content "Um texto genérico" in the database
        When a GET request is sent to "/forum/post/1234"
        Then the json status code is "200"
        And the json response have ID "1234", author "kiko", title "Post Básico" and content "Um texto genérico"

    Scenario: Get post that does not exist in the database
        Given Does not exist a post with ID "1234" in the database
        When a GET request is sent to "/forum/post/1234"
        Then the json status code is "404"
        And the json response have the message "Este post não existe ou foi excluído"
    
    Scenario: Create a post successfully
        Given Does not exist a post with ID "5678" in the database
        When a POST request is sent to "/forum/newpost" from user "kiko", with ID "5678", title "Post Diferente" and content "Um texto diferente"
        Then the json status code is "201"
        And the json response have ID "5678", author "kiko", title "Post Diferente" and content "Um texto diferente"

    Scenario: Try to create a post without a title
        Given Does not exist a post with ID "1234" in the database
        When a POST request is sent to "/forum/newpost" from user "kiko", with ID "1234", no title and content "Um texto genérico"
        Then the json status code is "422"
        And the json response have the message "Não é possível publicar um post sem título"

    Scenario: Delete a post successfully
        Given Exists a post with ID "1234", author "kiko", title "Post Básico" and content "Um texto genérico" in the database
        When a DELETE request is sent to "/forum/post/1234" by the user "kiko"
        Then the json status code is "200"
        And the json response have ID "1234", author "kiko", title "Post Básico" and content "Um texto genérico"

    Scenario: Try to delete a post not being the author
        Given Exists a post with ID "1234", author "kiko", title "Post Básico" and content "Um texto genérico" in the database
        When a DELETE request is sent to "/forum/post/1234" by the user "hannah"
        Then the json status code is "403"
        And the json response have the message "O post só pode ser excluído pelo autor"

    Scenario: Try to delete a post that does not exists in database
        Given Does not exist a post with ID "1234" in the database
        When a DELETE request is sent to "/forum/post/1234" by the user "kiko"
        Then the json status code is "404"
        And the json response have the message "Este post não existe ou foi excluído"

    Scenario: Like a post successfully
        Given Exists a post with ID "1234", author "kiko", title "Post Básico" and content "Um texto genérico" in the database
        And the user with ID "0001" do not liked the post with ID "1234"
        When a PUT request is sent to "/forum/post/1234" from the user with ID "0001"
        Then the json status code is "200"
        And the json response have the ID "0001" and the status "1"

    Scenario: Remove the like from a post successfully
        Given Exists a post with ID "1234", author "kiko", title "Post Básico" and content "Um texto genérico" in the database
        And the user with ID "0001" already liked the post with ID "1234"
        When a PUT request is sent to "/forum/post/1234" from the user with ID "0001"
        Then the json status code is "200"
        And the json response have the ID "0001" and the status "0"

    Scenario: Get the list of the users who liked a post
        Given Exists a post with ID "1234", author "kiko", title "Post Básico" and content "Um texto genérico" in the database
        And the user with ID "0001" already liked the post with ID "1234"
        And the user with ID "0002" already liked the post with ID "1234"
        When a GET request is sent to "/forum/post/1234/likes"
        Then the json status code is "200"
        And the json response have a list with 2 users with the ID "0001" in position "0" and "0002" in position "1"