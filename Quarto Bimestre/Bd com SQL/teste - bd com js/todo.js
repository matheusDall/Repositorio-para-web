import createConnection  from 'mysql';

const connection = createConnection({
  host: '127.0.0.1',  // Ou o host onde seu banco de dados está
  user: 'aluno',       // Usuário do banco
  password: 'aluno', // Senha do banco
  database: 'BD_ToDoList', // Nome do banco de dados
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.stack);
    return;
  }
  console.log('Conexão bem-sucedida com o MySQL');
});

document.getElementById("btAdicionar").addEventListener("click", function() {

    const tarefa = document.getElementById("tarefa").value;
    const prioridade = document.getElementById("prioridade").value;
    const txtPrioridade = "";
    
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
      const txtPrioridade = "baixa";
      document.getElementById("tarefasBaixaPrio").appendChild(tarefaAdd);
    }
    else if (prioridade == "opvz") {
      
      alert("Escolha uma prioridade para sua tarefa!!");
    } 
    else {
      const txtPrioridade = "alta";
      document.getElementById("tarefasAltaPrio").appendChild(tarefaAdd);
    }
    const query = 'INSERT INTO tarefas (tarefa, prioridade) VALUES (?, ?, ?)';

    connection.query(query, [tarefaAdd, txtPrioridade], (err, results) => {
      if (err) {
        console.error('Erro ao inserir os dados:', err.stack);
        return;
      }
      console.log('Dados inseridos com sucesso!', results);
    });

connection.end();
});