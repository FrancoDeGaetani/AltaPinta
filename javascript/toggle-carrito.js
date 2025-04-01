const CARRITO_BUTTON = document.querySelector('#btn-carrito');
const CARRITO_TOGGLE = document.querySelector('.carrito-container-menu')

CARRITO_BUTTON.addEventListener('click', ()=>{
    CARRITO_TOGGLE.classList.toggle('active')
})