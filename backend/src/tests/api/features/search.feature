Feature: Search Posts by Topic

    Scenario: Search for posts by a valid topic
        Given post with title "Lições - Puppy Love", topic "comedy" is in the database 
        When a GET request is sent to "/forum/search/comedy"
        Then the json status code is "200"
        And the json response contains a list of posts with topic "comedy"

    Scenario: Search for posts by a topic that doesn't exist
        Given no post with title "Remake - High Musical", topic "music" is in the database
        When a GET request is sent to "/forum/search/music"
        Then the json status code is "404"
        And the json response contains a message "Not Found"

    Scenario: Search for posts by a topic with special characters
        Given post with title "Ciencia", topic "Science Fiction" is in the database
        When a GET request is sent to "/forum/search/Science%20Fiction"
        Then the json status code is "200"
        And the json response contains a list of posts with topic "Science Fiction"

    Scenario: Search for posts by an empty topic
        Given post with title "Lições - Puppy Love", topic "comedy" is in the database
        And post with title "Nova Era do Terror", topic "terror" is in the database
        When a GET request is sent to "/forum/search/"
        Then the json status code is "404"
        And the json response contains a message "Not Found"

    Scenario: Search for posts by a topic with uppercase letters
        Given post with title "Contando historia", topic "documentary" is in the database
        When a GET request is sent to "/forum/search/DOCUMENTARY"
        Then the json status code is "200"
        And the json response contains a list of posts with topic "documentary"