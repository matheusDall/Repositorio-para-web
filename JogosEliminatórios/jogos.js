let clubes = [];

const inClube = document.getElementById("inClube");
const outLista = document.getElementById("outLista");
const btAdicionar = document.getElementById("btAdicionar");
const btListar = document.getElementById("btListar");
const btMontar = document.getElementById("btMontar");

function adicionarClube(){

    const nome = inClube.value.trim();

    if(!nome){
        alert("Informe o nome do clube");
        inClube.focus();
        return;
    }

    clubes.push(nome);

    inClube.value = "";
    inClube.focus();
}

function listarclubes(){

    if(clubes.length === 0){  // === verifica valor e tipo de dado
        alert("Antes disso deve-se adicionar 2 clubes no minimo");
        inClube.focus();
        return;
    }

    const lista = clubes
        .map((clube,i)=> `${i + 1}.${clube}`)
        .join("\n")

        inClube.focus();

    outLista.textContent = lista
}   

function montarJogos(){

    let jogo;
    let fim = [];

    if(clubes.length % 2 != 0){
        alert("A quantidade de clubes é impar, adicione mais um");
        inClube.focus; //focus manda o cursor direto para um campo de entrada
        return;
    }

    tam = clubes.length

    const jogos = clubes
        .slice(0, tam/2)
        .map((clube, i) => `${clube} X ${clubes[tam -1 -i]}`)
        .join("\n")

    outLista.textContent = jogos;

    // inicio = clubes.slice(0, clubes.length/2)

    // fim = clubes.slice(clubes.length/2, clubes.length)


}

btAdicionar.addEventListener("click", adicionarClube);
btListar.addEventListener("click", listarclubes);
btMontar.addEventListener("click", montarJogos);