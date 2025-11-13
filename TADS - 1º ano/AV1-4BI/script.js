let i = 1;
let registros = [];
let idEdit = null; 

function renderizarTabela() {
  const tabela = document.querySelector("#tabela-registro tbody");
  tabela.innerHTML = "";

  // fetch('URL_DA_API/recurso', {
  //   .then(res => res.json())
  //   .then(data => {
  //     registros = data; // Atualiza o array com os dados recebidos
  //     console.log("Dados carregados da API:", data);
  //   })
  //   .catch(err => console.error("Erro ao buscar transações:", err));

  registros.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.descricao}</td>
      <td>${t.valor.toFixed(2)}</td>
      <td class="${t.tipo}">${t.tipo}</td>
      <td>${t.data}</td>
      <td>
        <button onclick="editarTransacao(${t.id})">Editar</button>
        <button onclick="excluirTransacao(${t.id})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

function adicionarTransacao(e) {
  e.preventDefault(); 

  // recebe os dados do formulário
  const descricao = document.querySelector("#descricao").value.trim();
  const valor = parseFloat(document.querySelector("#valor").value);
  const tipo = document.querySelector("#tipo").value;
  const data = document.querySelector("#data").value;

  // Verifica se está em modo de edição
  if (idEdit !== null) {
    salvarEdicao();
    return;
  }

  const novaTransacao = {
    id: i,
    descricao,
    valor,
    tipo,
    data
  };

  i++; 

  registros.push(novaTransacao);

  // fetch('URL_DA_API/recurso', {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(novaTransacao)
  // })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log("Transação criada na API:", data);
  //   })
  //   .catch(err => console.error("Erro ao criar transação:", err));

  renderizarTabela();
}

function editarTransacao(id) {
  const transacao = registros.find(t => t.id === id);
  if (!transacao) return;

  idEdit = id; // recebe o ID da transação a ser editada
}

// Função UPDATE — salva as alterações
function salvarEdicao() {
  const descricao = document.querySelector("#descricao").value.trim();
  const valor = parseFloat(document.querySelector("#valor").value);
  const tipo = document.querySelector("#tipo").value;
  const data = document.querySelector("#data").value;

  const index = registros.findIndex(t => t.id === idEdit);

  if (index !== -1) {
    registros[index] = { id: idEdit, descricao, valor, tipo, data };

    // fetch('URL_DA_API/recurso', {
    //   method: "PUT", // ou "PATCH"
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(registros[index])
    // })
    //   .then(res => res.json())
    //   .then(data => console.log("Transação atualizada na API:", data))
    //   .catch(err => console.error("Erro ao atualizar transação:", err));

    document.querySelector("#btnSalvar").textContent = "Salvar";
    idEdit = null;

    renderizarTabela();
  }
}

function excluirTransacao(id) {
    //filter remove um elemento
    registros = registros.filter(t => t.id !== id);
  
    // Simulação da chamada DELETE para API
    // fetch('URL_DA_API/recurso', {
    //   method: "DELETE"
    // })
    //   .then(res => {
    //     if (res.ok) console.log(`Transação ${id} excluída da API`);
    //     else console.error("Erro ao excluir transação na API");
    //   })
    //   .catch(err => console.error("Erro na exclusão:", err));
  
    renderizarTabela();
}
  
document.querySelector("#form-transacao").addEventListener("submit", adicionarTransacao);

document.addEventListener("DOMContentLoaded", renderizarTabela);