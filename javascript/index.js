//Este programa que sirve para administrar los pedidos de un local de hamburguesas online.
//pidiendo un nombre y una direccion obligatoriamente, sino el pedido no se podra hacer
//guardandolos dentro del localstorage 

// Hamburguesas del Local (productos)


//Variable en donde se van a estar guardando los pedidos
const PEDIDOS =  JSON.parse(localStorage.getItem('carrito')) || [];
let productosGlobales = [];

const MENU_PARRILLA= document.getElementById('menu-parrilla')
const MENU_POLLO = document.getElementById('menu-pollo')
const MENU_ACOMPANAMIENTOS= document.getElementById('menu-acompañamientos')
const MENU_BEBIDAS = document.getElementById('menu-bebidas')
const BUSCADOR = document.getElementById('buscador')
const divProductos = document.getElementById("productos-container");


//Evento creado para que funcione limpiarCarrito
document.getElementById('limpiar-carrito').addEventListener('click', limpiarCarrito);

//evento para ejecutar la funcion de hacerPedidos
document.getElementById('confirmar-pedidos').addEventListener('click', hacerPedidido )



document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();  
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

// Cargar productos y filtrar por categoría
async function cargarProductos() {
    try {
        const response = await fetch('../datos.json');
        const dataJson = await response.json();
        const productos = dataJson.productos;
        productosGlobales = dataJson.productos;

        mostrarProductos(productos);

        MENU_PARRILLA.addEventListener("click", () => filtrarProductos(productos, "vacuna"));
        MENU_POLLO.addEventListener("click", () => filtrarProductos(productos, "pollo"));
        MENU_ACOMPANAMIENTOS.addEventListener("click", () => filtrarProductos(productos, "acompañamientos"));
        MENU_BEBIDAS.addEventListener("click", () => filtrarProductos(productos, "bebidas"));
        BUSCADOR.addEventListener("input", buscarProductos);
    } catch (error) {
        console.log("Error al cargar productos:", error);
    }
}

// Mostrar productos en pantalla
function mostrarProductos(productos) {
    divProductos.innerHTML = "";
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto-container");
        div.innerHTML = `
            <h5 class="paty-nombre">${producto.nombre}</h5>
            <div class="card-paty-img-container">
                <img src=${producto.imgUrl} alt="${producto.descripcion}" class="card-paty-img">
            </div>
            <div class="precio-paty-container">
                <p class="paty-precio"> $ ${producto.precio}</p>
            </div>
            <div class="paty-precio-suma">
                <button onclick="agregarAlCarrito(${producto.id})" class="suma"  aria-label="Agregar al carrito">Agregar al Carrito</button>
                <button onclick="quitarDelCarrito(${producto.id})" class="resto"  aria-label="Eliminar del Carrito">Eliminar del Carrito</button>
            </div>
        `;
        divProductos.appendChild(div);
    });
}


// Filtrar productos por tipo de carne
function filtrarProductos(productos, tipoCarne) {
    const productosFiltrados = productos.filter(producto => producto.carne === tipoCarne);
    mostrarProductos(productosFiltrados);
}

// Función de búsqueda en tiempo real
function buscarProductos() {
    const textoBusqueda = BUSCADOR.value.toLowerCase();
    const productosFiltrados = productosGlobales.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBusqueda)
    );
    mostrarProductos(productosFiltrados);
}


//Funcion para agregar esas hamburguesas al carrito
async function agregarAlCarrito(id){
    try{
        const response = await fetch('../datos.json');
        const dataJson = await response.json();
        const productos = dataJson.productos;
        PEDIDOS
        const PRODUCTO = productos.find(item => item.id === id);
        const PRODUCTOENCARRITO= PEDIDOS.find(item => item.id === id);

        if(PRODUCTOENCARRITO){
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
    catch(error){
        console.error(error);
        alert(error.message);
    }
    
}


//Funcion para quitar las hamburguesas del carrito
async function quitarDelCarrito(id) {
    try{
        const response = await fetch('../datos.json');
        const dataJson = await response.json();
        const productos = dataJson.productos;
        PEDIDOS

        if (!Array.isArray(PEDIDOS)) {
            PEDIDOS = [];
        }
        const PRODUCTO = productos.find(item => item.id === id);
        const index = PEDIDOS.findIndex(item => item.id === id);

        if (index !== -1) { 
            if (PEDIDOS[index].cantidad > 1) {
                PEDIDOS[index].cantidad -= 1;
            } else { 
                PEDIDOS.splice(index, 1);
            }
            Toastify({
                text: `${PRODUCTO.nombre}, se a eliminado del carrito.`,
                duration: 2000,
                style: 
                    { background: "#960018",
                    color: "#FAF4E3" }
                }).showToast();
        }else{
            Toastify({
                text: `${PRODUCTO.nombre}, no se encuentra en el carrito.`,
                duration: 2000,
                style: 
                    { background: "#960018",
                    color: "#FAF4E3" }
                }).showToast();
        }
        
        guardarEnLocalStorage();
        renderizarCarrito();
    }
    catch(error){
        console.error(error);
        alert(error)
}}


//Funcion creada para eliminar el carrito entero sin necesidad de eliminar uno por uno los pedidos 
function limpiarCarrito (){
    

    if(PEDIDOS.length === 0){
        Toastify({
            text: `El carrito esta vacío.`,
            duration: 2000,
            style: 
                { background: "#960018",
                color: "#FAF4E3" }
            }).showToast();
    }else{
        PEDIDOS.splice(0, PEDIDOS.length);
        Toastify({
        text: `El carrito se ah eliminado.`,
        duration: 2000,
        style: 
            { background: "#960018",
            color: "#FAF4E3" }
        }).showToast();
    }
    

    renderizarCarrito();
    guardarEnLocalStorage();
}

function limpiarCarritoSinAlerta(){
    PEDIDOS.splice(0, PEDIDOS.length);
    guardarEnLocalStorage();
}

//Funcion para renbderizar el carrito y sea visible
function renderizarCarrito() {
    PEDIDOS
    const carritoStorage = localStorage.getItem('carrito');
    const carritoList = document.getElementById('carrito');
    carritoList.innerHTML = ''; 
    let total = 0;
    if (carritoStorage && PEDIDOS.length > 0) {  //Lista del carrito de productos ya seleccionados
            PEDIDOS.forEach((producto, index) => {
            let li = document.createElement ('li')
            li.className = 'li-pedido'
            li.innerHTML = `
                                <div> <p>Nombre: ${producto.nombre}</p> <p>Cantidad: ${producto.cantidad} </p></div>
                                <button onclick="quitarDelCarrito(${producto.id})" class="quitar-del-carrito" aria-label="Eliminar del Carrito">Eliminar</button>
            `;
            carritoList.appendChild(li);
            total += producto.precio * producto.cantidad
            
    });
        document.getElementById('total').textContent = `El Total = $${total}`//Muestras el total a pagar del pedido

    }else{  
        document.getElementById('total').textContent = `El Carrito esta vacío :(`
    }
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
