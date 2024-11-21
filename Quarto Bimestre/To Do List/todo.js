document.getElementById("btAdicionar").addEventListener("click", function() {

    const tarefa = document.getElementById("tarefa").value;
    const prioridade = document.getElementById("prioridade").value;
    
    if (tarefa == "") {
      alert("E preciso informar uma tarefa a ser registrada");
      return;
    }
    
    const taskItem = document.createElement("tarefaAdd");
    taskItem.textContent = tarefa;
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remover";

    deleteButton.addEventListener("click", function() {
      taskItem.remove();
    });
  
    taskItem.appendChild(deleteButton);
  
    if (prioridade == "bx") {
      document.getElementById("tarefasBaixaPrio").appendChild(taskItem);
    }
    else if (prioridade == "opvz") {
        alert("Escolha uma prioridade para sua tarefa!!");
    } 
    else {
      document.getElementById("tarefasAltaPrio").appendChild(taskItem);
    }
  });