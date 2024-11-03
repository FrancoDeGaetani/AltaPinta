
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
        imgUrl:"../assets/img/hamburguesas/Whopper-Extreme-doble.png",
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

let pedidos =  JSON.parse(localStorage.getItem('carrito')) || [];;

document.addEventListener('DOMContentLoaded', () => {
    vistaDeProductos();  
    renderizarCarrito(); 
});

function vistaDeProductos(){
    const divProductos = document.getElementById ("productos-container");
    productos.forEach(producto=>{
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
    
}

// funcion vistaDeProductos funcional

function agregarAlCarrito(id){
    const CARRITO = JSON.parse(localStorage.getItem('carrito')) || []
    const PRODUCTO = productos.find(item => item.id === id);
    const PRODUCTOENCARRITO= CARRITO.find(item => item.id === id);

    if(PRODUCTOENCARRITO){
        PRODUCTOENCARRITO.cantidad +=1;
    }else{
        CARRITO.push({...PRODUCTO, cantidad: 1}) 
    }
    
    localStorage.setItem('carrito', JSON.stringify(CARRITO))
    renderizarCarrito()
}



function quitarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (!Array.isArray(carrito)) {
        carrito = [];
    }

    const index = carrito.findIndex(item => item.id === id);

    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
        } else {
            carrito.splice(index, 1);
        }
    }
    


    // if (index !== -1) {
    //     carrito.splice(index, 1);
    // } 


    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}



function linpiarCarrito (){
    let carrito = [];

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

document.getElementById('limpiar-carrito').addEventListener('click', linpiarCarrito);



function renderizarCarrito() {
    const CARRITO = JSON.parse(localStorage.getItem('carrito')) || [];

    const carritoList = document.getElementById('carro');
    carritoList.innerHTML = ''; 
    let total = 0;


    CARRITO.forEach((producto, index) => {
        let li = document.createElement ('li')
        li.className = 'li-pedido'
        li.innerHTML = `
                            ${producto.nombre} - ${producto.cantidad}
                            <button onclick="quitarDelCarrito(${producto.id})" class="quitar-del-carrito">Eliminar</button>
        `;
        carritoList.appendChild(li);
        total += producto.precio * producto.cantidad
    });

    document.getElementById('total').textContent = `El Total = $${total}`
    
}

