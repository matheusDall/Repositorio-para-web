  let tarefas = [];

  let filtroAtual = 'todas';

  function salvarTarefas() { //por meio do uso de JSON, salva uma tarefa 
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); //define um item com o nome "tarefas" e adiciona um atributo associado a ela, no caso uma tarefa
  }

  function carregarTarefas() {
    const armazenadas = localStorage.getItem('tarefas'); //resgata o item associado ao localStorage definido como tarefa 
    if (armazenadas) tarefas = JSON.parse(armazenadas);
    atualizarLista();
  }

  function adicionarTarefa() { //adiciona a tarefa criada para a lista de tarefas pendentes
    const entrada = document.getElementById('entradaTarefa');
    const texto = entrada.value.trim();
    if (!texto) return; //se a entrada de texto estiver vazia, retorna um vazio e nao cria uma tarefa
    tarefas.push({ texto, concluida: false }); // cria uma nova tarefa com o elemento "concluida" definido como falso
    salvarTarefas();
    atualizarLista();
    entrada.value = '';
    entrada.focus();
  }

  function exibirTarefa(tarefa, indice) { //exibe uma nova tarefa criada
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center fade-in';
    li.setAttribute('data-id', indice);
    li.style.backgroundColor = 'hsl(0, 77.70%, 38.60%)';

    const span = document.createElement('span');
    span.textContent = tarefa.texto;
    span.style.cursor = 'pointer';
    if (tarefa.concluida) span.classList.add('concluida'), li.style.backgroundColor = 'hsl(119, 45.80%, 46.30%)';
      

    span.onclick = () => { //define a tarefa como concluida ao clicar no texto da tarefa, alem de salvar e atualizar as listas de concluidas
      tarefas[indice].concluida = !tarefas[indice].concluida;
      salvarTarefas();
      atualizarLista();
    };

    span.ondblclick = () => {
      const input = document.createElement('input');
      input.className = 'editando';
      input.value = tarefa.texto;

      input.onblur = () => {
        const novoTexto = input.value.trim();
        if (novoTexto !== '') {
          tarefas[indice].texto = novoTexto;
          salvarTarefas();
          atualizarLista();
        }
      };

      input.onkeypress = (e) => {
        if (e.key === 'Enter') input.blur(); //define que clicar no enter tambem cria a tarefa
      };

      li.replaceChild(input, span);
      input.focus();
    };

    const botaoRemover = document.createElement('button');
    botaoRemover.className = 'btn btn-danger btn-sm';
    botaoRemover.textContent = 'Remover';
    botaoRemover.onclick = () => {
      li.classList.add('fade-out');
      setTimeout(() => {
        tarefas.splice(indice, 1);
        salvarTarefas();
        atualizarLista();
      }, 300);
    };

    li.appendChild(span);
    li.appendChild(botaoRemover);
    document.getElementById('listaTarefas').appendChild(li);
  }

  function atualizarLista() { //se chamada após uma adição ou alteração for feita nas terefas, atualiza as listas para adicionar as alteraçoes feitas de apagar, concluida ou pendente
    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = '';

    document.querySelectorAll('.filtros .btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.filtros .btn[onclick*="${filtroAtual}"]`).classList.add('active');

    tarefas.forEach((tarefa, indice) => {
      const mostrar =
        filtroAtual === 'todas' ||
        (filtroAtual === 'pendentes' && !tarefa.concluida) ||
        (filtroAtual === 'concluidas' && tarefa.concluida);
      if (mostrar) exibirTarefa(tarefa, indice);
    });

    // Reativar drag and drop após renderização
    Sortable.create(lista, {
      animation: 150,
      onEnd: function (evt) {
        const [moved] = tarefas.splice(evt.oldIndex, 1);
        tarefas.splice(evt.newIndex, 0, moved);
        salvarTarefas();
        atualizarLista();
      }
    });
  }

  function limparConcluidas() { 
    tarefas = tarefas.filter(tarefa => !tarefa.concluida); //remove todas as terefas salvas com a propriedade de concluida ativa
    salvarTarefas();
    atualizarLista();
  }

  document.getElementById('entradaTarefa').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') adicionarTarefa();
  });

  window.onload = carregarTarefas; //ao executar o codigo, carrega as tarefas salvas