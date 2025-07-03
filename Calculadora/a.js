const tela = document.getElementById("tela");
let formula = "";

function calcular(elemento){
    if (elemento == "=" || elemento == "enter") {
        try {
            formula = eval(formula).toString();
            tela.value = formula;
            
        } catch (error) {
            tela.value = "Erro de logica";
            formula = "";
        }} 
        
    else{

    formula += elemento;
    tela.value = formula;
    }
}

function apagar(){

  formula = formula.slice(0, -1);
  document.getElementById("tela").value = formula;
}
