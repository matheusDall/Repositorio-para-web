// server.js
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';  // O CORS continua necessário

const app = express();
const port = 3000; // Ou qualquer outra porta de sua preferência

// Habilitar CORS para permitir requisições do frontend
app.use(cors());
// Middleware para processar o corpo das requisições em JSON
app.use(express.json());  // Substituindo body-parser por express.json()

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
  
  // Logs para verificar os dados recebidos
  console.log('Dados recebidos:', req.body); // Verifica o que está sendo enviado no corpo da requisição
  
  if (!tarefa || !prioridade) {
    return res.status(400).json({ error: 'Tarefa e prioridade são obrigatórias.' });
  }

  const query = 'INSERT INTO tarefas (tarefa, prioridade) VALUES (?, ?)';
  
  // Log para verificar a consulta antes de executar
  console.log('Consultando banco de dados com os dados:', [tarefa, prioridade]);

  connection.query(query, [tarefa, prioridade], (err, results) => {
    if (err) {
      console.error('Erro ao inserir dados no MySQL:', err);  // Log mais detalhado do erro
      return res.status(500).json({ error: 'Erro ao inserir dados no banco de dados.' });
    }
    console.log('Resultado da inserção:', results);  // Log do resultado da query
    res.status(200).json({ message: 'Dados inseridos com sucesso!' });
  });  
});

// Iniciar o servidor na porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
