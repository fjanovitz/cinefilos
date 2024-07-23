Feature: Registration and Maintenance of users
  As a regular user
  I want to create, delete and edit my account
  So that I can manage my account

Scenario: Successful User Registration
    Given the user joins the page "/register"
    And the user does not visualize content registered with username "Einstein" and phone number "123456777"
    When the user fills with "full_name" with "Albert Einstein"
    And the user fills with "username" with "Einstein"
    And the user fills with "email" with "einstein@mail.com"
    And the user fills with "password" with "Vxkhc986"
    And the user fills with "birth_date" with "1980-01-01"
    And the user fills with "phone_number" with "33331111"
    And the user fills with "gender" with "masculine"
    And the user fills with "address" with "Rua dos belos, nº 0"
    When the user press "Cadastrar"
    Then the user sees the text "Usuário adicionado com sucesso"

Scenario: User Registration Without Email
    Given the user joins the page "/register"
    And the user does not visualize content registered with username "Einstein" and phone number "123456777"
    When the user fills the data "full_name" with "Albert Einstein"
    And the user fills the data "username" with "Einstein"
    And the user leaves the data "email" empty
    And the user fills the data "password" with "Vxkhc986"
    And the user fills the data "phone_number" with "123456777"
    And the user fills the data "gender" with "masculine"
    And the user fills the data "address" with "Rua dos belos, nº 0"
    When the user press "Cadastrar"
    Then the user visualizes the text "Preencha os campos obrigatórios."

Scenario: Email Unavailable
    Given the user joins the page "/register"
    And the user does not visualize content registered with username "Edttn" and phone number "333444555"
    When the user fills the data "full_name" with "Ed Einstein"
    And the user fills the data "username" with "Edttn"
    And the user fills the data "email" with "einstein44@mail.com"
    And the user fills the data "password" with "Bsf4331bb"
    And the user fills the data "phone_number" with "333444555"
    And the user fills the data "gender" with "masculine"
    And the user fills with "birth_date" with "1980-01-01"
    And the user fills the data "address" with "Rua dos belos, nº 2"
    When the user press "Cadastrar"
    Then the user visualizes the text "Dados de cadastro já existem."

Scenario: Username Unavailable
    Given the user joins the page "/register"
    And the user does not visualize content registered with username "Einstein" and phone number "22114411"
    When the user fills the data "full_name" with "Isabel Ferreira"
    And the user fills the data "username" with "Carlos33"
    And the user fills the data "email" with "bell28@mail.com"
    And the user fills the data "password" with "55Ahhhhhh"
    And the user fills the data "phone_number" with "22114411"
    And the user fills the data "gender" with "Feminino"
    And the user fills with "birth_date" with "1980-01-01"
    And the user fills the data "address" with "Rua dos belos, nº 4"
    When the user press "Cadastrar"
    Then the user visualizes the text "Dados de cadastro já existem."

Scenario: Phone Number Unavailable
    Given the user joins the page "/register"
    And the user does not visualize content registered with username "santos33" and phone number "33331111"
    When the user fills the data "full_name" with "Isabel Ferreira"
    And the user fills the data "username" with "santos33"
    And the user fills the data "email" with "santos345@mail.com"
    And the user fills the data "password" with "H4polopm"
    And the user fills the data "phone_number" with "333311115"
    And the user fills the data "gender" with "masculine"
    And the user fills with "birth_date" with "1980-01-01"
    And the user fills the data "address" with "Rua dos belos, nº 6"
    When the user press "Cadastrar"
    Then the user visualizes the text "Dados de cadastro já existem."

Scenario: Password Update Mismatch
    Given the user enters the page "/user/reset_password/Carlos33"
    And the user is logged in with email "jcso@gmail.com" and password "Clebson123"
    When the user fills the data "current_password" with "Clebson123"
    And the user fills the data "new_password" with "Bjkhc986"
    And the user fills the data "repeat_password" with "Bjkhc9865"
    And the user selects "Alterar Senha"
    Then the user sees the text "As senhas não coincidem."

Scenario: Password Update Requirements Not Met
    Given the user enters the page "/user/reset_password/Carlos33"
    And the user is logged in with email "jcso@gmail.com" and password "Clebson123"
    When the user fills the data "current_password" with "Clebson123"
    And the user fills the data "new_password" with "abc"
    And the user fills the data "repeat_password" with "abc"
    And the user selects "Alterar Senha"
    Then the user sees the text "A senha deve ter pelo menos 8 caracteres, incluindo letras e números."

Scenario: Successful User Update
    Given the user visits the page "/user/edit_user_info/Carlos33"
    And the user is logged in with email "jcso@gmail.com" and password "Clebson123"
    When the user fills the data "address" with "Rua da alegria, nº 3"
    And the user selects "Atualizar Informações"
    Then the user sees the text "Usuário atualizado com sucesso"

Scenario: Username Update Unavailable
    Given the user visits the page "/user/edit_user_info/Carlos33"
    And the user is logged in with email "jcso@gmail.com" and password "Clebson123"
    When the user fills the data "username" with "clebson"
    And the user selects "Atualizar Informações"
    Then the user visualizes the text "Ocorreu um erro ao atualizar o usuário."

Scenario: Successful User Deletion
    Given the user visits the page "/user/delete_account/Carlos33"
    And the user is logged in with email "jcso@gmail.com" and password "Clebson123"
    When the user fills the data "password" with "Clebson123"
    And the user selects "Excluir conta"
    Then the user visualizes the text "Usuário excluído com sucesso"

Scenario: User Deletion With Incorrect Password
    Given the user visits the page "/user/delete_account/Carlos33"
    And the user is logged in with email "jcso@gmail.com" and password "Clebson123"
    When the user fills the data "password" with "SenhaErrada"
    And the user selects "Excluir conta"
    Then the user visualizes the text "Senha incorreta. A conta não foi deletada."




