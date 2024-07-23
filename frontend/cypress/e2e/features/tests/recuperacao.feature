Feature: Esqueci a senha do usuário comum
    As a usuário não logado
    I want to alterar a minha senha
    So that eu possa escolher a nova senha
 			
Scenario: Solicitação bem sucedida de recuperação de conta
    Given o usuário está na página "recover-account"
    And existe um usuário cadastrado com o email "roca@cin.ufpe.br" e com senha "Senha123"
    When o usuário preenche o campo de "email" com "roca@cin.ufpe.br"
    And o usuário escolhe "ENVIAR CÓDIGO"
    Then a mensagem "Recovery email sent successfully." é exibida na tela
    And o usuário permanece na página "recover-account"

Scenario: Solicitação mal sucedida de recuperação de conta
    Given o usuário está na página "recover-account"
    And existe um usuário cadastrado com o email "roca@cin.ufpe.br" e com senha "Senha123"
    When o usuário preenche o campo de "email" com "gusta@cin.ufpe.br"
    And o usuário escolhe "ENVIAR CÓDIGO"
    Then a mensagem "Error sending recovery email." é exibida na tela
    And o usuário permanece na página "recover-account"

Scenario: Tentativa mal sucedida de recuperação de conta devido ao token incorreto
    Given o usuário está na página "recover-account"
    And existe um usuário cadastrado com o email "roca@cin.ufpe.br" e com token "2c640f9e-aa60-4364-8c9c-2e7044262a00"
    When o usuário preenche o campo de "email" com "roca@cin.ufpe.br"
    And o usuário escolhe "ENVIAR CÓDIGO"
    And o usuário preenche o campo de "email" com "roca@cin.ufpe.br", "2c640f9e-aa60-4364-8c9c-2e7044262a00" e nova senha "Roberto1812"
    And o usuário escolhe "RESETAR SENHA"
    Then a mensagem "Error resetting password." é exibida na tela
    And o usuário permanece na página "recover-account"
    
    
    