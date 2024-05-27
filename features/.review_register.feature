Feature: criação de uma nova avaliação
As a um usuário comum logado
I want to gerenciar minhas avaliações 
So that eu possa criar uma nova avaliação

Scenario: criação bem sucedida de uma avaliação para um filme
Given o usuário comum "Paul McCartney" está na página de "conteúdos"
And o usuário visualiza o conteúdo cadastrado com o dado "título" "Interstellar" na aba "filmes"
When o usuário "Paul McCartney" seleciona "adicionar uma nova review" do conteúdo com dado "título" "Interstellar"
And preenche os dados de "título" com "Melhor filme da história"
And preenche os dados de "nota" com "10"
And preenche os dados de "crítica" com "Sem palavras para esse filme, espetacular."
And seleciona "publicar avaliação"
Then aparece uma mensagem de sucesso
And o usuário visualiza a avaliação cadastrada com campo "título" preenchido com "Melhor filme da história"

Scenario: criação mal sucedida de uma avaliação para um filme faltando crítica
Given o usuário comum "Paul McCartney" está na página de "conteúdos"
And o usuário visualiza o conteúdo cadastrado com o título "Interstellar" na aba "filmes"
When o usuário "Paul McCartney" seleciona "adicionar uma nova review" do conteúdo com dado "título" "Interstellar"
And preenche os dados de "título" com "Melhor filme da história"
And preenche os dados de "nota" com "10"
And preenche os dados de "crítica" com ""
And seleciona "publicar avaliação"
Then aparece uma mensagem de erro 
And o usuario esta na pagina de "conteúdos" 

Scenario: criação bem sucedida de uma avaliação para um filme sem título
Given o usuário comum "Paul McCartney" está na página de "conteúdos"
And o usuário visualiza o conteúdo cadastrado com o dado "título"
"Interstellar" na aba "filmes"
When o usuário "Paul McCartney" seleciona "adicionar uma nova review" 
do conteúdo com dado "título" "Interstellar"
And preenche os dados de "título" com ""
And preenche os dados de "nota" com "10"
And preenche os dados de "crítica" com "Sem palavras para esse filme, espetacular."
And seleciona "publicar avaliação"
Then aparece uma mensagem de sucesso 
And o usuário visualiza a avaliação cadastrada com campo "título"
preenchido com ""

Scenario: criação mal sucedida de uma avaliação para um filme faltando nota
Given o usuário comum "Paul McCartney" está na página de "conteúdos"
And o usuário visualiza o conteúdo cadastrado com o título "Interstellar" na aba "filmes"
When o usuário "Paul McCartney" seleciona "adicionar uma nova review"
do conteúdo com dado "título" "Interstellar" 
And preenche os dados de "título" com "Melhor filme da história"
And preenche os dados de "nota" com ""
And preenche os dados de "crítica" com "Sem palavras para esse filme, espetacular."
And seleciona "publicar avaliação"
Then aparece uma mensagem de erro para o usuario
And o usuario esta na pagina de "conteudos"

Scenario: criação bem sucedida de uma avaliação para uma serie sem título
Given o usuário comum "Paul McCartney" está na página de "conteúdos"
And o usuário visualiza o conteúdo cadastrado com o dado "título"
"The Big Bang Theory" na aba "series"
When o usuário "Paul McCartney" seleciona "adicionar uma nova review" 
do conteúdo com dado "título" "The Big Bang Theory"
And preenche os dados de "título" com ""
And preenche os dados de "nota" com "10"
And preenche os dados de "crítica" com "Sensacional."
And seleciona "publicar avaliação"
Then aparece uma mensagem de sucesso 
And o usuário visualiza a avaliação cadastrada com campo "título"
preenchido com ""

Scenario: criação mal sucedida de uma avaliação para uma serie faltando nota
Given o usuário comum "Paul McCartney" está na página de "conteúdos"
And o usuário visualiza o conteúdo cadastrado com o título "The Big Bang Theory" na aba "series"
When o usuário "Paul McCartney" seleciona "adicionar uma nova review"
do conteúdo com dado "título" "The Big Bang Theory" 
And preenche os dados de "título" com "Melhor serie da história"
And preenche os dados de "nota" com ""
And preenche os dados de "crítica" com "Sem palavras para esse serie, espetacular."
And seleciona "publicar avaliação"
Then aparece uma mensagem de erro para o usuario
And o usuario esta na pagina de "conteudos"
