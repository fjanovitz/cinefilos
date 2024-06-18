Feature: Recuperacao API

    Scenario: Solicitação bem sucedida de recuperação de conta
        Given existe um usuário cadastrado com email "roca@cin.ufpe.br"
        When uma requisição POST é enviada para "/users/recover-account" com o dado "roca@cin.ufpe.br"
        Then o status do JSON é "200"

    Scenario: Solicitação mal sucedida de recuperação de conta
        Given não existe um usuário cadastrado com email "roca@cin.ufpe.br"
        When uma requisição POST é enviada para "/users/recover-account" com o dado "roca@cin.ufpe.br"
        Then o status do JSON é "404"

    Scenario: Tentativa bem sucedida de recuperação de conta
        Given existe um usuário cadastrado com email "roca@cin.ufpe.br" e token "2c640f9e-aa60-4364-8c9c-2e7044262a00"
        When uma requisição POST é enviada para "/users/reset-password" com os dados "roca@cin.ufpe.br", "2c640f9e-aa60-4364-8c9c-2e7044262a00" e nova senha "Roberto1812"
        Then o status do JSON é "200"
    
    Scenario: Tentativa mal sucedida de recuperação de conta devido ao token incorreto
        Given não existe um usuário cadastrado com email "roca@cin.ufpe.br" e token "2c640f9e-aa60-4364-8c9c-2e7044262a00"
        When uma requisição POST é enviada para "/users/reset-password" com os dados "roca@cin.ufpe.br", "86da351b-8b4a-4a3c-8ae8-402ea783892b" e nova senha "Roberto1812"
        Then o status do JSON é "400"

    Scenario: Tentativa mal sucedida de recuperação de conta devido à senha fora dos padrões exigidos
        Given existe um usuário cadastrado com email "roca@cin.ufpe.br" e token "2c640f9e-aa60-4364-8c9c-2e7044262a00"
        When uma requisição POST é enviada para "/users/reset-password" com os dados "roca@cin.ufpe.br", "2c640f9e-aa60-4364-8c9c-2e7044262a00" e nova senha "roberto"
        Then o status do JSON é "400"