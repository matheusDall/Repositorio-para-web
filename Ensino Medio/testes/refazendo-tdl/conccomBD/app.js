const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Configuração do servidor para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Inicializar o banco de dados SQLite
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados', err);
    } else {
        console.log('Banco de dados SQLite conectado');
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            priority TEXT,
            completed BOOLEAN
        )`);
    }
});

// Rota para obter todas as tarefas
app.get('/tasks', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ tasks: rows });
    });
});

// Rota para adicionar uma tarefa
app.post('/tasks', (req, res) => {
    const { name, priority } = req.body;
    const sql = `INSERT INTO tasks (name, priority, completed) VALUES (?, ?, ?)`;
    const params = [name, priority, false];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            name,
            priority,
            completed: false
        });
    });
});

// Rota para completar uma tarefa
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = `UPDATE tasks SET completed = TRUE WHERE id = ?`;

    db.run(sql, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Tarefa completada' });
    });
});

// Rota para remover uma tarefa
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM tasks WHERE id = ?`;

    db.run(sql, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Tarefa removida' });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
