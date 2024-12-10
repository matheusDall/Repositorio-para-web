async function buscarEndereco() {
    const cep = document.getElementById("cep").value;
    
  
    if (!cep || cep.length !== 8 || isNaN(cep)) {
      document.getElementById("endereco").innerText = "Tal CEP é inválido!!";
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

    
      if (data.erro) {
        document.getElementById("endereco").innerText = "CEP não indentificado, verifique se a digita]ao esta correta";
      } else {
        document.getElementById("endereco").innerText = 
          `Seu pedido será enviado para o seguinte endereço: ${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
      }
    } catch (error) {
      document.getElementById("endereco").innerText = "Erro ao buscar o CEP. Tente novamente.";
    }
  }