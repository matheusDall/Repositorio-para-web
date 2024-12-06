document.getElementById("btAdicionar").addEventListener("click", function() {

    const tarefa = document.getElementById("tarefa").value;
    const prioridade = document.getElementById("prioridade").value;
    
    if (tarefa == "") {
      alert("E preciso informar uma tarefa a ser registrada");
      return;
    }
    
    const tarefaAdd = document.createElement("tarefaAdd");
    tarefaAdd.textContent = tarefa;
  
    const concluirTar = document.createElement("button");
    concluirTar.textContent = "Remover";

    concluirTar.addEventListener("click", function() {
      tarefaAdd.remove();
    });
  
    tarefaAdd.appendChild(concluirTar);
  
    if (prioridade == "bx") {
      document.getElementById("tarefasBaixaPrio").appendChild(tarefaAdd);
    }
    else if (prioridade == "opvz") {
        alert("Escolha uma prioridade para sua tarefa!!");
    } 
    else {
      document.getElementById("tarefasAltaPrio").appendChild(tarefaAdd);
    }
  });