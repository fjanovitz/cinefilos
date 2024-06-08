Feature: cadastro de conteúdo
As a um usuário administrador
I want to gerenciar os conteúdos 
So that eu possa cadastrar um novo conteúdo

Scenario: cadastrar filme sem título
    Given o usuário administrador "tiago" está na página "conteúdos"
    When o usuário seleciona "cadastrar novo filme"
    Then o usuário está na página "cadastro de novo filme"
    When preenche os dados de "título" com ""
    And preenche os dados de "sinopse" com "Um filme aterrorizante"
    And preenche os dados de "ano" com "2024"
    And preenche os dados de "gênero" com "terror"
    And preenche os dados de "duração" com "125"
    And preenche os dados de "elenco principal" com "Rodrigo Hilbert, Madonna, Xuxa"
    And preenche os dados de "banner" com "filme_sem_titulo.png"
    And seleciona "Netflix, Amazon" no campo de "disponível para assistir em"
    And o usuário seleciona "confirmar"
    Then aparece uma mensagem de erro 
    And o usuário está na página "cadastro de novo filme"

Scenario: cadastrar série sem título
    Given o usuário administrador "tiago" está na página "conteúdos"
    When o usuário seleciona "cadastrar nova série"
    Then o usuário está na página "cadastro de nova série"
    When preenche os dados de "título" com ""
    And preenche os dados de "sinopse" com "Um série aterrorizante"
    And preenche os dados de "ano" com "2024"
    And preenche os dados de "gênero" com "terror"
    And preenche os dados de "número de temporadas" com "1"
    And preenche os dados de "número de episódios" com "15"
    And preenche os dados de "elenco principal" com "Rodrigo Hilbert, Madonna, Xuxa"
    And preenche os dados de "banner" com "serie_sem_titulo.png"
    And seleciona "Netflix, Amazon" no campo de "disponível para assistir em"
    And o usuário seleciona "confirmar"
    Then aparece uma mensagem de erro 
    And o usuário está na página "cadastro de nova série"

Scenario: cadastrar filme corretamente 
    Given o usuário administrador "tiago" está na página "conteúdos"
    And o usuário não visualiza conteúdo cadastrado com título "A Múmia" na aba "filmes"
    When o usuário seleciona "cadastrar novo filme"
    Then o usuário está na página "cadastro de novo filme"
    When preenche os dados de "título" com "A Múmia"
    And preenche os dados de "ano" com "2024"
    And preenche os dados de "gênero" com "terror"
    And preenche os dados de "duração" com "125"
    And preenche os dados de "elenco principal" com "Rodrigo Hilbert, Madonna, Xuxa"
    And preenche os dados de "banner" com "a_mumia.png"
    And seleciona "Netflix, Amazon" no campo de "disponível para assistir em"
    And o administrador seleciona "confirmar"
    Then aparece uma mensagem dizendo "Conteúdo cadastrado com sucesso"
    And o usuário está na página "conteúdos"
    And o usuário visualiza conteúdo cadastrado com título "A Múmia" na aba "filmes"

Scenario: cadastrar série corretamente 
    Given o usuário administrador "tiago" está na página "conteúdos"
    And o usuário não visualiza conteúdo cadastrado com título "A Múmia" na aba "séries"
    When o usuário seleciona "cadastrar nova série"
    Then o usuário está na página "cadastro de nova série"
    When preenche os dados de "título" com "A Múmia"
    And preenche os dados de "ano" com "2024"
    And preenche os dados de "gênero" com "terror"
    And preenche os dados de "número de temporadas" com "1"
    And preenche os dados de "número de episódios" com "15"
    And preenche os dados de "elenco principal" com "Rodrigo Hilbert, Madonna, Xuxa"
    And preenche os dados de "banner" com "a_mumia.png"
    And seleciona "Netflix, Amazon" no campo de "disponível para assistir em"
    And o administrador seleciona "confirmar"
    Then aparece uma mensagem dizendo "Conteúdo cadastrado com sucesso"
    And o usuário está na página "conteúdos"
    And o usuário visualiza conteúdo cadastrado com título "A Múmia" na aba "séries"

Scenario: cadastrar filme com mesmo nome 
    Given o usuário administrador "tiago" está na página "conteúdos"
    And o usuário visualiza conteúdo cadastrado com título "Jurassic Park" na aba "filmes"
    When o usuário seleciona "cadastrar novo filme"
    Then o usuário está na página "cadastro de nova série"
    When preenche os dados de "título" com "Jurassic Park"
    And preenche os dados de "ano" com "2024"
    And preenche os dados de "gênero" com "terror"
    And preenche os dados de "duração" com "125"
    And preenche os dados de "elenco principal" com "Rodrigo Hilbert, Madonna, Xuxa"
    And preenche os dados de "banner" com "jurassic_park.png"
    And seleciona "Netflix, Amazon" no campo de "disponível para assistir em"
    And o administrador seleciona "confirmar"
    Then aparece uma mensagem de erro
    And o usuário está na página "cadastro de novo filme"

Scenario: cadastrar série com mesmo nome 
    Given o usuário administrador "tiago" está na página "conteúdos"
    And o usuário visualiza conteúdo cadastrado com título "Seinfield" na aba "séries"
    When o usuário seleciona "cadastrar nova série"
    And preenche os dados de "título" com "Seinfield"
    And preenche os dados de "ano" com "2024"
    And preenche os dados de "gênero" com "terror"
    And preenche os dados de "número de temporadas" com "1"
    And preenche os dados de "número de episódios" com "15"
    And preenche os dados de "elenco principal" com "Rodrigo Hilbert, Madonna, Xuxa"
    And preenche os dados de "banner" com "seinfield.png"
    And seleciona "Netflix, Amazon" no campo de "disponível para assistir em"
    And o administrador seleciona "confirmar"
    Then aparece uma mensagem de erro
    And o usuário está na página "cadastro de nova série"

Scenario: cadastrar filme no sistema corretamente
Given não existe filme com título "O Poderoso Chefão" cadastrado no sistema
When é criado novo filme com título "O Poderoso Chefão"
And com dados de "ano" com "2024"
And com dados de "gênero" com "terror"
And com dados de "duração" com "125"
And com dados de "duração" com "125"
And com dados de "elenco principal" com "Rodrigo Hilbert, Madonna, Xuxa"
And com dados de "banner" com "o_poderoso_chefao.png"
Then o conteúdo "O Poderoso Chefão" é apropriadamente salvo no sistema

Scenario: cadastrar série no sistema corretamente
Given não existe série com título "Suits" cadastrado no sistema
When é criado uma série com título "Suits"
And com dados de "ano" com "2024"
And com dados de "gênero" com "drama"
And com dados de "duração" com "125"
And com dados de "número de temporadas" com "1"
And com dados de "número de episódios" com "15"
And com dados de "elenco principal" com "Rodrigo Hilbert, Madonna, Xuxa"
And com dados de "banner" com "suits.png"
Then o conteúdo "Suits" é apropriadamente salvo no sistema