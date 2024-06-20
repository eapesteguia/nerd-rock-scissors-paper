// variables globales + cacheo del DOM
let puntajeJugador = 0;
let puntajeComputadora = 0;
const puntuacionUsuario_span = document.getElementById("puntuacion-usuario");
const puntuacionComputadora_span = document.getElementById("puntuacion-computadora");
const resultado_div = document.querySelector(".resultado h3");
const resultadoReglas_div = document.querySelector(".resultado p");
const opciones_div = document.querySelector(".opciones");
const resetearPuntajeDelJuego = document.getElementById("resetear-puntuacion").addEventListener("click", resetearPuntuacion);

Swal.fire({
    title: 'Acá podés jugar contra la PC una versión <i>nerd</i> del famoso juego de manos "Piedra, Papel o Tijeras"',
    width: 600,
    padding: "2em",
    color: "#716add",
    background: "#fff",
        backdrop: `
      rgba(0,0,123,0.4)
      url("./img/nyan-cat.gif")
      left top
      no-repeat
    `,
    footer: '<i></i><a href="https://youtu.be/_tsy4q9ibAE?si=9tYGfZTgMuo7ELvI&t=23" target="_blank" title="Link al video en Youtube. Está en Español =)">Ó podés mirar la explicación de Sheldon Cooper en TBBT</a></i>'
  });

// reglas del juego
const reglas = {
    piedra: ["tijeras", "lagarto"],
    papel: ["piedra", "spock"],
    tijeras: ["papel", "lagarto"],
    lagarto: ["papel", "spock"],
    spock: ["piedra", "tijeras"]
};

// recuperar opciones del archivo JSON y mostrarlas en el HTML
const crearOpciones = (opcion) => {
    const crearCadaOpcion = document.createElement("div");
    crearCadaOpcion.className = "opcion";
    crearCadaOpcion.id = opcion.id;
    crearCadaOpcion.innerHTML = `<img src="${opcion.imagen}" title="${opcion.nombre}" alt="${opcion.descripcion}">`;
    opciones_div.append(crearCadaOpcion);
    crearCadaOpcion.addEventListener('click', () => juego(opcion.id));
};

const recuperarOpciones = async () => {
    try {
        const respuesta = await fetch("./opciones.json");
        const levantarOpciones = await respuesta.json();
        levantarOpciones.forEach(opcion => crearOpciones(opcion));
    } catch (error) {
        console.log("Error al recuperar las opciones del juego (JSON)");
    }
};
recuperarOpciones();

// obtener eleccion de la computadora
const obtenerEleccionComputadora = () => {
    const opciones = Object.keys(reglas);
    return opciones[Math.floor(Math.random() * opciones.length)];
};

// función principal del juego + lógica de victoria, derrota y empate
function juego(seleccionJugador) {
    const seleccionComputadora = obtenerEleccionComputadora();
    if (seleccionJugador === seleccionComputadora) {
        mostrarResultado('Empate...', seleccionJugador, seleccionComputadora, 'gris', 'es igual a');
    } else if (reglas[seleccionJugador].includes(seleccionComputadora)) {
        actualizarPuntuacion(true);
        mostrarResultado('Ganaste✔️', seleccionJugador, seleccionComputadora, 'verde', 'le gana a');
    } else {
        actualizarPuntuacion(false);
        mostrarResultado('Perdiste❌', seleccionJugador, seleccionComputadora, 'rojo', 'pierde contra');
    }
};

// para actualizar la puntuación
function actualizarPuntuacion(ganaJugador) {
    if (ganaJugador) {
        puntajeJugador++;
    } else {
        puntajeComputadora++;
    }
    puntuacionUsuario_span.innerHTML = puntajeJugador;
    puntuacionComputadora_span.innerHTML = puntajeComputadora;
    guardarPuntuacion();
};

// para guardar la puntuación en localStorage
const guardarPuntuacion = () => {
    localStorage.setItem('puntajeJugador', puntajeJugador);
    localStorage.setItem('puntajeComputadora', puntajeComputadora);
};

// para cargar la puntuación directo desde localStorage
const cargarPuntuacion = () => {
    const puntajeGuardadoJugador = localStorage.getItem('puntajeJugador');
    const puntajeGuardadoComputadora = localStorage.getItem('puntajeComputadora');
    if (puntajeGuardadoJugador !== null) {
        puntajeJugador = parseInt(puntajeGuardadoJugador);
        puntuacionUsuario_span.innerHTML = puntajeJugador;
    }
    if (puntajeGuardadoComputadora !== null) {
        puntajeComputadora = parseInt(puntajeGuardadoComputadora);
        puntuacionComputadora_span.innerHTML = puntajeComputadora;
    }
};

// resultado de cada round
function mostrarResultado(mensaje, opcionUsuario, opcionComputadora, colorClase, mensajeResultado) {
    const vosPequeno = "(Vos)".fontsize(2).sup();
    const pcPequeno = "(PC)".fontsize(2).sup();
    resultado_div.innerHTML = mensaje;
    resultadoReglas_div.innerHTML = `${primeraEnMayusculas(opcionUsuario)}${vosPequeno} ${mensajeResultado} ${primeraEnMayusculas(opcionComputadora)}${pcPequeno}`;
    const eleccionJugador_div = document.getElementById(opcionUsuario);
    eleccionJugador_div.classList.add(colorClase);
    setTimeout(() => eleccionJugador_div.classList.remove(colorClase), 700);
};

// para que las opciones tengan la primera palabra en mayúscula
function primeraEnMayusculas(palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1); // recomendación de ChatGTP para simplificar el código y no usar IF para modificar las palabras
};

// para resetear la puntuación
function resetearPuntuacion() {
    puntajeJugador = 0;
    puntajeComputadora = 0;
    puntuacionUsuario_span.innerHTML = puntajeJugador;
    puntuacionComputadora_span.innerHTML = puntajeComputadora;
    localStorage.removeItem('puntajeJugador');
    localStorage.removeItem('puntajeComputadora');
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Puntajes en cero de nuevo...",
        showConfirmButton: false,
        toast: true,
        timer: 1300
      });
};

// cargar la puntuación al inicio
cargarPuntuacion();
