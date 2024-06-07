Feature: mostrar as avaliações de um conteúdo
As a um usuário comum
I want to acessar um conteúdo 
So that eu possa ver as avaliações existente

Scenario: mostrar uma avaliação para um filme
Given o usuário comum "Paul McCartney" está na página de "conteúdos"
And o usuário visualiza o conteúdo cadastrado com o título "Interstellar" na aba "filmes"
And existe uma avaliação com dado "título" preenchido "Melhor filme da história"
And dado "nota" preenchido com "9.8"
And dado "crítica" preenchido com "Espetacular."
When o usuário "Paul McCartney" seleciona "visualizar avaliações" 
do conteúdo com dado "título" "Interstellar"
Then aparece uma avaliação com dado "título" preenchido "Melhor filme da história"
And dado "nota" preenchido com "9.8"
And dado "crítica" preenchido com "Espetacular."

Scenario: mostrar uma avaliação para uma série
Given o usuário comum "Paul McCartney" está na página de "conteúdos"
And o usuário visualiza o conteúdo cadastrado com o título "The Big Bang Theory" na aba "séries"
And existe uma avaliação com dado "título" preenchido "Melhor série da história"
And dado "nota" preenchido com "9.5"
And dado "crítica" preenchido com "Espetacular."
When o usuário "Paul McCartney" seleciona "visualizar avaliações" 
do conteúdo com dado "título" "The Big Bang Theory"
Then aparece uma avaliação com dado "título" preenchido "Melhor série da história"
And dado "nota" preenchido com "9.5"
And dado "crítica" preenchido com "Espetacular."