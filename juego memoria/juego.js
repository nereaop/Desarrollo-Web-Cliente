let filas;
let columnas;
let arrayTablero;
let casillas;

let emoticonos = ["<p>&#128512;</p>", "<p>&#128520;</p>", "<p>&#128564;</p>", "<p>&#128536;</p>", "<p>&#128526;</p>", "<p>&#128518;</p>", "<p>&#128519;</p>", "<p>&#128521;</p>", "<p>&#128525;</p>", "<p>&#128514;</p>"];

function preguntaUsuario(fila, columna, tablero, casilla) {
    filas = prompt('¿Cuantas filas quieres?');
    columnas = prompt('¿Cuantas columnas quieres?');

    arrayTablero = [];
    casillas = filas * columnas;
};
