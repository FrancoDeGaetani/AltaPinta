
 


async function carrucelHome() {
    try{
        const response = await fetch('../usuarios.json')
        const dataUsuario = await response.json();
        const nombreUsuario= dataUsuario.usuarios;
        const divCarrucelHome = document.getElementById('carrucel-home-container')

        nombreUsuario.forEach(usuarios => {
            const div = document.createElement('div');
            div.classList.add ('review');
            div.innerHTML=
            `
                <img src="${usuarios.perfil_foto}" alt="" class="review-img">
                <p class="review-usuario">${usuarios.usuario}</p>
                <a href="#" class="review-paty">${usuarios.hamburguesa_resena}</a>
                <p class="review-texto">${usuarios.resena_texto}</p>
            `;
            divCarrucelHome.appendChild(div);
        });
    }catch(error){console.log('error carrucelhome')}
}


carrucelHome()

