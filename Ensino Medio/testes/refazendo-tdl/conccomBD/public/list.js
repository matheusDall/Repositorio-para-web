document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-name');
    const prioritySelect = document.getElementById('priority');
    const taskList = document.getElementById('tasks');

    // Carregar tarefas do localStorage (se houver)
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
        tasks.forEach(task => {
            addTaskToList(task.name, task.priority);
        });
    } else {
        tasks = [];
    }

    // Função para adicionar tarefa à lista
    function addTaskToList(taskName, priority) {
        const taskItem = document.createElement('li');
        
        // Adicionar a classe de prioridade à tarefa
        switch(priority) {
            case 'alta':
                taskItem.classList.add('priority-alta');
                break;
            case 'media':
                taskItem.classList.add('priority-media');
                break;
            case 'baixa':
                taskItem.classList.add('priority-baixa');
                break;
        }

        const taskText = document.createElement('span');
        taskText.textContent = taskName;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', function() {
            taskItem.remove();
            removeTaskFromStorage(taskName);  // Remove a tarefa do armazenamento
        });

        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }

    // Adicionar nova tarefa ao clicar no botão
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const taskName = taskInput.value.trim();
        const priority = prioritySelect.value;

        if (taskName) {
            tasks.push({ name: taskName, priority: priority });
            localStorage.setItem('tasks', JSON.stringify(tasks));  // Salvar no localStorage

            addTaskToList(taskName, priority);

            taskInput.value = ''; // Limpar campo de entrada
        } else {
            alert('Por favor, insira o nome da tarefa.');
        }
    });

    // Função para remover tarefa do armazenamento
    function removeTaskFromStorage(taskName) {
        tasks = tasks.filter(task => task.name !== taskName);
        localStorage.setItem('tasks', JSON.stringify(tasks));  // Atualizar o localStorage
    }
});
