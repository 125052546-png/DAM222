console.log("hola Node.js");

let edad1 = 20;
let edad2 = 11;

console.log("La edad promedio es de:")
console.log((edad1+edad2)/2)

/* Medis tiempo de un proceso */

console.time("miProceso");
 for (let i = 0; i < 10000000; i++){

 }
 console.timeEnd("miProceso")