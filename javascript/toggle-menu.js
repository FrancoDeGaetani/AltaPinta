const MENU_BUTTON = document.querySelector('.menu-toggle');
const MENU_TOGGLE = document.querySelector('.hidden-ul-menu')

MENU_BUTTON.addEventListener('click', ()=>{
    MENU_BUTTON.classList.toggle('active')
    MENU_TOGGLE.classList.toggle('active')
})

