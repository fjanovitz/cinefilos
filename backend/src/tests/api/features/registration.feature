Feature: User Registration and Management

  Scenario Outline: User Registration Actions
    Given the user with username "<username>" is not registered in the system
    And the phone number "<phone_number>" is not registered in the system
    When a POST request is sent to "/create_user" with the following user details:
      | full_name        | username  | email              | password  | birth_date | phone_number | profile_picture | address            | gender   | pass_token | is_private | followers | following | follow_requests |
      | <full_name>      | <username>| <email>            | <password>| 10/10/10   | <phone_number>| default.jpg    | <address>          | <gender> | string     | false      | []        | []        | []              |
    Then the json status code is "<status_code>"
    And the json response has message "<response_message>"

  Examples:
    | full_name       | username  | email              | password  | birth_date | phone_number | profile_picture | address             | gender    | pass_token     | is_private | followers | following | follow_requests | status_code | response_message               |
    | Albert Einstein | Einstein  | einstein@mail.com  | Vxkhc986  | 10/10/1980 | 33331111     | default.jpg     | Rua dos belos, nº 0 | masculine | default_token  | false      | []        | []        | []              | 200         | Usuário adicionado com sucesso |
    | Albert Einstein | carlosss  |                    | Vxkhc986  | 10/10/1980 | 123456777    | default.jpg     | Rua dos belos, nº 0 | masculine | default_token  | false      | []        | []        | []              | 409         | Email é um campo obrigatório.  |
    | Ed Einstein     | Edttn     | einstein@mail.com  | Bsf4331bb | 10/10/1980 | 333444555    | default.jpg     | Rua dos belos, nº 2 | masculine | default_token  | false      | []        | []        | []              | 409         | Email indisponivel             |
    | Isabel Ferreira | Einstein  | bell28@mail.com    | 55Ahhhhhh | 10/10/1980 | 22114411     | default.jpg     | Rua dos belos, nº 4 | Feminino  | default_token  | false      | []        | []        | []              | 409         | Nome de usuário indisponivel   |
    | Isabel Ferreira | santos33  | santos345@mail.com | H4polopm  | 10/10/1980 | 33331111     | default.jpg     | Rua dos belos, nº 6 | masculine | default_token  | false      | []        | []        | []              | 409         | Número de telefone indisponivel|

  Scenario Outline: User Update Actions
    Given the user with username "<username>" and password "Vxkhc986" is registered in the system
    When a <method> request is sent to "/update_user/<username>" with the following details:
      | field   | new_value        |
      | <field> | <new_value>      |
    Then the json status code is "<status_code>"
    And the json response has message "<response_message>"

  Examples:
    | username  | method | field    | new_value         | status_code | response_message                                                      |
    | einstein  | PUT    | password | abc               | 409         | A senha deve ter pelo menos 8 caracteres, incluindo letras e números. |
    | einstein  | PUT    | address  | Rua da alegria, n | 200         | Usuário atualizado com sucesso                                        |
    | einstein  | PUT    | username | Edttn             | 409         | Nome de usuário indisponivel                                          |

  Scenario Outline: User Delete Actions
    Given the user with username "<username>" and password "Vxkhc986" is registered in the system
    When a DELETE request is sent to "/delete_user/<username>" with the password "<password>"
    Then the json status code is "<status_code>"
    And the json response has message "<response_message>"

    Examples:
      | username  | password  | status_code | response_message                             |
      | einstein  | Vxkhc986  | 200         | Usuário excluído com sucesso                 |
      | Edttn     | Vkkhc986  | 409         | Senha incorreta. A conta não foi deletada.   |