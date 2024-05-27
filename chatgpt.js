// Inicio del juego + cacheo del DOM
let puntajeJugador = 0; 
let puntajeComputadora = 0;
const puntuacionUsuario_span = document.getElementById("puntuacion-usuario");
const puntuacionComputadora_span = document.getElementById("puntuacion-computadora"); 
const tableroResultados_div = document.querySelector(".tablero-resultados");
const resultado_div = document.querySelector(".resultado h3");
const resultadoReglas_div = document.querySelector(".resultado p");
const piedra_div = document.getElementById("piedra");
const papel_div = document.getElementById("papel");
const tijeras_div = document.getElementById("tijeras");

// Opciones para jugar, más adelante puedo agregar lagarto y spock para hacerlo de 5 opciones
const opciones = ['piedra', 'papel', 'tijeras'];

// Elegir una de las 3 opciones de forma aleatoria
function obtenerEleccionComputadora() {
    return opciones[Math.floor(Math.random() * opciones.length)];
}

// Función principal + lógica de quién gana
function juego(seleccionJugador) {
    const seleccionComputadora = obtenerEleccionComputadora();
    switch (seleccionJugador + seleccionComputadora) {
        case "piedratijeras":
        case "papelpiedra":
        case "tijeraspapel":
            victoria(seleccionJugador, seleccionComputadora);
            break;
        case "piedrapapel":
        case "papeltijeras":
        case "tijeraspiedra":
            derrota(seleccionJugador, seleccionComputadora);
            break;
        case "piedrapiedra":
        case "papelpapel":
        case "tijerastijeras":
            empate(seleccionJugador, seleccionComputadora);
            break;    
    } 
}

// Lógica para definir quién gana
function victoria(usuario, computadora) {
    actualizarPuntuacion(true);
    mostrarResultado('Ganaste✔️', usuario, computadora, 'verde', 'le gana a');
}

// Lógica para definir quién pierde
function derrota(usuario, computadora) {
    actualizarPuntuacion(false);
    mostrarResultado('Perdiste❌', usuario, computadora, 'rojo', 'pierde contra');
}

// Lógica para definir si hay empate
function empate(usuario, computadora) {
    const vosPequeno = "(Vos)".fontsize(2).sup();
    const pcPequeno = "(PC)".fontsize(2).sup();
    const eleccionJugador_div = document.getElementById(usuario);
    resultado_div.innerHTML = `Empate...`;
    resultadoReglas_div.innerHTML = `${primeraEnMayusculas(usuario)}${vosPequeno} es igual a ${primeraEnMayusculas(computadora)}${pcPequeno}`;
    eleccionJugador_div.classList.add('gris');
    setTimeout(() => eleccionJugador_div.classList.remove('gris'), 600);
}

// Función para actualizar la puntuación
function actualizarPuntuacion(ganaJugador) {
    if (ganaJugador) {
        puntajeJugador++;
    } else {
        puntajeComputadora++;
    }
    puntuacionUsuario_span.innerHTML = puntajeJugador;
    puntuacionComputadora_span.innerHTML = puntajeComputadora;
}

// Mostrar el resultado de la ronda
function mostrarResultado(mensaje, usuario, computadora, colorClase, mensajeResultado) {
    const vosPequeno = "(Vos)".fontsize(2).sup();
    const pcPequeno = "(PC)".fontsize(2).sup();
    const eleccionJugador_div = document.getElementById(usuario);
    resultado_div.innerHTML = mensaje;
    resultadoReglas_div.innerHTML = `${primeraEnMayusculas(usuario)}${vosPequeno} ${mensajeResultado} ${primeraEnMayusculas(computadora)}${pcPequeno}`;
    eleccionJugador_div.classList.add(colorClase);
    setTimeout(() => eleccionJugador_div.classList.remove(colorClase), 700);
}

// Correción para que las opciones tengan la primera palabra en mayúscula
function primeraEnMayusculas(palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}

// Escucha del evento click en las imágenes
function escucharClicks() {
    piedra_div.addEventListener('click', () => juego("piedra"));
    papel_div.addEventListener('click', () => juego("papel")); 
    tijeras_div.addEventListener('click', () => juego("tijeras"));
}

escucharClicks();