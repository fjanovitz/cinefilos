Feature: Friend/Follower Management

  Scenario: User follows another user
    Given the user opens the page "/user/get_user/Carlos33"
    And the user is logged with email "jcso@gmail.com" and password "Clebson123"
    When the user does not see a followed user with username "bell28"
    And the user enters the username "bell28" in the follow field
    And the user clicks the follow button
    Then the user should see the success message "Agora você está seguindo o usuário"
