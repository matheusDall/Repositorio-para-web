const API_HOST = 'http://localhost:8080';

async function criarTarefa(tarefa) {
    const response = await fetch(`${API_HOST}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    });

    const novaTarefa = await response.json();
    return novaTarefa;
}

