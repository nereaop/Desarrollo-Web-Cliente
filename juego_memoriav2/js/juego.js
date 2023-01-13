class Tablero {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.casillas = this.filas * this.columnas;
        this.emoticonos = ["<p>&#128512;</p>", "<p>&#128055;</p>", "<p>&#128047;</p>", "<p>&#128536;</p>", "<p>&#128526;</p>", "<p>&#128518;</p>", "<p>&#128519;</p>", "<p>&#128521;</p>", "<p>&#128525;</p>", "<p>&#128514;</p>"];


        this.crearTablero();
        this.colocarEmojis();
        this.dibujarTableroDOM();
    }

    crearTablero() {

        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = new Array(this.columnas);

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
            }
        }
    }

    dibujarTableroDOM() {
        let tabla = document.createElement('table');
        let fila;
        let columna;

        for (let i = 0; i < this.filas; i++) {
            fila = document.createElement('tr');
            fila.style.backgroundColor = "#8affdc";
            tabla.appendChild(fila);

            for (let j = 0; j < this.columnas; j++) {
                columna = document.createElement('td');
                columna.id = `f${i}_c${j}`;
                columna.dataset.fila = i;
                columna.dataset.columna = j;
                columna.style.backgroundColor = "#8affdc";
                fila.appendChild(columna);
            }
        }

        document.body.appendChild(tabla);
    }


    colocarEmojis() {

        let posArray = 0;
        let contadorEmojis = 0;
        let posFila;
        let posColumna;

        while (contadorEmojis != (this.casillas / 2)) {
            posFila = Math.floor(Math.random() * this.filas);
            posColumna = Math.floor(Math.random() * this.columnas);
            while (this.arrayTablero[posFila][posColumna] != '') {
                posFila = Math.floor(Math.random() * this.filas);
                posColumna = Math.floor(Math.random() * this.columnas);
            }
            this.arrayTablero[posFila][posColumna] = this.emoticonos[posArray];
            posFila = Math.floor(Math.random() * this.filas);
            posColumna = Math.floor(Math.random() * this.columnas);
            while (this.arrayTablero[posFila][posColumna] != '') {
                posFila = Math.floor(Math.random() * this.filas);
                posColumna = Math.floor(Math.random() * this.columnas);
            }
            this.arrayTablero[posFila][posColumna] = this.emoticonos[posArray];
            posArray++;
            contadorEmojis++;
            if (posArray == 10) {
                posArray = 0;
            }
        }
    }
}

class Memorin {
    constructor() {
        this.preguntaUsuario();
        this.casillas = this.filas * this.columnas;
        this.comprobacionCasillas();
        this.añadirListeners();
    }
    preguntaUsuario() {
        this.filas = prompt('¿Cuantas filas quieres?');
        this.columnas = prompt('¿Cuantas columnas quieres?');
    }

    comprobacionCasillas() {

        if (this.casillas % 2 == 0) {
            this.crearTableroJuego();
        }

        if (this.casillas % 2 != 0) {
            let par = false;
            while (par == false) {
                window.alert("Ha ocurrido un error, has introducido numeros los cuales las casillas son impar. Por favor, introduce filas y columnas cuyas casillas sean par");
                this.preguntaUsuario();
                this.casillas = 0;
                if (this.casillas % 2 == 0) {
                    this.crearTableroJuego();
                    par = true;
                }
            }

        }
    }

    añadirListeners() {
        let celda;
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                celda = document.getElementById(`f${i}_c${j}`);
                celda.addEventListener('contextmenu', this.despejar.bind(this));
            }
        }
    }
    despejar(eventos) {
        let evento = eventos || window.event;
        let celda = eventos.currentTarget;

        this.despejarCelda(celda);
    }
    despejarCelda(celda) {
        let fila = celda.dataset.fila;
        let columna = celda.dataset.columna;
        alert("DESPEJAO");
        //celda.removeEventListener('contextmenu', this.despejarCelda.bind(this));
        celda.style.backgroundColor = "white";
        celda.innerHTML = this.arrayTablero[fila][columna];

    }

    crearTableroJuego() {
        this.tablero = new Tablero(this.filas, this.columnas);
    }


}
window.onload = function () {
    let memorin = new Memorin();
}