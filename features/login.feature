Feature: Login do usuário comum
As a usuário do sistema
I want to entrar no sistema com meu e-mail e senha
So that eu possa acessar as funcionalidades do sistema que são acessíveis somente após o login

GUI Scenario
Scenario: Login realizado com sucesso
Given o usuário do sistema não está logado com nenhuma conta
And existe um usuário cadastrado com o e-mail “roca@cin.ufpe.br” e senha “Abcde123”
And o usuário está na página “Fazer login”
When o usuário preenche o campo de e-mail com “roca@cin.ufpe.br”
And o usuário preenche o campo de senha com “Abcde123”
And o usuário escolhe “Entrar”
Then o usuário é encaminhado para a página de início do sistema

GUI Scenario
Scenario: Tentativa de login com e-mail não cadastrado
Given o usuário do sistema não está logado com nenhuma conta
And não existe um usuário cadastrado com o e-mail “roca@cin.ufpe.br”
And o usuário está na página “Fazer login”
When o usuário preenche o campo de e-mail com “roca@cin.ufpe.br”
And o usuário preenche o campo de senha com “Abcde123”
And o usuário escolhe “Entrar”
Then aparece uma mensagem de falha no login

GUI Scenario
Scenario: Tentativa de login com senha incorreta
Given o usuário do sistema não está logado com nenhuma conta
And existe um usuário cadastrado com o e-mail “roca@cin.ufpe.br” e senha “Abcde123”
And o usuário está na página “Fazer login”
When o usuário preenche o campo de e-mail com “roca@cin.ufpe.br”
And o usuário preenche o campo de senha com “Fghij765”
And o usuário escolhe “Entrar”
Then aparece uma mensagem de falha no login
And o usuário permanece na página “Fazer login”

GUI Scenario
Scenario: Tentativa de login com senha em branco
Given o usuário do sistema não está logado com nenhuma conta
And existe um usuário cadastrado com o e-mail “roca@cin.ufpe.br” e senha “Abcde123”
And o usuário está na página “Fazer login”
When o usuário preenche o campo de e-mail com “roca@cin.ufpe.br”
And o usuário preenche o campo de senha com “”
Then o usuário não consegue escolher “Entrar”
And o usuário permanece na página “Fazer login”


Service Scenario 
Scenario:  Login realizado com sucesso
Given o sistema tem o usuário cadastrado com e-mail “roca@cin.ufpe.br” e senha “Abcde123”
When o campo de email é preenchido com “roca@cin.ufpe.br”
And o campo da senha é preenchido com “Abcde123”
Then o sistema encontra o cadastro
And o sistema libera o acesso à página de início do programa
.

Service Scenario 
Scenario: Tentativa de login com e-mail não cadastrado
Given o sistema não possui o e-mail “roca@cin.ufpe.br” cadastrado
When o campo de email é preenchido com “roca@cin.ufpe.br”
And o campo da senha é preenchido com “Abcde123”
Then o sistema não encontra o cadastro
And o sistema recusa o acesso à página de início do programa
.

