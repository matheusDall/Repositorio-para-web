const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'aluno',
  password: 'aluno',
  database: 'BD_ToDoList'

});

connection.connect(function(err) {
  if (err) {
      console.error('error connecting: ' + err.stack);
      return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.connect(function(err, ){
  if(err) console.error('Erro ao realizar a conxeão com BD:', + err.stack); return;
})



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

    connection.query("INSERT INTO tarefas(tarefa, prioridade) VALUES ('tarefaAdd', 'txtPrioridade')", function(err, result){
      if(!err){
          window.alert('Usuário cadastrado com sucesso!');
      }else{
          window('Erro ao cadastrar usuario!');
      }
    }); 


});