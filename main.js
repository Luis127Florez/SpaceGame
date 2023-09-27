const keypress = require('keypress');
const readline = require('readline');

// Crea una interfaz para leer desde stdin
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdout.write('\u001b[?25l');
let position = { fila: 0, column: 4 };
let positionEnemiga = { filaEnemiga: 19, columnEnemiga: Math.floor(Math.random() * 20) }
let positionEnemiga2 = { filaEnemiga2: 19, columnEnemiga2: Math.floor(Math.random() * 20) }
let positionEnemiga3 = { filaEnemiga3: 19, columnEnemiga3: Math.floor(Math.random() * 20) }

let puntos = 0;
let board =
    [["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", ` Puntos: ${puntos}`]];


const imprimirFila = async ({ fila, column }, { filaEnemiga, columnEnemiga }, { filaEnemiga2, columnEnemiga2 }, { filaEnemiga3, columnEnemiga3 }) => {
    PrintFilas = '';
    for (let i = 0; i < board.length; i++) {
        for (let e = 0; e < board[i].length; e++) {
            if ((filaEnemiga === fila && columnEnemiga === column) ||
                (filaEnemiga2 === fila && columnEnemiga2 === column) ||
                (filaEnemiga3 === fila && columnEnemiga3 === column)) {
                console.log('Perdiste el juego (⌐■_■).');
                process.exit();
            }
            if (i === filaEnemiga && e == columnEnemiga) {
                PrintFilas += `🛸`
                continue;
            }
            if (i === filaEnemiga2 && e == columnEnemiga2) {
                PrintFilas += `🚀`
                continue;
            }
            if (i === filaEnemiga3 && e == columnEnemiga3) {
                PrintFilas += `💀`
                continue;
            }
            if (i === fila && e === column) {
                PrintFilas += `┳ `
                continue;
            }
            if (i === board.length - 1 && e === board[i].length - 1) {
                PrintFilas += ` Puntos: ${puntos}`;
                continue;
            }
            PrintFilas += `${board[i][e]} `;
        }
        PrintFilas += '\n';

    }
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(PrintFilas);
        }, 10);
    })

}



function handleCommand(ch, key) {
    if (key && key.name === 'escape') {
        console.log('Saliendo del juego.');
        process.exit();
    }

    if (ch) {
        // Aquí puedes poner la lógica para desencadenar acciones basadas en el comando ingresado
        switch (ch) {
            case 'a':
                if (position.column !== 0)
                    position.column -= 1
                break;
            case 'd':
                if (position.column !== 19)
                    position.column += 1
                break;
            case 'w':
                if (position.fila !== 0)
                    position.fila -= 1
                break;
            case 's':
                if (position.fila !== 19)
                    position.fila += 1;
                break;
            case 'x':
                console.log('Has realizado un ataque.');
                break;
            default:
                console.log('Comando no reconocido.');
        }
    }
}

// Escuchar eventos de teclado
process.stdin.on('keypress', handleCommand);

// Siempre es buena práctica manejar la limpieza adecuada de los eventos antes de salir del programa.
process.on('exit', () => {
    process.stdin.removeListener('keypress', handleCommand);
});

let level = 3;

(async function run() {
    console.log('inicio');
    for (let i = 0; true; i++) {
        const filas = await imprimirFila(position, positionEnemiga, positionEnemiga2, positionEnemiga3);
        console.log(filas);
        if (i % level === 0) {
            new setTimeout(() => {
                if (positionEnemiga.filaEnemiga === 0) {
                    puntos += 1
                    positionEnemiga.filaEnemiga = 19
                    positionEnemiga.columnEnemiga = Math.floor(Math.random() * 20)
                    positionEnemiga2.filaEnemiga2 = 19
                    positionEnemiga2.columnEnemiga2 = Math.floor(Math.random() * 20)
                    positionEnemiga3.filaEnemiga3 = 19
                    positionEnemiga3.columnEnemiga3 = Math.floor(Math.random() * 20)
                    if (puntos > 20) {
                        level = 2
                    }
                    if (puntos > 60) {
                        level = 1
                    }
                } else {
                    positionEnemiga.filaEnemiga -= 1
                    positionEnemiga2.filaEnemiga2 -= 1
                    positionEnemiga3.filaEnemiga3 -= 1
                }
            }, 3000)
        }
        /*const stdin = process.openStdin();
          stdin.addListener("data", (data) => {
              console.log("Tu nombre es: " + data);
              // process.exit();
          }) */


    }
}())
