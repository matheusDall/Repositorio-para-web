// Função para carregar as tarefas do banco de dados
async function carregarTarefas() {
  try {
    const SQL = await initSqlJs({
      locateFile: file => `https://cdn.jsdelivr.net/npm/sql.js@1.6.1/dist/${file}`
    });

    // Obter o banco de dados do localStorage (se existir)
    const dbFile = localStorage.getItem('tarefas_db');
    const db = dbFile ? new SQL.Database(new Uint8Array(JSON.parse(dbFile))) : new SQL.Database();

    // Recuperar todas as tarefas do banco de dados
    const result = db.exec("SELECT * FROM tarefas");

    // Limpar as divs antes de adicionar as tarefas
    document.getElementById("tarefasBaixaPrio").innerHTML = '';
    document.getElementById("tarefasAltaPrio").innerHTML = '';

    // Adicionar as tarefas ao DOM de acordo com a prioridade
    result.forEach(row => {
      row.values.forEach(value => {
        const tarefaTexto = value[1];  // O texto da tarefa
        const prioridade = value[2];   // A prioridade (baixa ou alta)

        // Criar a div principal para a tarefa e botão de remoção
        const divContainer = document.createElement("div");
        divContainer.id = "containerDiv"; 

        const tarefaAdd = document.createElement("div");
        tarefaAdd.textContent = tarefaTexto;

        // Criar o botão de remoção
        const concluirTar = document.createElement("button");
        concluirTar.textContent = "Remover";
        concluirTar.id = "btRemove";

        // Adicionar a funcionalidade de remoção
        concluirTar.addEventListener("click", function() {
          // Remover a tarefa do banco de dados
          removerTarefaDoBanco(value[0], db); // Passando o ID da tarefa para remover
          divContainer.remove();
        });

        divContainer.appendChild(tarefaAdd);
        divContainer.appendChild(concluirTar);

        // Adicionar a tarefa à div correta, conforme a prioridade
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

// Função para adicionar a tarefa no banco de dados
async function criarEPopularTabelaUsuarios(tarefaTexto, prioridade) {
  try {
    const SQL = await initSqlJs({
      locateFile: file => `https://cdn.jsdelivr.net/npm/sql.js@1.6.1/dist/${file}`
    });

    // Obter ou criar o banco de dados
    const dbFile = localStorage.getItem('tarefas_db');
    const db = dbFile ? new SQL.Database(new Uint8Array(JSON.parse(dbFile))) : new SQL.Database();

    // Criar a tabela, se não existir
    db.run(`CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY, Tarefa TEXT, Prioridade TEXT)`);

    // Inserir os dados no banco de dados
    db.run(`INSERT INTO tarefas (Tarefa, Prioridade) VALUES (?,?)`, [tarefaTexto, prioridade]);

    // Armazenar o banco de dados no localStorage
    localStorage.setItem('tarefas_db', JSON.stringify(Array.from(db.export())));

  } catch (error) {
    console.error("Erro ao inserir tarefa no banco:", error);
  }
}

// Função para remover a tarefa do banco de dados
async function removerTarefaDoBanco(idTarefa, db) {
  try {
    db.run("DELETE FROM tarefas WHERE id = ?", [idTarefa]);

    // Atualiza o banco de dados no localStorage após a remoção
    localStorage.setItem('tarefas_db', JSON.stringify(Array.from(db.export())));
  } catch (error) {
    console.error("Erro ao remover tarefa do banco:", error);
  }
}

// Função que será chamada ao carregar a página
window.addEventListener('load', () => {
  carregarTarefas();  // Carregar as tarefas quando a página for carregada
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

  // Função de remoção da tarefa
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
