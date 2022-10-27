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
function crearTablero(fila, columna) {
    for (let fila = 0; fila < filas; fila++) {
        arrayTablero[fila] = new Array(columnas);

        for (let columna = 0; columna < columnas; columna++) {
            arrayTablero[fila][columna] = '';
        }
    }
};
function dibujarTablero(fila, columna, tablero) {
    document.write('<h2>MEMORIN</h2>')
    document.write('<h3>Nerea Oliva Prieto</h3>')
    document.write('<table>');

    for (let i = 0; i < filas; i++) {
        document.write('<tr>');

        for (let j = 0; j < columnas; j++) {
            document.write('<td>' + arrayTablero[i][j] + '</td>');
        }

        document.write('</tr>');
    }
    document.write('</table>');
};
function colocarEmojis(arrayTablero, filas, columnas, emoticonos) {

    let posicionArray = 0;
    let contadorEmojis = 0;
    let posFila;
    let posColumna;

    while (contadorEmojis != (casillas/2)) {
        posFila = Math.floor(Math.random() * filas);
        posColumna = Math.floor(Math.random() * columnas);
        while (arrayTablero[posFila][posColumna] != '') {
            posFila = Math.floor(Math.random() * filas);
            posColumna = Math.floor(Math.random() * columnas);
        }
        arrayTablero[posFila][posColumna] = emoticonos[posicionArray];
        posFila = Math.floor(Math.random() * filas);
        posColumna = Math.floor(Math.random() * columnas);
        while (arrayTablero[posFila][posColumna] != '') {
            posFila = Math.floor(Math.random() * filas);
            posColumna = Math.floor(Math.random() * columnas);
        }
        arrayTablero[posFila][posColumna] = emoticonos[posicionArray];
        posicionArray++;
        contadorEmojis++;
        if(posicionArray == 10){
            posicionArray = 0;
        }
    }
};
preguntaUsuario(filas, columnas, arrayTablero, casillas);
if (casillas % 2 == 0) {
    crearTablero(filas, columnas);
}
while (casillas % 2 == 1) {
    window.alert("Ha ocurrido un error, has introducido numeros cuya multiplicacion es impar. Por favor, introduce filas y columnas cuya multiplicacion sea par");
    preguntaUsuario(filas, columnas, arrayTablero, casillas);
    if (casillas % 2 == 0) {
        crearTablero(filas, columnas);
    }
};
colocarEmojis(arrayTablero, filas, columnas, emoticonos);
dibujarTablero(filas, columnas, arrayTablero);

