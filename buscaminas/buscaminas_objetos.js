class Tablero {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;

        this.crearTablero();
    }

    crearTablero() {
        // Crear array bidimensional para guardar las minas
        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = [];

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
            }
        }
    }

    dibujarTableroHTML() {
        // Creamos el tablero en html
        document.write('<table>');

        for (let i = 0; i < this.filas; i++) {
            document.write('<tr>');

            for (let j = 0; j < this.columnas; j++) {
                document.write(`<td></td>`);
            }

            document.write('</tr>');
        }
        document.write('</table>');
    }

    dibujarTableroDOM() {
        // Creamos el tablero en DOM
        let tabla = document.createElement('table');
        let fila;
        let columna;

        for (let i = 0; i < this.filas; i++) {
            fila = document.createElement('tr');
            tabla.appendChild(fila);

            for (let j = 0; j < this.columnas; j++) {
                columna = document.createElement('td');
                columna.id = `f${i}_c${j}`;
                columna.dataset.fila = i;
                columna.dataset.columna = j;
                columna.dataset.despejado = false;
                fila.appendChild(columna);
            }
        }

        document.body.appendChild(tabla);
    }




    modificarFilas(nuevasFilas) {
        // Modificar el número de filas y volver a crear el tablero con las filas nuevas
        this.filas = nuevasFilas;

        this.crearTablero();
    }

    modificarColumnas(nuevasColumnas) {
        // Modificar el número de columnas y volver a crear el tablero con las columnas nuevas
        this.columnas = nuevasColumnas;

        this.crearTablero();
    }


}

class Buscaminas extends Tablero {
    constructor(filas, columnas, numMinas) {
        super(filas, columnas);
        this.numMinas = numMinas;

        this.colocarMinas();
        this.colocarNumMinas();
    }

    colocarMinas() {
        let bomba = "<p>\uD83D\uDCA3</p>";
        let contadorMinas = 0;
        let posFila;
        let posColumna;


        while (contadorMinas < this.numMinas) {
            posFila = Math.floor(Math.random() * this.filas);
            posColumna = Math.floor(Math.random() * this.columnas);

            if (this.arrayTablero[posFila][posColumna] != bomba) {
                this.arrayTablero[posFila][posColumna] = bomba;
                contadorMinas++;
            };
        };
    }

    colocarNumMinas() {
        let numMinasAlrededor;
        let bomba = "<p>\uD83D\uDCA3</p>";

        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                numMinasAlrededor = 0;
                if (this.arrayTablero[fila][columna] != bomba) {
                    for (let cFila = fila - 1; cFila <= fila + 1; cFila++) {
                        if (cFila >= 0 && cFila < this.filas) {
                            for (let cColumna = columna - 1; cColumna <= columna + 1; cColumna++) {
                                if (cColumna >= 0 && cColumna < this.columnas &&
                                    this.arrayTablero[cFila][cColumna] == bomba) {
                                    numMinasAlrededor++;
                                }
                            }
                        }
                        this.arrayTablero[fila][columna] = numMinasAlrededor;
                    }
                }
            }
        }
    }

    dibujarTableroDOM() {
        super.dibujarTableroDOM();

        let celda;

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                celda = document.getElementById(`f${i}_c${j}`);

                celda.addEventListener('click', this.despejar.bind(this));
                celda.addEventListener('contextmenu', this.marcar.bind(this));
            }
        }
        console.log(this.arrayTablero);
    }

    despejar(elEvento) {
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;

        this.despejarCelda(celda);
    }
    marcar(elEvento) {
        let bandera = "<p>\uD83D\uDEA9</p>";
        let interrogante = "<p>\u2754</p>";
        let evento = elEvento || window.event;
        let celda = evento.currentTarget;
        if (celda.innerHTML == "") {
            celda.innerHTML = bandera;
        } else if (celda.innerHTML == bandera) {
            celda.innerHTML = interrogante;
        } else if (celda.innerHTML == interrogante) {
            celda.innerHTML = "";
        };
        document.oncontextmenu = function () { return false };
    }

    despejarCelda(celda) {
        let bomba = "<p>\uD83D\uDCA3</p>";
        let fila = parseInt(celda.dataset.fila);
        let columna = parseInt(celda.dataset.columna);
        let bandera = "<p>\uD83D\uDEA9</p>";


        celda.dataset.despejado = true;
        celda.removeEventListener('click',this.despejar);
        celda.removeEventListener('contextmenu',this.marcar);

        let valorCelda = this.arrayTablero[fila][columna];
        let esNumero = (valorCelda != bomba && valorCelda != 0);
        let esBomba = (valorCelda == bomba);
        let estaVacia = (valorCelda == 0);
        let bombaSeleccionadaMal;

        let arrayFilas;
        let arrayColumnas;
        let celdaNueva;

        let estaDespejado;

        if (esNumero) {
            celda.innerHTML = valorCelda;
            celda.removeEventListener('click', this.despejar.bind(this));
            celda.removeEventListener('contextmenu', this.marcar.bind(this));
            celda.style.backgroundColor = "white";

            if (valorCelda == 1) {
                celda.style.color = "#25abda";
            } else if (valorCelda == 2) {
                celda.style.color = "#25fd91";
            } else if (valorCelda == 3) {
                celda.style.color = "#F9ea06";
            } else if (valorCelda == 4){
                celda.style.color = "#F9a706";
            } else if (valorCelda == 5){
                celda.style.color = "#F90606";
            }
        } else if (esBomba) {

            arrayFilas = celda.parentNode.parentNode.childNodes;
            for (let tr of arrayFilas) {
                arrayColumnas = tr.childNodes;
                for (let td of arrayColumnas) {
                    td.removeEventListener('click', this.despejar);
                    td.removeEventListener('contextmenu', this.marcar);

                    fila = td.dataset.fila;
                    columna = td.dataset.columna;
                    valorCelda = this.arrayTablero[fila][columna]
                    if (td.lastChild != null) {
                        bombaSeleccionadaMal = (td.innerHTML == bandera && valorCelda != bomba);

                        if (bombaSeleccionadaMal) {
                            td.style.backgroundColor = 'red';
                            td.innerHTML = valorCelda;
                        } else if (valorCelda == bomba) {
                            td.innerHTML = bomba;
                            td.removeEventListener('click', this.despejar.bind(this));
                            td.removeEventListener('contextmenu', this.marcar.bind(this));  
                            td.style.backgroundColor = "white";      
                        }
                    } else if (valorCelda == bomba) {
                        td.innerHTML = bomba;
                        td.removeEventListener('click', this.despejar.bind(this));
                        td.removeEventListener('contextmenu', this.marcar.bind(this));    
                        td.style.backgroundColor = "white";      

                    }
                }
            }
            alert(`¡HAS PERDIDO!`);
        } else if (estaVacia) {
        celda.style.backgroundColor = "pink";
            for (let cFila = fila - 1; cFila <= fila + 1; cFila++) {
                if (cFila >= 0 && cFila < this.filas) {
                    for (let cColumna = columna - 1; cColumna <= columna + 1; cColumna++) {
                        if (cColumna >= 0 && cColumna < this.columnas) {
                            celdaNueva = document.getElementById(`f${cFila}_c${cColumna}`);
                            estaDespejado = (celdaNueva.dataset.despejado == "true");
                            if (!estaDespejado) {
                                this.despejarCelda(celdaNueva);
                            }
                        }
                    }
                }

            }
        }

    }

}

window.onload = function () {
    let buscaminas1 = new Buscaminas(9, 9, 16);
    buscaminas1.dibujarTableroDOM();
}