function calculeEnvio(num1) {
    if (num1 <= 3) {
        console.log('Tu pedido va a tardar 20 minutos.\nMuchas gracias por pedir con nosotros.');
    } else if (num1 == 4 || num1 == 5) {
        console.log('Tu pedido va a tardar 30 minutos.\nMuchas gracias por pedir con nosotros.');
    } else {
        console.log('Tu pedido va a tardar 45 minutos.\nMuchas gracias por pedir con nosotros.');
    }
}


let respuestaPrompt = parseInt(prompt("Hola, soy Maria, en que puedo ayudarte? \n"+
    "1. Hacer un pedido \n"+
    "2. Preguntar por un pedido"
))
console.log("Hola, soy Maria, en que puedo ayudarte? \n"+
    "1. Hacer un pedido \n"+
    "2. Preguntar por un pedido"
)
console.log(respuestaPrompt)

if (respuestaPrompt==1){

    let pedido = parseInt(prompt ("Cuantas hamburguesa queres pedir?"))

    console.log("Cuantas hamburguesa queres pedir?")
    console.log(pedido)
    console.log('Que hamburguesas queres?\n' +'1.Simple \n' + '2.Doble \n' + '3.Triple ')

    for (let i=1 ; i <= pedido ; i++){
    let hambuerguesa = parseInt(prompt('Que hamburguesas queres?\n' +
        '1.Simple \n' + '2.Doble \n' + '3.Triple '))
    console.log(hambuerguesa)
    }
    calculeEnvio(pedido)
}

else {
    console.log("Lo lamento, no tenemos pedidos registrados aun.")
}





