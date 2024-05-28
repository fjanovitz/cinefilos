Feature: Recuperação de conta via E-mail / Esqueci a senha do usuário comum
As a usuário do sistema
I want to alterar a minha senha
So that eu possa escolher a nova senha

GUI Scenario
Scenario: Redefinição de senha realizada com sucesso
Given o usuário do sistema não está logado com nenhuma conta
And existe um usuário cadastrado com o e-mail “roca@cin.ufpe.br” e senha “Abcde123”
And o usuário encontra-se na página “Redefinição de senha”
When o campo de e-mail é preenchido com “roca@cin.ufpe.br”
And o usuário escolhe “Enviar código”
Then um e-mail é enviado para “roca@cin.ufpe.br” com o código “1234”
When o campo de código é preenchido com “1234”
And o campo de nova senha é preenchido com “Fghij765”
And o usuário escolhe “Alterar senha”
Then aparece uma mensagem de redefinição de senha realizada com sucesso
And o usuário encontra-se na página “Fazer login”

GUI Scenario
Scenario: Tentativa de redefinição de senha com e-mail em branco
Given o usuário do sistema não está logado com nenhuma conta
And existe um usuário cadastrado com o e-mail “roca@cin.ufpe.br” e senha “Abcde123”
And o usuário encontra-se na página “Redefinição de senha”
When o campo de e-mail é preenchido com “”
And o usuário escolhe “Enviar código”
Then aparece uma mensagem solicitando o fornecimento do e-mail
And o usuário permanece na página “Redefinição de senha”

GUI Scenario
Scenario: Tentativa de redefinição de senha com e-mail não cadastrado
Given o usuário do sistema não está logado com nenhuma conta
And não existe um usuário cadastrado com o e-mail “roca@cin.ufpe.br”
And o usuário encontra-se na página “Redefinição de senha”
When o campo de e-mail é preenchido com roca@cin.ufpe.br
And o usuário escolhe “Enviar código”
Then o usuário permanece na página “Redefinição de senha”
..