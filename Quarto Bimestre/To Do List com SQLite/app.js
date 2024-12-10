import sqlite3 from "sqlite3";
import { open } from "sqlite";

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
      criarEPopularTabelaUsuarios(tarefaAdd, "baixa");
    }
    else if (prioridade == "opvz") {
        alert("Escolha uma prioridade para sua tarefa!!");
    } 
    else {
      document.getElementById("tarefasAltaPrio").appendChild(tarefaAdd);
      criarEPopularTabelaUsuarios(tarefaAdd, "alta");
    }
  });


async function criarEPopularTabelaUsuarios(tarefa, prioridade) {
  const db = await open({
    filename: "./banco.db",
    driver: sqlite3.Database,
  });
  db.run(
    `CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY, Tarefa TEXT, Prioridade TEXT)`
  );
  db.run(`INSERT INTO tarefas (Tarefa, Prioridade) VALUES (?,?)`, [
    tarefa,
    prioridade,
  ]);
}

