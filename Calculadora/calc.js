// funçao "eval()" transforma String em equaçao matematica ---usar

let formula = "";

function calcular(elemento){

    if(elemento != "enter"){
    
        formula += elemento
    }

    if(elemento == "enter"){

        console.log(eval(formula));

    
    }
}