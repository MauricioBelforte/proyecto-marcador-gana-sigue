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

const botonAgregar = document.getElementById('agregar')

botonAgregar.addEventListener('click', function () {
    let nombre = document.getElementById('nombre').value;
    let puntos = parseInt(document.getElementById('puntos').value);

    if (nombre !== '') {
        let jugador = new Jugador(nombre, puntos);
        jugadores.push(jugador);
        console.log(jugadores)

        actualizarListas();
        document.getElementById('nombre').value = '';
        document.getElementById('puntos').value = '0';
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
