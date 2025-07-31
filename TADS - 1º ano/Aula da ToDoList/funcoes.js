document.addEventListener("DOMContentLoaded", function(){

    const listaAfazres = document.getElementById("listaTarefas");

    const botaoAdd = document.getElementById("btAdd");

    const entradaTarefa = document.getElementById("entradaTarefa");

        function adicionar(){

            if(entradaTarefa.value != ""){

                tarefa = entradaTarefa.value.trim();
    
                const li = document.createElement("li");
                li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        
                li.textContent = tarefa;
        
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
        botaoAdd.addEventListener("click", adicionar) 
})