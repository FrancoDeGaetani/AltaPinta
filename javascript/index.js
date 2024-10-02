// Este es un programa de pedidos para una restorante de hamburguesas
// el programa puede gestinar pedidos distinguiendo que tipo de hamburgesas son cada una(simples, dobles, triples)
// cuanto tiempo tardaria en prepararlas para el consumidor (8 minutos por hamburguesa) y la demora del envio (15 minutos)



// esta funcion sirve para calcular la demora de los pedidos en ser preparados y en ser enviados al consumidor
function calculeEnvio(num1) {
    let envio = num1 * 8 + 15
    return envio
}

//Este prompt sirve para saber que quiere hacer el cliente
let respuestaPrompt = parseInt(prompt("Hola, soy Maria, en que puedo ayudarte? \n"+
    "1. Hacer un pedido \n"+
    "2. Preguntar por un pedido"
))

console.log("Hola, soy Maria, en que puedo ayudarte? \n"+
    "1. Hacer un pedido \n"+
    "2. Preguntar por un pedido"
)
console.log(respuestaPrompt)

// En este bucle se pregunta las veces que el cliente quiera que hamburguesas quiere,
// luego se guardan esos datos dentro de la variables para luego devolver que hamburguesa pidio el cliente (simples, dobles o triples), 
// ademas de guardar el numero total de hamburguesas dentrop del pedido.
// Si el cliente se equivoca y preciona otra opcion q no sea del 1 al 4 le notificara su error, pero este no se contara dentro de los pedidos.
if (respuestaPrompt==1){ 
    let pedido
    let numeroDeHamburguesas = 0
    let simple = 0
    let doble = 0
    let triple = 0
    do{
        pedido = parseInt(prompt('Que hamburguesas queres?\n' +'1.Simple \n' + '2.Doble \n' + '3.Triple \n'+ '4.Termina pedido'))
        console.log('Que hamburguesas queres?\n' +'1.Simple \n' + '2.Doble \n' + '3.Triple \n'+ '4.Termina pedido')
        if(pedido==1||pedido==2||pedido==3){
            numeroDeHamburguesas++;
        }
        if(pedido==1){
            simple++;
        }
        else if(pedido==2){
            doble++;
        }
        else if(pedido==3){
            triple++;
        }
        else if (pedido > 4){
            console.log('Opcion no valida')
        }
}while (pedido != 4)
    console.log("El numero total de hamburguesas en el pedido es de:",numeroDeHamburguesas+ '\nSimples: '+ simple + '\nDobles: '+doble + '\nTriples: '+ triple + '\ny va a tardar alrededor de ' +  calculeEnvio(numeroDeHamburguesas) + ' minutos en llegar el pedido a tu casa. \nMuchas gracias por pedir con nosotros.');
} 

else if (respuestaPrompt == 2){
    console.log("Lo lamento, no tenemos pedidos registrados aun.")} 

else {
    console.log('Opncion no valida')}
