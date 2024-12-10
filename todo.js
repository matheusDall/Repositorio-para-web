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





  // arquivo original do Json
  
// {
//   "name": "to-do-list-com-sqlite",
//   "version": "1.0.0",
//   "description": "",
//   "main": "todo.js",
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "dependencies": {
//     "e": "^0.2.33",
//     "install": "^0.13.0",
//     "npm": "^10.9.2",
//     "sqlite": "^5.1.1",
//     "sqlite3": "^5.1.7"
//   }
// }