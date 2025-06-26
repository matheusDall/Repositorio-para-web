function mudarTexto(){

    const novoTexto = document.getElementById("nome").value;
    document.getElementById("message").innerText = novoTexto;
}
function mudarEstilo(){

    const p = document.getElementById("message");

    p.style.color = "blue";
    p.style.fontSize = "12px"
}
