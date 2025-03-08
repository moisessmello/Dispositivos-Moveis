// Exercicio 1
let str = "Moises";
let maiuscula = str.toUpperCase();
let minuscula = str.toLowerCase();
let reversed = str.split('').reverse().join('');
let substituir = str.replace("Moises", "Melo");

console.log(maiuscula)
console.log(minuscula)
console.log(reversed)
console.log(substituir)

// Exercicio 2

const soma = 15 + 5;
const subtrair = 5 - 15;
const multiplicar = 15 * 5;
const dividir = 15 / 5;
const maior = 15 > 5;

console.log(soma);
console.log(subtrair);
console.log(multiplicar);
console.log(dividir);
console.log(maior);

// Exercicio 3
let idade = 70

if(idade < 70){
    console.log("Menor de idade")
}

if(idade >= 65){
    console.log("Idosa")
} else { 
    console.log("Maior de idade")
}

// Exercicio 4 

for (let i = 1; i < 101; i++) {
    console.log(i);
    }

// Exercicio 5
function somar(numA, numB) {
    return numA + numB
}

console.log(somar(5,5))

let triplo = (numA, numB) => numA * numB
console.log(triplo(5, 3))

let quadrado = (numA, numB) => numA ** numB
console.log(quadrado(5, 2))

// Exercicio 6
let numero = [1, 2, 3, 4, 5, 6 ];
console.log(numero[0]);

numero.push(7)
console.log(numero)

