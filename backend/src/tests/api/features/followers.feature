Feature: Manage Friends/Followers

Scenario: Friend/Follower Management
    Given no user with username "bell28" is followed by "einstein"
    When a POST request is sent to "/follow_user" with current_user_id "einstein", target_user_id "bell28"
    Then the json status code is "200"
    And the json response has message "Agora você está seguindo o usuário"

Scenario: Successfully follow a user with a public profile
    Given the user with username "bell28" has a public profile
    When a POST request is sent to "/follow_user" with current_user_id "einstein", target_user_id "bell28"
    Then the json status code is "200"
    And the json response has message "Agora você está seguindo o usuário"

Scenario: Request to follow a user with a private profile
    Given the user with username "bell28" has a private profile
    When a POST request is sent to "/follow_user" with current_user_id "einstein", target_user_id "bell28"
    Then the json status code is "200"
    And the json response has message "Solicitação para seguir enviada com sucesso"

Scenario: Set profile to Private
    Given the user with username "einstein" has a public profile
    When a POST request is sent to "/set_profile_privacy" with username "einstein", is_private "true"
    Then the json status code is "200"
    And the json response has message "Configurações de privacidade atualizadas"

Scenario: Accept a Follow Request
    Given the user with username "einstein" has a follow request from "bell28"
    When a POST request is sent to "/accept_follow_request" with current_user_id "einstein", requester_user_id "bell28"
    Then the json status code is "200"
    And the json response has message "Solicitação para seguir aceita"

Scenario: Decline a Follow Request
    Given the user with username "einstein" has a follow request from "bell28"
    When a POST request is sent to "/reject_follow_request" with current_user_id "einstein", requester_user_id "bell28"
    Then the json status code is "200"
    And the json response has message "Solicitação para seguir rejeitada"

