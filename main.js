// inicio del juego + cacheo del DOM
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

// opciones para jugar, más adelante puedo agregar lagarto y spock para hacerlo de 5 opciones
const opciones = ['piedra', 'papel', 'tijeras'];

// elegir una de las 3 opciones de forma aleatoria
function obtenerEleccionComputadora() {
    return opciones[Math.floor(Math.random() * opciones.length)];  // recomendación de ChatGTP para simplificar el código y no usar la variable "opción"
}

// función principal + lógica de quién gana
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

// para definir quién gana
function victoria(opcionUsuario, opcionComputadora) {
    actualizarPuntuacion(true);
    mostrarResultado('Ganaste✔️', opcionUsuario, opcionComputadora, 'verde', 'le gana a');
}

// para definir quién pierde
function derrota(opcionUsuario, opcionComputadora) {
    actualizarPuntuacion(false);
    mostrarResultado('Perdiste❌', opcionUsuario, opcionComputadora, 'rojo', 'pierde contra');
}

// para definir si hay empate
function empate(opcionUsuario, opcionComputadora) {
    const vosPequeno = "(Vos)".fontsize(2).sup();
    const pcPequeno = "(PC)".fontsize(2).sup();
    const eleccionJugador_div = document.getElementById(opcionUsuario);
    resultado_div.innerHTML = `Empate...`;
    resultadoReglas_div.innerHTML = `${primeraEnMayusculas(opcionUsuario)}${vosPequeno} es igual a ${primeraEnMayusculas(opcionComputadora)}${pcPequeno}`;
    eleccionJugador_div.classList.add('gris');
    setTimeout(() => eleccionJugador_div.classList.remove('gris'), 600);
}

// para actualizar la puntuación
function actualizarPuntuacion(ganaJugador) {
    if (ganaJugador) {
        puntajeJugador++;
    } else {
        puntajeComputadora++;
    }
    puntuacionUsuario_span.innerHTML = puntajeJugador;
    puntuacionComputadora_span.innerHTML = puntajeComputadora;
}

// resultado de cada round
function mostrarResultado(mensaje, opcionUsuario, opcionComputadora, colorClase, mensajeResultado) {
    const vosPequeno = "(Vos)".fontsize(2).sup();
    const pcPequeno = "(PC)".fontsize(2).sup();
    const eleccionJugador_div = document.getElementById(opcionUsuario);
    resultado_div.innerHTML = mensaje;
    resultadoReglas_div.innerHTML = `${primeraEnMayusculas(opcionUsuario)}${vosPequeno} ${mensajeResultado} ${primeraEnMayusculas(opcionComputadora)}${pcPequeno}`;
    eleccionJugador_div.classList.add(colorClase);
    setTimeout(() => eleccionJugador_div.classList.remove(colorClase), 700);
}

// para que las opciones tengan la primera palabra en mayúscula
function primeraEnMayusculas(palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1); // recomendación de ChatGTP para simplificar el código y no usar IF para modificar las palabras
}

// escucha del evento click en las imágenes
function escucharClicks() {
    piedra_div.addEventListener('click', () => juego("piedra"));
    papel_div.addEventListener('click', () => juego("papel")); 
    tijeras_div.addEventListener('click', () => juego("tijeras"));
}

escucharClicks();