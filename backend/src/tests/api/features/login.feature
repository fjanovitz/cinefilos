Feature: Login API

	Scenario: Login realizado com sucesso
		Given existe um usuário cadastrado com email "roca@cin.ufpe.br", com senha "Roca1234" e username "roca"
		When uma requisição POST é enviada para "/users/login" com os dados "roca@cin.ufpe.br", "Roca1234" e "roca"
		Then o status do JSON é "200"
		

	Scenario: Login fracassou, pois a senha está incorreta
		Given existe um usuário cadastrado com email "roca@cin.ufpe.br", com senha "Roca1234" e username "roca"
		When uma requisição POST é enviada para "/users/login" com os dados "roca@cin.ufpe.br", "Roca123456" e "roca"
		Then o status do JSON é "401"

	Scenario: Login fracassou, pois o email não está cadastrado
		Given não existe um usuário cadastrado com email "roca@cin.ufpe.br", com senha "Roca1234" e username "roca"
		When uma requisição POST é enviada para "/users/login" com os dados "roca@cin.ufpe.br", "Roca1234" e "roca"
		Then o status do JSON é "401"

