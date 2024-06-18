Feature: Manage Friends/Followers

Scenario: Manage Follow Actions
    Given the user with email "<current_user_email>" and password "Vxkhc986" is registered in the system
    And the user with email "<target_user_email>" has a profile set to "<profile_status>"
    When a POST request is sent to "/follow_actions" with current_user_id "<current_user_email>", target_user_id "<target_user_email>", action "<action>"
    Then the json status code is "<status_code>"
    And the json response has message "<response_message>"

    Examples:
    | current_user_email | target_user_email | profile_status | action   | status_code | response_message                            |
    | einstein@mail.com  | bell28@mail.com   | public         | follow   | 200         | Agora você está seguindo o usuário          |
    | einstein@mail.com  | bell28@mail.com   | public         | unfollow | 200         | Você deixou de seguir o usuário             |
    | einstein@mail.com  | bell28@mail.com   | private        | follow   | 200         | Solicitação para seguir enviada com sucesso |
    | einstein@mail.com  | bell28@mail.com   | private        | unfollow | 409         | Você não está seguindo este usuário         |

Scenario: Set Profile Privacy
    Given the user with email "einstein@mail.com" and password "Vxkhc986" is registered in the system
    And the user's profile is set to "<current_privacy_status>"
    When a POST request is sent to "/set_profile_privacy" with username "einstein@mail.com", is_private "<new_privacy_status>"
    Then the json status code is "200"
    And the json response has message "Configurações de privacidade atualizadas"

    Examples:
    | current_privacy_status | new_privacy_status |
    | Public                 | true               |
    | Private                | false              |

Scenario: Handle Follow Requests
    Given the user with email "<current_user_email>" is registered in the system
    And the user with email "<requester_user_email>" has sent a follow request
    And the profile of the user with email "<current_user_email>" is set to "private"
    When a POST request is sent to "/handle_follow_request" with current_user_id "<current_user_email>", requester_user_id "<requester_user_email>", action "<action>"
    Then the json status code is "200"
    And the json response has message "<response_message>"
