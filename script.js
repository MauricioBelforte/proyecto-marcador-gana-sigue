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

}


function actualizarLista() {
    const jugadoresList = document.getElementById('lista-jugadores');
    jugadoresList.innerHTML = '';

    jugadores.forEach((jugador, indice) => {
        jugadoresList.innerHTML += `<li class="jugador-item"><span class="nombre">${jugador.nombre}</span><span class="puntos">${jugador.puntos}</span>  <button onclick="eliminarJugador(${indice})">Eliminar</button> <button>Editar</button> </li>`;
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


function intercambiarJugadores(arreglo, indice1, indice2) {
    let temp = arreglo[indice1];
    arreglo[indice1] = arreglo[indice2];
    arreglo[indice2] = temp;
}


function vuelveLuchador1() {
    if (jugadores.length < 3) {
        mostrarError('Debe haber al menos 3 jugadores para realizar esta acción.');
        return;
    }
    intercambiarJugadores(jugadores, 0, 2); // Intercambia el primer luchador con el tercero
    actualizarLista();

}

function vuelveLuchador2() {
    if (jugadores.length < 3) {
        mostrarError('Debe haber al menos 3 jugadores para realizar esta acción.');
        return;
    }
    intercambiarJugadores(jugadores, 1, 2); // Intercambia el segundo luchador con el tercero
    actualizarLista();

}

function alFinalLuchador1() {
    if (jugadores.length < 2) {
        mostrarError('Debe haber al menos 2 jugadores para realizar esta acción.');
        return;
    }
    const primerJugador = jugadores.shift(); // Elimina el primer jugador
    jugadores.push(primerJugador); // Añade el primer jugador al final
    actualizarLista();
}

function alFinalLuchador2() {
    if (jugadores.length < 2) {
        mostrarError('Debe haber al menos 2 jugadores para realizar esta acción.');
        return;
    }
    const segundoJugador = jugadores.splice(1, 1)[0]; // Elimina el segundo jugador
    jugadores.push(segundoJugador); // Añade el segundo jugador al final
    actualizarLista();
}


function eliminarJugador(indice) {
    jugadores.splice(indice, 1);
    actualizarLista();
}