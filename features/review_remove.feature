Feature: remoção de uma avaliação existente
As a um usuário comum logado
I want to gerenciar minhas avaliações 
So that eu possa remover uma avaliação existente

Scenario: remoção bem sucedida de uma avaliação para um filme
Given o usuário comum "Paul McCartney" está na página "Histórico de reviews e posts"
do usuário "Paul McCartney"
And o usuário visualiza a avaliação criada sobre o conteúdo "filme" "Interstellar" 
And a avaliação tem o dado de "título" preenchido com "Melhor filme da história" 
And a avaliação tem o dado de "nota" preenchido com "10"
And a avaliação tem o dado de "crítica" preenchido com "Sem palavras para esse filme, espetacular."
When o usuário "Paul McCartney" seleciona "remover review" 
do conteúdo com dado "título" "Interstellar" 
Then aparece uma mensagem de sucesso referente a remoção da avaliação
And o usuário não visualiza a avaliação do conteúdo "filme" "Interstellar" com título "Melhor filme da história"

Scenario: remoção bem sucedida de uma avaliação para uma série
Given o usuário comum "Paul McCartney" está na página "Histórico de reviews e posts"
do usuário "Paul McCartney"
And o usuário visualiza a avaliação criada sobre o conteúdo "série" "The Big Bang Theory" 
And a avaliação tem o dado de "título" preenchido com "Melhor série da história" 
And a avaliação tem o dado de "nota" preenchido com "10"
And a avaliação tem o dado de "crítica" preenchido com "Jim Parsons é gênio."
When o usuário "Paul McCartney" seleciona "remover review" 
do conteúdo com dado "título" "The Big Bang Theory"
Then aparece uma mensagem de sucesso referente a remoção da avaliação
And o usuário não visualiza a avaliação do conteúdo "série" "The Big Bang Theory" com título "Melhor série da história"