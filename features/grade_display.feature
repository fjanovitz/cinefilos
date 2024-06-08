Feature: mostrar as notas de um conteúdo
As a um usuário comum
I want to acessar um conteúdo 
So that eu possa ver as notas dadas ao conteúdo

Scenario: mostrar as notas de um filme
Given o usuário comum "Paul McCartney" está na página de "conteúdos"
And o usuário visualiza o conteúdo cadastrado com o título "Interstellar" na aba "filmes"
When o usuário "Paul McCartney" seleciona "visualizar avaliações"
do conteúdo com dado "título" "Interstellar" 
Then aparece um dado "nota média" preenchido com "9.8"
And um gráfico mostrando a distribuição dos campos "notas"

Scenario: mostrar as notas de uma série
Given o usuário comum "Paul McCartney" está na página de "conteúdos"
And o usuário visualiza o conteúdo cadastrado com o título "The Big Bang Theory" na aba "séries"
When o usuário "Paul McCartney" seleciona "visualizar avaliações" 
do conteúdo com dado "título" "The Big Bang Theory"
Then aparece um dado "nota média" preenchido com "9.7"
And um gráfico mostrando a distribuição dos campos "notas"