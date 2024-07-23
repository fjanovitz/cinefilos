Feature: Login do usuário comum
    As a usuário não logado
    I want to fazer login com meu email e senha
    So that eu posso acessar minha conta 

Scenario: Login realizado com sucesso
    Given o usuário está na página "login"
    And existe um usuário cadastrado com o email "roca@cin.ufpe.br" e com senha "Senha123"
    When o usuário preenche o campo de "email" com "roca@cin.ufpe.br"
    And o usuário preenche o campo de "password" com "Senha123"
    And o usuário tenta realizar login apertando em "ENTRAR"
    Then o usuário deve ser redirecionado para a página "contents/movies"

Scenario: Tentativa de login com senha incorreta
    Given o usuário está na página "login"
    And existe um usuário cadastrado com o email "roca@cin.ufpe.br" e com senha "Senha123"
    When o usuário preenche o campo de "email" com "roca@cin.ufpe.br"
    And o usuário preenche o campo de "password" com "Fghij765"
    And o usuário tenta realizar login apertando em "ENTRAR"
    Then o usuário permanece na página "login"

Scenario: Tentativa de login com email não cadastrado
    Given o usuário está na página "login"
    And existe um usuário cadastrado com o email "roca@cin.ufpe.br" e com senha "Senha123"
    When o usuário preenche o campo de "email" com "gusta@cin.ufpe.br"
    And o usuário preenche o campo de "password" com "Abcde123"
    And o usuário tenta realizar login apertando em "ENTRAR"
    Then o usuário permanece na página "login"

Scenario: Tentativa de login com senha em branco
    Given o usuário está na página "login"
    And existe um usuário cadastrado com o email "roca@cin.ufpe.br" e com senha "Senha123"
    When o usuário preenche o campo de "email" com "roca@cin.ufpe.br"
    And o usuário não preenche o campo de "password"
    And o usuário tenta realizar login apertando em "ENTRAR"
    Then o usuário permanece na página "login"

