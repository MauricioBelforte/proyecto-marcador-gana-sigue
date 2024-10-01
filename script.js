class Jugador {
    constructor(nombre, puntos = 0) {
        this.nombre = nombre;
        this.puntos = puntos;
    }

    sumarpunto() {
        this.puntos += 1;
    }
}

let jugadores = [];

const botonAgregar = document.getElementById('agregar');

botonAgregar.addEventListener('click', function () {
    let nombre = document.getElementById('nombre').value;
    let puntos = parseInt(document.getElementById('puntos').value);

    if (nombre !== '') {
        let jugador = new Jugador(nombre, puntos);
        jugadores.push(jugador);
        console.log(jugadores);

        actualizarLista();
        document.getElementById('nombre').value = '';
        document.getElementById('puntos').value = '0';

        // Limpiar mensaje de error al agregar un nuevo jugador
        mostrarError("");

    } else {
        mostrarError("El nombre del jugador no puede estar vacío.");
    }
});


const arrayConLos2BotonesGano = document.querySelectorAll('.gano')

arrayConLos2BotonesGano.forEach(button => {
    button.addEventListener('click', function () {
        /* document.getElementById("label-luchador1").textContent
        let indice =  */
        let index = this.getAttribute('data-luchador') - 1;
        jugadores[index].sumarpunto();

        if (index == 1) { //Esto es si gano el segundo luchador
            //Mando al final al primero
            console.log(jugadores)
            const primerJugador = jugadores.shift();
            jugadores.push(primerJugador)
            console.log(primerJugador)
            console.log(jugadores)
        } else { // Esto es si gano el primero es decir con index==0   
            const segundoJugador = jugadores.splice(1, 1)[0] // El [0] es porque splice esta devolviendo un arreglo con un solo elemento y con el [0] devuelve el elemento
            jugadores.push(segundoJugador)
            console.log(segundoJugador)
            console.log(jugadores)
        }

        actualizarLista();

    });
});


function ganoLuchador1() {

    if (jugadores.length < 2) {
        mostrarError("Debe haber al menos dos luchadores para que funcione correctamente");
        return;
    }

    
    // Suma un punto el primero jugador
    jugadores[0].sumarpunto();

    // Mando al final al segundo jugador
    const segundoJugador = jugadores.splice(1, 1)[0] // El [0] es porque splice esta devolviendo un arreglo con un solo elemento y con el [0] devuelve el elemento
    jugadores.push(segundoJugador)


    actualizarLista();
    console.log(jugadores);
}

function ganoLuchador2() {
    if (jugadores.length < 2) {
        mostrarError("Debe haber al menos dos luchadores para que funcione correctamente");
        return;
    }

    
    // Suma un punto el segundo jugador
    jugadores[1].sumarpunto();

    // Mando al final al primer jugador
    const primerJugador = jugadores.shift();
    jugadores.push(primerJugador);
    actualizarLista();
    console.log(jugadores);
}


function actualizarLista() {
    const jugadoresList = document.getElementById('lista-jugadores');
    jugadoresList.innerHTML = '';

    jugadores.forEach(jugador => {
        jugadoresList.innerHTML += `<li><span>${jugador.nombre}</span><span>${jugador.puntos}</span></li>`;
    });

    if (jugadores.length >= 2) {
        document.getElementById('label-luchador1').textContent = jugadores[0].nombre;
        document.getElementById('label-luchador2').textContent = jugadores[1].nombre;
        document.getElementById('siguiente').textContent = `Siguiente: ${jugadores[2]?.nombre || ''}`;
        mostrarError(""); // Limpiar mensaje de error si no hay error
    }
}




function mostrarError(mensaje) {
    const mensajeError = document.getElementById('mensajeError');
    mensajeError.textContent = mensaje;
    if (mensaje) {
        mensajeError.classList.add('visible');
    } else {
        mensajeError.classList.remove('visible');
    }
}