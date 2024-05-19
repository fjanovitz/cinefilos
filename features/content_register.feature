Feature: cadastro de conteúdo
As a um usuário administrador
I want to gerenciar os conteúdos 
So that eu possa cadastrar um novo conteúdo

Scenario: cadastrar filme sem título
    Given o usuário administrador "tiago" está na página "conteúdos"
    When o usuário seleciona "cadastrar novo filme"
    Then o usuário está na página “cadastro de novo filme”
    When preenche os dados de "título" com ""
    And preenche os dados de "sinopse" com "Um filme aterrorizante"
    And preenche os dados de "ano" com "2024"
    And preenche os dados de "gênero" com "terror"
    And preenche os dados de "duração" com "125"
    And preenche os dados de “elenco principal” com “Rodrigo Hilbert, Madonna, Xuxa”
    And preenche os dados de “banner” com “filme_sem_titulo.png”
    And seleciona “Netflix, Amazon” no campo de “disponível para assistir em”
    And o usuário seleciona "confirmar"
    Then aparece uma mensagem de erro 
    And o usuário está na página “cadastro de novo filme”

Scenario: cadastrar filme corretamente 
    Given o usuário administrador "tiago" está na página "conteúdos"
    And o usuário não visualiza conteúdo cadastrado com título "A Múmia" na aba “filmes”
    When o usuário seleciona "cadastrar novo filme"
    Then o usuário está na página “cadastro de novo filme”
    When preenche os dados de "título" com "A Múmia"
    And preenche os dados de "ano" com "2024"
    And preenche os dados de "gênero" com "terror"
    And preenche os dados de "duração" com "125"
    And preenche os dados de “elenco principal” com “Rodrigo Hilbert, Madonna, Xuxa”
    And preenche os dados de “banner” com “a_mumia.png”
    And seleciona “Netflix, Amazon” no campo de “disponível para assistir em”
    And o administrador seleciona "confirmar"
    Then aparece uma mensagem dizendo "Conteúdo cadastrado com sucesso"
    And o usuário está na página "conteúdos"
    And o usuário visualiza conteúdo cadastrado com título "A Múmia" na aba “filmes”

Scenario: cadastrar filme com mesmo nome 
    Given o usuário administrador "tiago" está na página "conteúdos"
    And o usuário visualiza conteúdo cadastrado com título "Jurassic Park" na aba “filmes”
    When o usuário seleciona "cadastrar novo filme"
    Then o usuário está na página “cadastro de nova série”
    When preenche os dados de "título" com "Jurassic Park"
    And preenche os dados de "ano" com "2024"
    And preenche os dados de "gênero" com "terror"
    And preenche os dados de "duração" com "125"
    And preenche os dados de “elenco principal” com “Rodrigo Hilbert, Madonna, Xuxa”
    And preenche os dados de “banner” com “jurassic_park.png”
    And seleciona “Netflix, Amazon” no campo de “disponível para assistir em”
    And o administrador seleciona "confirmar"
    Then aparece uma mensagem de erro
    And o usuário está na página “cadastro de novo filme”
