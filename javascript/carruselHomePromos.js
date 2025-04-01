const btnIzquierda = document.querySelector('.btn-izquierda');
const btnDerecha = document.querySelector('.btn-derecha');
const sliderPromo = document.querySelector('#slider-promo');
const sliderSection = document.querySelectorAll('.slider-section-carrusel-promo');

btnDerecha.addEventListener("click", e => moverDerecha())
btnIzquierda.addEventListener("click", e => moverIzquierda())

let translate = 0,
    contador= 0,
    widthImg = (100 / sliderSection.length);

    setInterval(() => {
        moverDerecha()
    }, 7000);
    

function moverDerecha (){

    if(contador >= sliderSection.length - 1){
        contador= 0;
        translate = 0;
        sliderPromo.style.transform= `translate(-${translate}%)`;
        return;
    }
    contador++;
    translate = translate + widthImg;
    sliderPromo.style.transform= `translate(-${translate}%)`;
    sliderPromo.style.transition = `all ease .6s`;
}


function moverIzquierda(){
    contador--;
    if(contador < 0){
        contador = sliderSection.length-1;
        console.log(contador)
        translate = widthImg * (sliderSection.length - 1);
        sliderPromo.style.transform= `translate(-${translate}%)`;
        return;
    }

    translate = translate - widthImg;
    sliderPromo.style.transform= `translate(-${translate}%)`;
    sliderPromo.style.transition= `all ease .6s`;
}

