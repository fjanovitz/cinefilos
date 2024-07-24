Feature: Friend/Follower Management

  Scenario: User follows another user
    Given the user opens the page "/user/get_user/Carlos33"
    And the user is logged with email "jcso@gmail.com" and password "Clebson123"
    When the user does not see a followed user with username "bell28"
    And the user enters the username "bell28" in the follow field
    And the user clicks the follow button
    Then the user should see the success message "Agora você está seguindo o usuário"

  Scenario: Successfully follow a user with a public profile
    Given the user opens the page "/user/get_user/Carlos33"
    And the user is logged with email "jcso@gmail.com" and password "Clebson123"
    And the user with username "bell28" has a public profile
    When the user enters the username "bell28" in the follow field
    And the user clicks the follow button
    Then the user should see the success message "Agora você está seguindo o usuário"

  Scenario: Request to follow a user with a private profile
    Given the user opens the page "/user/get_user/Carlos33"
    And the user is logged with email "jcso@gmail.com" and password "Clebson123"
    And the user with username "ed567" has a private profile
    When the user enters the username "ed567" in the follow field
    And the user clicks the follow button
    Then the user sees the text "Solicitação para seguir enviada com sucesso"

  Scenario: Successfully unfollow a user
    Given the user opens the page "/user/get_user/Carlos33"
    And the user is logged with email "jcso@gmail.com" and password "Clebson123"
    And the user with username "bell28" is followed by "Carlos33"
    When the user "Carlos33" opens the following list
    And the user selects "Unfollow"
    Then the user should see the success message "Você deixou de seguir o usuário"

  Scenario: Set profile to Private
    Given the user opens the page "/user/get_user/Carlos33"
    And the user is logged with email "jcso@gmail.com" and password "Clebson123"
    And the user with username "Carlos33" has a public profile
    When the user selects the privacy setting to 'Private'
    Then the user sees the text "Configurações de privacidade atualizadas"

  Scenario: Decline a Follow Request
    Given the user opens the page "/user/get_user/ed567"
    And the user is logged with email "edward@mail.com" and password "@Edward1222"
    And the user with username "clebson" has sent a follow request to "ed567"
    When the user "ed567" opens the follow request list
    And the user "ed567" sees the follow request from "clebson"
    And the user selects "Rejeitar"
    Then the user sees the text "Solicitação para seguir rejeitada"

  Scenario: Accept a Follow Request
    Given the user opens the page "/user/get_user/ed567"
    And the user is logged with email "edward@mail.com" and password "@Edward1222"
    And the user with username "clebson" has sent a follow request to "ed567"
    When the user "ed567" opens the follow request list
    And the user "ed567" sees the follow request from "clebson"
    And the user selects "Aceitar"
    Then the user sees the text "Solicitação para seguir aceita"

 
