class Tablero {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.casillas = this.filas * this.columnas;
        this.emoticonos = ["<p>&#128512;</p>", "<p>&#128055;</p>", "<p>&#128047;</p>", "<p>&#128536;</p>", "<p>&#128526;</p>", "<p>&#128518;</p>", "<p>&#128519;</p>", "<p>&#128521;</p>", "<p>&#128525;</p>", "<p>&#128514;</p>"];

        this.par = false;

        this.preguntaUsuario();
        this.comprobacionCasillas();
        this.crearTablero();
        this.colocarEmojis();

    }

    crearTablero() {

        this.arrayTablero = [];

        for (let fila = 0; fila < this.filas; fila++) {
            this.arrayTablero[fila] = new Array(this.columnas);

            for (let columna = 0; columna < this.columnas; columna++) {
                this.arrayTablero[fila][columna] = '';
            }
        }
        console.log(this.arrayTablero);
    }


    preguntaUsuario() {
        this.filas = prompt('¿Cuantas filas quieres?');
        this.columnas = prompt('¿Cuantas columnas quieres?');
        this.casillas = this.filas * this.columnas;
    }

    comprobacionCasillas() {

        if (this.casillas % 2 == 0) {
            this.dibujarTableroDOM();
        }

        while (this.casillas % 2 != 0 || this.casillas < 4) {
            this.par = false;
            window.alert("Ha ocurrido un error, has introducido numeros los cuales las casillas son impar. Por favor, introduce filas y columnas cuyas casillas sean par");
            this.casillas = 0;
            this.preguntaUsuario();
            if (this.casillas % 2 == 0) {
                this.dibujarTableroDOM();
                this.par = true;
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
                columna.innerHTML = "<p>✺</p>";
                fila.appendChild(columna);
            }
        }

        let reiniciar = document.createElement('button');
        reiniciar.type = "button";
        reiniciar.innerText = "Reiniciar";
        reiniciar.className = "bn5";
        reiniciar.style.marginLeft = "2%";
        reiniciar.style.fontSize = "20px";
        reiniciar.addEventListener('click', this.reiniciar.bind(this));
        reiniciar.style.marginBottom = "1%";
        document.body.appendChild(reiniciar);
        
        document.body.appendChild(tabla);
    }

    reiniciar() {
        let respuesta = window.confirm("¿Estas seguro que quieres reiniciar el juego?");
        if (respuesta == true) {
            window.location.href = window.location.href;
        }
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

class Memorin extends Tablero {
    constructor(filas, columnas) {
        super(filas, columnas);
        this.carta1 = "";
        this.carta2 = "";
        this.carta1Pos = "";
        this.cartaSeleccionadas = 0;
        this.intentos = 0;
        this.puntos = 0;
        this.puntuacionMaxima = (this.casillas / 2) * 10;
        this.maximasParejasCorrectas = this.casillas / 2;
        this.aciertos = 0;
        this.añadirListeners();
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
        let celda = evento.currentTarget;

        this.despejarCelda(celda);
    }


    despejarCelda(celda) {
        window.oncontextmenu = (() => {
            return false;
        });
        this.cartaSeleccionadas++;
        let simboloCarta = "<p>✺</p>";
        let fila = parseInt(celda.dataset.fila);
        let columna = parseInt(celda.dataset.columna);
        let valorCelda = this.arrayTablero[fila][columna];

        if (this.cartaSeleccionadas == 1) {

            celda.style.background = "white";
            this.carta1 = valorCelda;
            this.carta1Pos = celda;
            celda.innerHTML = this.carta1;

        } else if (this.cartaSeleccionadas == 2) {

            this.intentos++;
            this.carta2 = valorCelda;
            celda.innerHTML = this.carta2;
            celda.style.background = "white";
            this.cartaSeleccionadas = 0;

            if (this.carta1 == this.carta2) {

                this.aciertos++;
                celda.style.background = "green";
                this.carta1Pos.style.background = "green";
                celda.innerHTML = this.carta2;
                celda.style.pointerEvents = "none";
                this.carta1Pos.style.pointerEvents = "none";

                if (this.intentos == 1) {
                    this.puntos = this.puntos + 10;
                    this.intentos = 0;
                } else if (this.intentos == 2) {
                    this.puntos = this.puntos + 5;
                    this.intentos = 0;
                } else if (this.intentos == 3) {
                    this.puntos = this.puntos + 2.5;
                    this.intentos = 0;
                } else if (this.intentos > 3) {
                    this.puntos = this.puntos + 0;
                    this.intentos = 0;
                }
                this.ganar();

            } else if (this.carta1 != this.carta2) {

                setTimeout(() => {
                    celda.style.background = "#8affdc";
                    celda.innerHTML = simboloCarta;
                    this.carta1Pos.style.background = "#8affdc";
                    this.carta1Pos.innerHTML = simboloCarta;
                }, 1000);
            }
        }
    }

    ganar() {
        if (this.aciertos == this.maximasParejasCorrectas) {

            let texto = document.createElement('h1');
            texto.innerText = "ENHORABUENA HAS GANADO :D";
            texto.style.fontFamily = "Georgia, 'Times New Roman', Times, serif";
            texto.style.textAlign = "center";
            texto.style.marginLeft = "30%";
            texto.style.background = "rgba(50, 197, 255, 0.817)";
            texto.style.width = "40%";
            document.body.appendChild(texto);

            let texto2 = document.createElement('h1');
            texto2.innerText = `Tu puntuacion ha sido: ${this.puntos}/${this.puntuacionMaxima}`;
            texto2.style.fontFamily = "Georgia, 'Times New Roman', Times, serif";
            texto2.style.textAlign = "center";
            texto2.style.marginLeft = "30%";
            texto2.style.background = "rgba(50, 197, 255, 0.817)";
            texto2.style.width = "40%";
            document.body.appendChild(texto2);
        }
    }

}
window.onload = function () {
    let memorin = new Memorin();

}