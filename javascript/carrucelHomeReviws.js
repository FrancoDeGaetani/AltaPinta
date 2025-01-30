const btnIzquierdaReview = document.querySelector('.btn-izquierda-review');
const btnDerechaReview = document.querySelector('.btn-derecha-review');
const carrucelReviwe = document.querySelector('#carrucel-reviews');
const review = document.querySelectorAll('.review');
let USUARIOS_REVIEW = 6

btnDerechaReview.addEventListener("click", e => moverDerechaReviwe())
btnIzquierdaReview.addEventListener("click", e => moverIzquierdaReviwe())

let translateReviwe = 0,
    contadorReviwe= 0,
    widthImgReviwe = 100 / USUARIOS_REVIEW ;


async function carrucelHome() {
    try{
        const response = await fetch('../usuarios.json')
        const dataUsuario = await response.json();
        const nombreUsuario= dataUsuario.usuarios;
        const divCarrucelHome = document.getElementById('carrucel-reviews')

        nombreUsuario.forEach(usuarios => {
            const div = document.createElement('div');
            div.classList.add ('review');
            div.innerHTML=
            `
                <img src="${usuarios.perfil_foto}" alt="" class="review-img">
                <div class="review-texto-container">
                    <p class="review-usuario">${usuarios.usuario}</p>
                    <div class = "link-review">
                        <p> Hamburguesa: </p>
                        <a href="#" class="review-paty">${usuarios.hamburguesa_resena}</a>
                    </div>
                    <p class="review-texto">${usuarios.resena_texto}</p>
                </div>
            `;
            divCarrucelHome.appendChild(div);
        });
    }catch(error){console.log('error carrucelhome')}
}

function moverDerechaReviwe (){

    if(contadorReviwe >= USUARIOS_REVIEW- 1 ){
        contadorReviwe= 0;
        translateReviwe = 0;
        carrucelReviwe.style.transform= `translate(-${translateReviwe}%)`;
        carrucelReviwe.style.transition = "none";
        return;
    }
    contadorReviwe++;
    translateReviwe = translateReviwe + widthImgReviwe;
    carrucelReviwe.style.transform= `translate(-${translateReviwe}%)`;
    carrucelReviwe.style.transition = `all ease .8s`;
}


function moverIzquierdaReviwe(){
    contadorReviwe--;
    if(contadorReviwe < 0){
        contadorReviwe = USUARIOS_REVIEW - 1;
        translateReviwe = widthImgReviwe * (USUARIOS_REVIEW - 1);
        carrucelReviwe.style.transform= `translate(-${translateReviwe}%)`;
        carrucelReviwe.style.transition = "none";
        return;
    }

    translateReviwe = translateReviwe - widthImgReviwe;
    carrucelReviwe.style.transform= `translate(-${translateReviwe}%)`;
    carrucelReviwe.style.transition= `all ease .8s`;
}


carrucelHome()

