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

document.getElementById('agregar').addEventListener('click', function () {
    let nombre = document.getElementById('nombre').value;
    let puntos = parseInt(document.getElementById('puntos').value);

    if (nombre !== '') {
        let jugador = new Jugador(nombre, puntos);
        jugadores.push(jugador);

        actualizarListas();
        document.getElementById('nombre').value = '';
        document.getElementById('puntos').value = '0';
    }
});

document.querySelectorAll('.gano').forEach(button => {
    button.addEventListener('click', function () {
        let index = this.getAttribute('data-luchador') - 1;
        jugadores[index].sumarpunto();
        actualizarListas();
    });
});

function actualizarListas() {
    const jugadoresList = document.getElementById('lista-jugadores');
    jugadoresList.innerHTML = '';

    jugadores.forEach(jugador => {
        jugadoresList.innerHTML += `<li><span>${jugador.nombre}</span><span>${jugador.puntos}</span></li>`;
    });

    if (jugadores.length >= 2) {
        document.getElementById('label-luchador1').textContent = jugadores[0].nombre;
        document.getElementById('label-luchador2').textContent = jugadores[1].nombre;
        document.getElementById('siguiente').textContent = `Siguiente: ${jugadores[2]?.nombre || ''}`;
    }
}
