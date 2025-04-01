const btnIzquierdaReview = document.querySelector('.btn-izquierda-review');
const btnDerechaReview = document.querySelector('.btn-derecha-review');
const carrucelReviwe = document.querySelector('#carrucel-reviews');

let translateReviwe = 0,
    contadorReviwe = 0,
    widthImgReviwe = 0,
    USUARIOS_REVIEW = 0;

    async function carrucelHome() {
        try {
            const response = await fetch('./usuarios.json');
            const dataUsuario = await response.json();
            const nombreUsuario = dataUsuario.usuarios;
    
            const divCarrucelHome = document.getElementById('carrucel-reviews');
            divCarrucelHome.innerHTML = "";
    
            nombreUsuario.forEach(usuarios => {
                const div = document.createElement('div');
                div.classList.add('review');
                div.innerHTML = `
                    <img src="${usuarios.perfil_foto}" alt="" class="review-img">
                    <div class="review-texto-container">
                        <p class="review-usuario">${usuarios.usuario}</p>
                        <div class="link-review">
                            <p> Hamburguesa: </p>
                            <a href="#" class="review-paty">${usuarios.hamburguesa_resena}</a>
                        </div>
                        <p class="review-texto">${usuarios.resena_texto}</p>
                    </div>
                `;
                divCarrucelHome.appendChild(div);
            });
    
            USUARIOS_REVIEW = nombreUsuario.length;
            widthImgReviwe = 100 / USUARIOS_REVIEW;
    
            console.log("Usuarios en JSON:", USUARIOS_REVIEW);
            console.log("Elementos en el DOM:", document.querySelectorAll('.review').length);
    
            // Ajustar el tamaño del carrusel
            carrucelReviwe.style.width = `${100 * USUARIOS_REVIEW}%`;
            carrucelReviwe.style.display = "flex";
            carrucelReviwe.style.overflow = "hidden";
    
        } catch (error) {
            console.log('Error al cargar las reseñas:', error);
        }
    }

// Botón para mover a la derecha
function moverDerechaReviwe() {
    if (contadorReviwe >= USUARIOS_REVIEW - 1) {
        contadorReviwe = 0;
        translateReviwe = 0;
        carrucelReviwe.style.transition = "all ease 2s";
    } else {
        contadorReviwe++;
        translateReviwe += widthImgReviwe;
        carrucelReviwe.style.transition = "all ease .9s";
    }
    carrucelReviwe.style.transform = `translateX(-${translateReviwe}%)`;
}

// Botón para mover a la izquierda
function moverIzquierdaReviwe() {
    if (contadorReviwe <= 0) {
        contadorReviwe = USUARIOS_REVIEW - 1;
        translateReviwe = widthImgReviwe * (USUARIOS_REVIEW - 1 );
        carrucelReviwe.style.transition = "all ease 2s";
        
    } else {
        contadorReviwe--;
        translateReviwe -= widthImgReviwe;
        carrucelReviwe.style.transition = "all ease .9s";
    }
    carrucelReviwe.style.transform = `translateX(-${translateReviwe}%)`;
}

// Agregar eventos a los botones
btnDerechaReview.addEventListener("click", moverDerechaReviwe);
btnIzquierdaReview.addEventListener("click", moverIzquierdaReviwe);

// Cargar las reseñas al cargar la página
document.addEventListener("DOMContentLoaded", carrucelHome);
