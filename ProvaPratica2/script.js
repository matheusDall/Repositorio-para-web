document.addEventListener("DOMContentLoaded", function(){

    const listaAfazres = document.getElementById("listaTarefas");

    const botaoAdd = document.getElementById("btAdd");

    const botaoTd = document.getElementById("btTodas");
    const botaoPd = document.getElementById("btPendentes");
    const botaoCd = document.getElementById("btConcluidas");

    const entradaTarefa = document.getElementById("entradaTarefa");


    let tarefasPendentes = [];
    let tarefasConluidas = [];

    function adicionarTarefa(){

        if(entradaTarefa.value != ""){

            let estado = "";

            tarefa = entradaTarefa.value.trim();

            const li = document.createElement("button");
            li.setAttribute("estado", "pendente");
            tarefasPendentes.push(li);

            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    
            li.textContent = tarefa;

            li.addEventListener("click", function(){

                li.setAttribute("estado", "concuida");
                tarefasConluidas.push(li);

                li.classList.add("concluida", "list-group-item", "d-flex", "justify-content-between", "align-items-center");
                 
            })
    
            const btnRemover = document.createElement("button");
            btnRemover.classList.add("btn", "btn-danger", "btn-sm");
            btnRemover.textContent = "Remover";
    
            btnRemover.addEventListener("click",  function(){
                listaAfazres.removeChild(li);
                
            });
    
            li.appendChild(btnRemover);
            listaAfazres.appendChild(li);
    
            entradaTarefa.value = "";
        }
        else{
            alert("Informe uma tarefa no campo de digitação")
        }
    }
    botaoAdd.addEventListener("click", adicionarTarefa) 

    function mostrarTodas(){
        atualizarLista("todas")
    }

    function mostrarPendentes(){
        atualizarLista("pendentes")
    }

    function mostrarConcluidas(){
        atualizarLista("concluidas")
    }

    function atualizarLista(filtro){

        if(filtro == "todas"){

            for(let i = 0; i < listaAfazres.children.length; i++){

            }  
        }

        if(filtro == "pendentes"){
            console.log("deu certo tbm")

            for(let i = 0; i < listaAfazres.children.length; i++){
                if(listaAfazres.querySelector('.pendentes')){

                }
            
            }
        }

        if(filtro == "concluidas"){
            console.log("deu certo tbmm")

            if(filtro == "pendentes"){
                console.log("deu certo tbm")

                let concluidas = listaAfazres.querySelector('.concluidas');
    
                for(let i = 0; i < listaAfazres.children.length; i++){
                    if(listaAfazres.querySelector('.concluidas')){
                        console.log(concluidas[i]);

                        


                        
                    }
                
                }
            }
        }
    }

    botaoTd.addEventListener("click", mostrarTodas)
    botaoPd.addEventListener("click", mostrarPendentes)
    botaoCd.addEventListener("click", mostrarConcluidas)

})