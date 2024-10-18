// Este es un programa de pedidos para una restorante de hamburguesas
// el programa puede gestinar pedidos distinguiendo que tipo de hamburgesas son cada una(simples, dobles, triples)
// cuanto tiempo tardaria en prepararlas para el consumidor (8 minutos por hamburguesa) y la demora del envio (15 minutos)


// funcions

function agradecer(){
    if(hamburguesas.length === 1){
        console.log(`Muchas gracias por confiar en nosotros, espero que disfrutes de tu pedido!`)
    }
    else{
        console.log(`Muchas gracias por confiar en nosotros, espero que disfrutes de tus pedidos!`)
    }
}

//arrays

let hamburguesas = []

//objetos

let productos = [
    {
        nombre: "Simple",
        precio: 6000,
        demora: 6
    },
    {
        nombre: "Doble",
        precio: 8000,
        demora: 7
    },
    {
        nombre: "Triple",
        precio: 10000,
        demora: 9
    }
]

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
    do{
        pedido = parseInt(prompt('Que hamburguesas queres?\n' +'1.Simple \n' + '2.Doble \n' + '3.Triple \n'+ '4.Termina pedido'))
        console.log('Que hamburguesas queres?\n' +'1.Simple \n' + '2.Doble \n' + '3.Triple \n'+ '4.Termina pedido')
        if(pedido==1){
            hamburguesas.push(productos[0]);
        }
        else if(pedido==2){
            hamburguesas.push(productos[1]);
        }
        else if(pedido==3){
            hamburguesas.push(productos[2]);;
        }
        else if (pedido > 4){
            console.log('Opcion no valida')
        }
}while (pedido != 4)
    console.log(`Tus hamburguesas son:`)
    for ( let i =0 ; i < hamburguesas.length; i++ ){
        console.log(hamburguesas[i].nombre)
        }
} 

else if (respuestaPrompt == 2){
    console.log("Lo lamento, no tenemos pedidos registrados aun.")} 

else {
    console.log('Opncion no valida')}

let precioTotal = hamburguesas.reduce ((total,hamburguesas) => total + hamburguesas.precio, 0)
console.log (`El precio final de la compra seria $ ${precioTotal}`)

let demoraTotal = hamburguesas.reduce ((demora,hamburguesas) => demora + hamburguesas.demora, 10)
console.log (`La demora total del pedido va a ser de ${demoraTotal} minutos.`)

agradecer()

