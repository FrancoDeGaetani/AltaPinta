//Este programa que sirve para administrar los pedidos de un local de hamburguesas online.
//pidiendo un nombre y una direccion obligatoriamente, sino el pedido no se podra hacer
//guardandolos dentro del localstorage 

// Hamburguesas del Local (productos)
let productos = [
    {
        id: 1,
        nombre: "Bacon King Carne",
        carne: "vacuna",
        tipo:"doble",
        precio:7000,
        imgUrl:"../assets/img/hamburguesas/bacon-king-carne.png",
    },
    {
        id: 2,
        nombre: "Cheese Onion",
        carne: "vacuna",
        tipo:"doble",
        precio:6000,
        imgUrl:"../assets/img/hamburguesas/Cheese-Onion.png",
    },
    {
        id: 3,
        nombre: "Doble Jamon y Queso",
        carne: "vacuna",
        tipo:"doble",
        precio:6500,
        imgUrl:"../assets/img/hamburguesas/Doble-Jamon-y-Queso.png",
    },
    {
        id: 4,
        nombre: "Hamburguesa Clasica",
        carne: "vacuna",
        tipo:"simple",
        precio:4000,
        imgUrl:"../assets/img/hamburguesas/Hamburguesa-clásica.png",
    },
    {
        id: 5,
        nombre: "Melt Con Salsa Stacker",
        carne: "vacuna",
        tipo:"doble",
        precio:6250,
        imgUrl:"../assets/img/hamburguesas/Melt-con-Salsa-Stacker.png",
    },
    {
        id: 6,
        nombre: "Stacker Doble",
        carne: "vacuna",
        tipo:"doble",
        precio:7000,
        imgUrl:"../assets/img/hamburguesas/Stacker-Doble.png",
    },
    {
        id: 7,
        nombre: "Stacker Triple",
        carne: "vacuna",
        tipo:"triple",
        precio:8500,
        imgUrl:"../assets/img/hamburguesas/Stacker-Triple.png",
    },
    {
        id: 8,
        nombre: "Stacker Cuadruple",
        carne: "vacuna",
        tipo:"cuadruple",
        precio:10000,
        imgUrl:"../assets/img/hamburguesas/Stacker-Cuadruple.png",
    },
    {
        id: 9,
        nombre: "Whopper EXtreme",
        carne: "vacuna",
        tipo:"simple",
        precio:6500,
        imgUrl:"../assets/img/hamburguesas/Whopper-Extreme.png",
    },
    {
        id: 10,
        nombre: "Whopper Extreme Doble",
        carne: "vacuna",
        tipo:"doble",
        precio:7500,
        imgUrl:"../assets/img/hamburguesas/Whopper-Guacamole.png",
    },
    {
        id: 11,
        nombre: "Whopper Guacamole",
        carne: "vacuna",
        tipo:"doble",
        precio:7800,
        imgUrl:"../assets/img/hamburguesas/Whopper-Guacamole.png",
    },
    {
        id: 12,
        nombre: "Bacon King",
        carne: "pollo",
        tipo:"simple",
        precio:6800,
        imgUrl:"../assets/img/hamburguesas/Bacon-King.png",
    },
    {
        id: 13,
        nombre: "Crispy Chicken Pepino",
        carne: "pollo",
        tipo:"simple",
        precio:7200,
        imgUrl:"../assets/img/hamburguesas/Crispy-Chicken-Pepino.png",
    },
    {
        id: 14,
        nombre: "Crispy Chicken",
        carne: "pollo",
        tipo:"simple",
        precio:7000,
        imgUrl:"../assets/img/hamburguesas/Crsipy-Chicken.png",
    },
]

//Variable en donde se van a estar guardando los pedidos
const PEDIDOS =  JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    misProductos();  
    renderizarCarrito(); 
    alertaUsuario ();
    guardarDatos(alertaUsuario ());
});

//funcion creada para guardar los datos dentro del storage
function guardarEnLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(PEDIDOS))
}

//funcion creada para guardar los datos del usuario dentro del local storage con una key para cada uno
function guardarDatos(nombre, direccion) { 
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('direccion', direccion);
    return{ nombre, direccion }
}

// funcion asincrona para mostrar los productos guardados en el archivo datos.json
async function misProductos(){
    try{
        const response= await fetch ('../datos.json');
        const dataJson = await response.json();
        const nombreProducto = dataJson.productos;
        const divProductos = document.getElementById ("productos-container");

        nombreProducto.forEach(producto=>{
            const div = document.createElement ('div');
            div.classList.add ("producto-container");
            div.innerHTML = 
            `
                            <div class="card-paty-img-container">
                                <img src=${producto.imgUrl} alt="" class="card-paty-img">
                            </div>
                            <div>
                                <p class="paty-nombre">${producto.nombre}</p>
                            </div>
                            <div class="paty-precio-suma">
                                <div class="precio-paty-container">
                                    <p class="paty-precio"> $ ${producto.precio}</p>
                                </div>
                                <div class="paty-suma">
                                    <button onclick="agregarAlCarrito(${producto.id})" class="suma">Agregar Al Carrito</button>
                                    <button onclick="quitarDelCarrito(${producto.id})" class="resto">-</button>
                                </div>
                            </div>
            `;
            divProductos.appendChild(div)
        })
    }catch(error){
        console.log('error')
    }
}


//Funcion para agregar esas hamburguesas al carrito
function agregarAlCarrito(id){
    PEDIDOS
    const PRODUCTO = productos.find(item => item.id === id);
    const PRODUCTOENCARRITO= PEDIDOS.find(item => item.id === id);

    if(PRODUCTOENCARRITO){//Aumenta la cantidad de hamburguesas en uno 
        PRODUCTOENCARRITO.cantidad +=1;
    }else{
        PEDIDOS.push({...PRODUCTO, cantidad: 1}) 
    }
    Toastify({
        text: `${PRODUCTO.nombre}, agregado correctamente al carrito.`,
        duration: 2000,
        style: 
            { background: "#FAF4E3",
            color: "#960018" }
        }).showToast();
    guardarEnLocalStorage()
    renderizarCarrito()
}


//Funcion para quitar las hamburguesas del carrito
function quitarDelCarrito(id) {
    PEDIDOS

    if (!Array.isArray(PEDIDOS)) {//if creado para asegurarme de tener siempre un carrito
        PEDIDOS = [];
    }
    const PRODUCTO = productos.find(item => item.id === id);
    const index = PEDIDOS.findIndex(item => item.id === id);

    if (index !== -1) { //quita UNA sola hamburguesa si tiene mas de dos hamburguesas iguales en el pedido 
        if (PEDIDOS[index].cantidad > 1) {
            PEDIDOS[index].cantidad -= 1;
        } else { //de haber una sola hamburguesa se eliminara el pedido entero del array
            PEDIDOS.splice(index, 1);
        }
    }
    Toastify({
        text: `${PRODUCTO.nombre}, se a eliminado del carrito.`,
        duration: 2000,
        style: 
            { background: "#960018",
            color: "#FAF4E3" }
        }).showToast();
    guardarEnLocalStorage();
    renderizarCarrito();
}


//Funcion creada para eliminar el carrito entero sin necesidad de eliminar uno por uno los pedidos 
function limpiarCarrito (){
    PEDIDOS.splice(0, PEDIDOS.length);
    Toastify({
        text: `El carrito se ah eliminado.`,
        duration: 2000,
        style: 
            { background: "#960018",
            color: "#FAF4E3" }
        }).showToast();

    renderizarCarrito();
    guardarEnLocalStorage();
}

function limpiarCarritoSinAlerta(){
    PEDIDOS.splice(0, PEDIDOS.length);
    guardarEnLocalStorage();
}

//Evento creado para que funcione limpiarCarrito
document.getElementById('limpiar-carrito').addEventListener('click', limpiarCarrito);

//funcion asincrona para poder hacer el pedido solo si se tiene los datos del usuario
async function hacerPedidido(){

    try { 
        const nombre = localStorage.getItem('nombre');
        const direccion = localStorage.getItem('direccion');

        if (!nombre || nombre === 'undefined' || nombre.trim() === '' || !direccion || direccion === 'undefined' || direccion.trim() === ''){ 
            await Swal.fire({ 
                width:'600px',
                icon: "error",
                title: "Oops... Al parecer no completaste los datos!",
                background:'#FAF4E3',
                text: "Actualiza la pagina para poder hacer el pedido!",});

            } else { 
                Swal.fire({
                    width:'600px',
                    icon: "success",
                    title: "El pedido fue hecho!",
                    background:'#FAF4E3',
                    text: "Muchas gracias por confiar en nosotros!",
                });
                limpiarCarritoSinAlerta();
                renderizarCarrito();} 
        }
            catch(error){ 
                console.error(error);
                alert(error.message);}
}

//evento para ejecutar la funcion de hacerPedidos
document.getElementById('confirmar-pedidos').addEventListener('click', hacerPedidido )

//Funcion para renbderizar el carrito y sea visible
function renderizarCarrito() {
    PEDIDOS

    const carritoList = document.getElementById('carro');
    carritoList.innerHTML = ''; 
    let total = 0;

    //Lista del carrito de productos ya seleccionados
    PEDIDOS.forEach((producto, index) => {
        let li = document.createElement ('li')
        li.className = 'li-pedido'
        li.innerHTML = `
                            ${producto.nombre} - ${producto.cantidad}
                            <button onclick="quitarDelCarrito(${producto.id})" class="quitar-del-carrito">Eliminar</button>
        `;
        carritoList.appendChild(li);
        total += producto.precio * producto.cantidad
    });

    document.getElementById('total').textContent = `El Total = $${total}`//Muestras el total a pagar del pedido
    
}

// SWEET ALERT
//funcion que recopila los datos de el usuario al entrar a la pagina 
function alertaUsuario (){
    Swal.fire({
        title: 'Datos del consumidor',
        html:` 
        <input type="text" id="usuario" class="swal2-input" placeholder="Nombre">
        <input type="text" id="direccion" class="swal2-input" placeholder="Direccion">
        `,
        width:'600px',
        background:'#FAF4E3',
        confirmButtonText: 'Aceptar !', 
        showCancelButton: true,
        preConfirm: () => { 
            const nombre = Swal.getPopup().querySelector('#usuario').value;
            const direccion = Swal.getPopup().querySelector('#direccion').value;
            if (!nombre || !direccion) 
                { Swal.showValidationMessage(`Por favor ingresa nombre y dirección.`); 
            } return { nombre: nombre, direccion: direccion }; }
    }).then((result) => {
        if (result.isConfirmed) {
            const { nombre, direccion } = result.value;
            guardarDatos(nombre, direccion);
            Swal.fire({
                title: 'Datos Guardados!',
                icon: "success",
                background:'#FAF4E3',
                html: `
                <p>Ahora hagamos tu pedido</p>
                `
            });
    }});
}
