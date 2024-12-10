#!/bin/bash
# " ./NomeDoArquivo "  -> para rodar 


docker build -t git-container .

docker run -it git-container

git init 

git config --global user.name "matheusDall"

git config --global user.email "matheus.dalmasomariano@gmail.com"

git clone https://github.com/matheusDall/Repositorio-para-o-TCC

ls

git status

cd Repositorio-para-o-TCC

mkdir testandDenovo

cd testandDenovo

touch miau.txt

ls

git add .

git commit -m "commit do teste"

git branch

push orgin main