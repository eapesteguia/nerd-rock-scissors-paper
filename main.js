// inicio del juego
alert('Jugá piedra, papel o tijera contra la PC desde la consola (F12).\nEl mejor de 3 intentos gana la partida!');

// opciones para jugar, más adelante puedo agregar lagarto y spock para hacerlo de 5 opciones
const opciones = ["piedra", "papel", "tijeras"];
const intentos = opciones.length;

// elegir una de las 3 opciones de forma aleatoria
function obtenerEleccionComputadora() {
    const opcion = opciones[Math.floor(Math.random() * opciones.length)];
    return opcion;
}

// pedirle al usuario que elija una de las 3 opciones + validación
function pedirEleccionJugador() {
    let validacion = false;
    while (validacion == false) {
        const opcion = prompt('Piedra, Papel o Tijeras');
        if (opcion == null) { // devuelve undefined
            break; // o continue si no quiero que tire undefined el cancel del prompt y el juego siga
        }
        const opcionEnMinusculas = opcion.toLowerCase();
        if (opciones.includes(opcionEnMinusculas)) {
            validacion = true;
            return opcionEnMinusculas;
        }
    }
}

// lógica para definir quién gana
function quienGana(seleccionJugador, seleccionComputadora) {
    if (seleccionJugador == seleccionComputadora) {
        return 'empate';
    }
    else if (
        (seleccionJugador == 'piedra' && seleccionComputadora == 'tijeras') ||
        (seleccionJugador == 'tijeras' && seleccionComputadora == 'papel') ||
        (seleccionJugador == 'papel' && seleccionComputadora == 'piedra')) {
        return 'jugador';
    }
    else {
        return 'computadora';
    }
}

// resultado de cada round
function cadaRonda(seleccionJugador, seleccionComputadora) {
    const resultado = quienGana(seleccionJugador, seleccionComputadora);
    if (resultado == 'empate') {
        return 'Es un empate...'
    }
    else if (resultado == 'jugador') {
        return `Ganaste! ${seleccionJugador} le gana a ${seleccionComputadora}`
    }
    else {
        return `Perdiste. ${seleccionComputadora} le gana a ${seleccionJugador}`
    }
}

// función principal
function juego() {
    let puntajeJugador = 0;
    let puntajeComputadora = 0;
    console.log('Bienvenid@!');
    console.log(`Jugá al mejor de ${intentos} intentos contra la PC`);
    for (let i = 0; i < intentos; i++) {
        const seleccionJugador = pedirEleccionJugador();
        if (seleccionJugador == null){ // corrección propuesta por ChatGPT para cuando el usuario selecciona cancelar en el prompt
            break;
        }
        const seleccionComputadora = obtenerEleccionComputadora();
        const resultado = quienGana(seleccionJugador, seleccionComputadora);
        console.log(cadaRonda(seleccionJugador, seleccionComputadora));
        console.log('---otra ronda---');
        if (resultado == 'jugador'){
            puntajeJugador++;
        } else if (resultado == 'computadora'){
            puntajeComputadora++; 
        }
    }
    console.log('Partida terminada.');
    if (puntajeJugador > puntajeComputadora) {
        console.log(`Ganaste la partida ${puntajeJugador} a ${puntajeComputadora}. Todavía hay fe en la humanidad!`);
    } else if (puntajeJugador < puntajeComputadora) {
        console.log(`La PC ganó la partida ${puntajeComputadora} a ${puntajeJugador}. Skynet es el futuro!`);
    } else {
        console.log(`Rarísimo. Fue empate ${puntajeJugador} a ${puntajeComputadora}!`);
    }
}

juego()