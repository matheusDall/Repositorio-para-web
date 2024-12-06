// server.js
import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000; // Ou qualquer outra porta de sua preferência

// Habilitar CORS para permitir requisições do frontend
app.use(cors());
app.use(bodyParser.json());  // Para processar o corpo das requisições em JSON

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',   // O host onde seu MySQL está rodando (127.0.0.1 é o localhost)
  user: 'aluno',        // Seu usuário MySQL
  password: 'aluno',    // Sua senha MySQL
  database: 'BD_ToDoList', // Nome do banco de dados que você está usando
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.stack);
    return;
  }
  console.log('Conexão bem-sucedida com o MySQL');
});

// Rota para adicionar tarefas
app.post('/add-tarefa', (req, res) => {
  const { tarefa, prioridade } = req.body;
  
  if (!tarefa || !prioridade) {
    return res.status(400).json({ error: 'Tarefa e prioridade são obrigatórias.' });
  }

  const query = 'INSERT INTO tarefas (tarefa, prioridade) VALUES (?, ?)';
  connection.query(query, [tarefa, prioridade], (err, results) => {
    if (err) {
      console.error('Erro ao inserir dados:', err.stack);
      return res.status(500).json({ error: 'Erro ao inserir dados.' });
    }
    console.log('Resultado da inserção:', results);
    res.status(200).json({ message: 'Dados inseridos com sucesso!' });
  });  
});


// Iniciar o servidor na porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
