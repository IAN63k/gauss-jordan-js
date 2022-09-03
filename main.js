const regex = /[-]?[0-9]+/gi;

const input1 = document.querySelector('#ecu1');
const input2 = document.querySelector('#ecu2');
const input3 = document.querySelector('#ecu3');

const divMatriz = document.querySelector('.matriz');

// const input1 = '1x-1y+3z';
// const input2 = '1x+1y+1z';
// const input3 = '2x+2y-1z';

const result1 = document.querySelector('#result1');
const result2 = document.querySelector('#result2');
const result3 = document.querySelector('#result3');

const btn = document.querySelector('#btn');

const dibujarMatriz = (matriz) => {
    const htmlMatriz = `
<table>
    <tr>
        <td>${matriz[0][0]}</td>
        <td>${matriz[0][1]}</td>
        <td class="td-f">${matriz[0][2]}</td>
        <td>${matriz[0][3]}</td>
    </tr>
    <tr>
        <td>${matriz[1][0]}</td>
        <td>${matriz[1][1]}</td>
        <td class="td-f">${matriz[1][2]}</td>
        <td>${matriz[1][3]}</td>
    </tr>
    <tr>
        <td>${matriz[2][0]}</td>
        <td>${matriz[2][1]}</td>
        <td class="td-f">${matriz[2][2]}</td>
        <td>${matriz[2][3]}</td>
    </tr>
    </table>`
        ;

    const div = document.createElement('div');
    div.innerHTML = htmlMatriz;
    divMatriz.append(div.firstElementChild);

    return div.firstElementChild;
}

const operacion = (arreglo1, arreglo2, nx) => {
    // El segundo arreglo es el fijo
    let arregloConCero = [];
    for (let i = 0; i < 4; i++) {
        arregloConCero.push(arreglo2[i] - nx * arreglo1[i]);
    }
    return arregloConCero;
}

const ponerCeros = (matriz) => {
    let nuevaMatrizConCeros = matriz;
    if (matriz[1][0] != 0) {
        for (let i = 0; i < 4; i++) {
            nuevaMatrizConCeros[1] = operacion(matriz[0], matriz[1], matriz[1][0]);
        }
    }
    if (matriz[2][0] != 0) {
        for (let i = 0; i < 4; i++) {
            nuevaMatrizConCeros[2] = operacion(matriz[0], matriz[2], matriz[2][0]);
        }
    }
    if (matriz[1][1] === 1 && matriz[0][1] != 0) {
        for (let i = 0; i < 4; i++) {
            nuevaMatrizConCeros[0] = operacion(matriz[1], matriz[0], matriz[0][1]);
        }
    }

    if (matriz[1][1] === 1 && matriz[2][1] != 0) {
        for (let i = 0; i < 4; i++) {
            nuevaMatrizConCeros[2] = operacion(matriz[1], matriz[2], matriz[2][1]);
        }
    }
    if (matriz[2][2] === 1 && matriz[0][2] != 0) {
        for (let i = 0; i < 4; i++) {
            nuevaMatrizConCeros[0] = operacion(matriz[2], matriz[0], matriz[0][2]);
        }
    }

    if (matriz[2][2] === 1 && matriz[1][2] != 0) {
        for (let i = 0; i < 4; i++) {
            nuevaMatrizConCeros[1] = operacion(matriz[2], matriz[1], matriz[1][2]);
        }
    }

    return nuevaMatrizConCeros;
}


btn.addEventListener('click', () => {
    try {
        divMatriz.innerHTML = '';
        let ecu1 = input1.value.match(regex);
        ecu1.push(result1.value);
        let ecu2 = input2.value.match(regex);
        ecu2.push(result2.value);
        let ecu3 = input3.value.match(regex);
        ecu3.push(result3.value);

        let matrizAumentada = [convertirReal(ecu1), convertirReal(ecu2), convertirReal(ecu3)];

        console.table(matrizAumentada)

        dibujarMatriz(matrizAumentada);
        console.table(gaussJordan(matrizAumentada));

        dibujarMatriz(gaussJordan(matrizAumentada));

    } catch (error) {
        alert('Lea y asegurese de ingresar bien los datos.')
    }

});


