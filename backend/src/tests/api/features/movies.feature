Feature: Movies API

    Scenario: Register a movie on the database
        Given no movie with title "Gato de botas" is in the database
        When a POST request is sent to "/contents/movies" with title "Gato de botas", synopsis "A história de um gato com habilidades de espadachim e uma bota", gender "aventura", duration "125", release year "2022", director "The Rock", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "gato_de_botas.png"
        Then the json status code is "201"
        And the json response have title "Gato de botas", synopsis "A história de um gato com habilidades de espadachim e uma bota", gender "aventura", duration "125", release year "2022", director "The Rock", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "gato_de_botas.png"

    Scenario: Try to register a movie on the database with title that already exists
        Given only movie with title "Gato de botas" is in the database
        When a POST request is sent to "/contents/movies" with title "Gato de botas", synopsis "A história de um gato com habilidades de espadachim e uma bota", gender "terror", duration "125", release year "2022", director "The Rock", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "gato_de_botas.png"
        Then the json status code is "422"
        And the json response have message "There is a movie with the same title in the database"
        And only "1" movie is in the database

    Scenario: get a movie by title on the database
        Given only movie with title "Gato de botas", synopsis "A história de um gato com habilidades de espadachim e uma bota", gender "aventura", duration "125", release year "2022", director "The Rock", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "gato_de_botas.png" is in the database
        When a GET request is sent to "/contents/movies/Gato%20de%20botas"
        Then the json status code is "200"
        And the json response have title "Gato de botas", synopsis "A história de um gato com habilidades de espadachim e uma bota", gender "aventura", duration "125", release year "2022", director "The Rock", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "gato_de_botas.png"

    Scenario: get a movie by title that does not exist on the database 
        Given no movie with title "Gato de botas" is in the database
        When a GET request is sent to "/contents/movies/Gato%20de%20botas"
        Then the json status code is "404"
        And the json response have message "No movie with this title found in the database"

    Scenario: Update a movie on the database
        Given only movie with title "Gato de botas" is in the database
        When a PUT request is sent to "/contents/movies/Gato%20de%20botas" with title "Gato de botas 2", synopsis "Uma nova história de um gato com habilidades de espadachim e uma bota. O gato enfrenta muitos desafios em sua jornada cativante", gender "Ação", duration "125", release year "2024", director "The Rock", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "gato_de_botas.png"
        Then the json status code is "200"
        And the json response have title "Gato de botas 2", synopsis "Uma nova história de um gato com habilidades de espadachim e uma bota. O gato enfrenta muitos desafios em sua jornada cativante", gender "aventura", duration "125", release year "2024", director "The Rock", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "gato_de_botas.png"
        And only "1" movie is in the database
        And movie with title "Gato de botas 2" is in the database

    Scenario: Try to update a movie on the database with title that does not exist
        Given only movie with title "Gato de botas", synopsis "A história de um gato com habilidades de espadachim e uma bota", gender "aventura", duration "125", release year "2022", director "The Rock", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "gato_de_botas.png" is in the database
        When a POST request is sent to "/contents/movies/Matrix" with title "Matrix", synopsis "Uma distopia cheia de mistérios e grandes revelações", gender "ação", duration "150", release year "2008", director "Tarantino", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "matrix.png"
        Then the json status code is "404"
        And the json response have message "No movie with this title found in the database"
        And only "1" movie is in the database
        And movie with title "Gato de botas" is in the database

    Scenario: delete a movie by title on the database
        Given only movie with title "Gato de botas", synopsis "A história de um gato com habilidades de espadachim e uma bota", gender "aventura", duration "125", release year "2022", director "The Rock", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "gato_de_botas.png" is in the database
        And movie with title "Matrix", synopsis "Uma distopia cheia de mistérios e grandes revelações", gender "ação", duration "150", release year "2008", director "Tarantino", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "matrix.png" is in the database
        When a DELETE request is sent to "/contents/movies/Gato%20de%20botas"
        Then the json status code is "200"
        And the json response have title "Gato de botas", synopsis "A história de um gato com habilidades de espadachim e uma bota", gender "aventura", duration "125", release year "2022", director "The Rock", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "gato_de_botas.png"
        And only "1" movie is in the database
        And movie with title "Matrix" is in the database

    Scenario: delete a movie by title that does not exist on the database 
        Given only movie with title "Gato de botas", synopsis "A história de um gato com habilidades de espadachim e uma bota", gender "aventura", duration "125", release year "2022", director "The Rock", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "gato_de_botas.png" is in the database
        When a DELETE request is sent to "/contents/movies/Matrix"
        Then the json status code is "404"
        And the json response have message "No movie with this title found in the database"
        And only "1" movie is in the database
        And movie with title "Gato de botas" is in the database

    Scenario: get all movies in the database
        Given only movie with title "Gato de botas", synopsis "A história de um gato com habilidades de espadachim e uma bota", gender "aventura", duration "125", release year "2022", director "The Rock", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "gato_de_botas.png" is in the database
        And movie with title "Matrix", synopsis "Uma distopia cheia de mistérios e grandes revelações", gender "ação", duration "150", release year "2008", director "Tarantino", main cast "Rodrigo Hilbert, Madonna, Xuxa", banner "matrix.png" is in the database
        When a GET request is sent to "/contents/movies"
        Then the json status code is "200"
        And the json response have movie with title "Gato de botas"
        And the json response have movie with title "Matrix"