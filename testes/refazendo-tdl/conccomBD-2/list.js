async function adicionarTarefa() {
    try {
      const dataSqlite = await initSqlJs({
        locateFile: file => `https://cdn.jsdelivr.net/npm/list.js@1.6.1/dist/${file}`
      });
  
      const dbFile = localStorage.getItem('tarefas_db');
      const db = dbFile ? new dataSqlite.Database(new Uint8Array(JSON.parse(dbFile))) : new dataSqlite.Database();
      const result = db.exec("SELECT * FROM tarefas");
  
      document.getElementById("tarefasBaixaPrio").innerHTML = '';
      document.getElementById("tarefasAltaPrio").innerHTML = '';
  
      result.forEach(row => {
        row.values.forEach(value => {
          const tarefaTexto = value[1]; 
          const prioridade = value[2];   
  
          const divContainer = document.createElement("div");
          divContainer.id = "containerDiv"; 
  
          const tarefaAdd = document.createElement("div");
          tarefaAdd.textContent = tarefaTexto;
  
          const concluirTar = document.createElement("button");
          concluirTar.textContent = "Remover";
          concluirTar.id = "btRemove";
  
          concluirTar.addEventListener("click", function() {
            
            removerTarefaDoBanco(value[0], db); 
            divContainer.remove();
          });
  
          divContainer.appendChild(tarefaAdd);
          divContainer.appendChild(concluirTar);
  
          if (prioridade === "baixa") {
            document.getElementById("tarefasBaixaPrio").appendChild(divContainer);
          } else if (prioridade === "alta") {
            document.getElementById("tarefasAltaPrio").appendChild(divContainer);
          }
        });
      });
    } catch (error) {
      console.error("Erro ao carregar as tarefas:", error);
    }
  }
  
function adicionarTarefa(event) {
    event.preventDefault(); // Evita o envio do formulário

    const nomeTarefa = document.getElementById("task-name").value;
    const prioridadeTarefa = document.getElementById("priority").value;

    if (nomeTarefa) {
        const listaTarefas = document.getElementById("tasks");
        const tarefaAdd = document.createElement("li");

        // Adicionar o nome da tarefa e a prioridade
        tarefaAdd.textContent = `${nomeTarefa} - Prioridade: ${prioridadeTarefa}`;
        tarefaAdd.classList.add(`priority-${prioridadeTarefa.toLowerCase()}`);

        // Botão de completar tarefa
        const completarBtn = document.createElement("button");
        completarBtn.textContent = "Completar";
        completarBtn.classList.add("complete");
        completarBtn.addEventListener("click", function() {
            tarefaAdd.classList.add("completa"); // Adiciona estilo de tarefa concluída
            completarBtn.disabled = true;  // Desabilita o botão de completar
            removerBtn.disabled = true;  // Desabilita o botão de remover
        });

        // Botão de remover tarefa
        const removerBtn = document.createElement("button");
        removerBtn.textContent = "Remover";
        removerBtn.classList.add("cancel");
        removerBtn.addEventListener("click", function() {
            tarefaAdd.remove();
        });

        // Adicionar os botões à tarefa
        tarefaAdd.appendChild(completarBtn);
        tarefaAdd.appendChild(removerBtn);

        // Adicionar a tarefa à lista
        listaTarefas.appendChild(tarefaAdd);

        // Limpar o campo de texto
        document.getElementById("task-name").value = '';
    }
}

// Carregar as funcionalidades ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    const formTarefa = document.getElementById("task-form");
    formTarefa.addEventListener("submit", adicionarTarefa);  // Adiciona a tarefa ao submeter o formulário
});




//----------------meu codigo--------------------//



async function adicionarTarefa() {
    try {
      const dataSqlite = await initSqlJs({
        locateFile: file => `https://cdn.jsdelivr.net/npm/list.js@1.6.1/dist/${file}`
      });
  
      const dbFile = localStorage.getItem('tarefas_db');
      const db = dbFile ? new dataSqlite.Database(new Uint8Array(JSON.parse(dbFile))) : new SQL.Database();
      const result = db.exec("SELECT * FROM tarefas");
  
      document.getElementById("tarefasBaixaPrio").innerHTML = '';
      document.getElementById("tarefasAltaPrio").innerHTML = '';
  
      result.forEach(row => {
        row.values.forEach(value => {
          const tarefaTexto = value[1]; 
          const prioridade = value[2];   
  
          const divContainer = document.createElement("div");
          divContainer.id = "containerDiv"; 
  
          const tarefaAdd = document.createElement("div");
          tarefaAdd.textContent = tarefaTexto;
  
          const concluirTar = document.createElement("button");
          concluirTar.textContent = "Remover";
          concluirTar.id = "btRemove";
  
          concluirTar.addEventListener("click", function() {
            
            removerTarefaDoBanco(value[0], db); 
            divContainer.remove();
          });
  
          divContainer.appendChild(tarefaAdd);
          divContainer.appendChild(concluirTar);
  
          if (prioridade === "baixa") {
            document.getElementById("tarefasBaixaPrio").appendChild(divContainer);
          } else if (prioridade === "alta") {
            document.getElementById("tarefasAltaPrio").appendChild(divContainer);
          }
        });
      });
    } catch (error) {
      console.error("Erro ao carregar as tarefas:", error);
    }
  }
  async function criarEPopularTabelaUsuarios(tarefaTexto, prioridade) {
    try {
      const dataSqlite = await initSqlJs({
        locateFile: file => `https://cdn.jsdelivr.net/npm/list.js@1.6.1/dist/${file}`
      });
  
      const dbFile = localStorage.getItem('tarefas_db');
      const db = dbFile ? new dataSqlite.Database(new Uint8Array(JSON.parse(dbFile))) : new dataSqlite.Database();
  
      db.run(`CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY, Tarefa TEXT, Prioridade TEXT)`);
  
      db.run(`INSERT INTO tarefas (Tarefa, Prioridade) VALUES (?,?)`, [tarefaTexto, prioridade]);
  
      localStorage.setItem('tarefas_db', JSON.stringify(Array.from(db.export())));
  
    } catch (error) {
      console.error("Erro ao inserir tarefa no banco:", error);
    }
  }
  async function removerTarefaDoBanco(idTarefa, db) {
    try {
      db.run("DELETE FROM tarefas WHERE id = ?", [idTarefa]);
  
      localStorage.setItem('tarefas_db', JSON.stringify(Array.from(db.export())));
    } catch (error) {
      console.error("Erro ao remover tarefa do banco:", error);
    }
  }
  
  window.addEventListener('load', () => {
    carregarTarefas();  
  });
  
  document.getElementById("btAdicionar").addEventListener("click", function() {
    const tarefa = document.getElementById("tarefa").value;
    const prioridade = document.getElementById("prioridade").value;
  
    if (tarefa == "") {
      alert("É preciso informar uma tarefa a ser registrada");
      return;
    }
  
    const tarefaAdd = document.createElement("div");
    tarefaAdd.textContent = tarefa;
  
    const concluirTar = document.createElement("button");
    concluirTar.textContent = "Remover";
    
    concluirTar.addEventListener("click", function() {
      tarefaAdd.remove();
    });
  
    tarefaAdd.appendChild(concluirTar);
  
    if (prioridade == "bx") {
      document.getElementById("tarefasBaixaPrio").appendChild(tarefaAdd);
      criarEPopularTabelaUsuarios(tarefa, "baixa");
    } 
    else if (prioridade == "opvz") {
      alert("Escolha uma prioridade para sua tarefa!!");
    } 
    else {
      document.getElementById("tarefasAltaPrio").appendChild(tarefaAdd);
      criarEPopularTabelaUsuarios(tarefa, "alta");
    }
  });