const readline = require("readline/promises");
const caja = require("./caja");
const cliente = require("./cliente");

async function menuCaja(rl) {
    let opcion = "";

    while (opcion !== "0") {
        console.log("\n=== Menu Caja ===");
        console.log("1. Agregar pedido");
        console.log("2. Ver pedidos y total");
        console.log("0. Volver");
        opcion = (await rl.question("Elige una opcion: ")).trim();

        if (opcion === "1") {
            const nombre = (await rl.question("Nombre del cliente: ")).trim();
            const producto = (await rl.question("Producto: ")).trim();
            const precio = Number(await rl.question("Precio: "));
            caja.agregarPedido(nombre, producto, precio);
        } else if (opcion === "2") {
            caja.mostrarPedidos();
        } else if (opcion !== "0") {
            console.log(`Opcion "${opcion}" no valida`);
        }
    }
}

async function menuCliente(rl) {
    let opcion = "";

    while (opcion !== "0") {
        console.log("\n=== Menu Cliente ===");
        console.log("1. Consultar productos");
        console.log("2. Agregar producto");
        console.log("3. Crear pedido");
        console.log("4. Lista de pedidos");
        console.log("0. Volver");
        opcion = (await rl.question("Elige una opcion: ")).trim();

        if (opcion === "1") {
            cliente.consultarProductos();
        } else if (opcion === "2") {
            const nombre = (await rl.question("Nombre del producto: ")).trim();
            const precio = Number(await rl.question("Precio: "));
            cliente.agregarProducto(nombre, precio);
        } else if (opcion === "3") {
            const nombre = (await rl.question("Nombre del cliente: ")).trim();
            const ids = await rl.question("Ids de los productos separados por coma (ej. 1,3,4): ");
            cliente.crearPedido(nombre, ids.split(",").map(id => Number(id.trim())));
        } else if (opcion === "4") {
            cliente.listarPedidos();
        } else if (opcion !== "0") {
            console.log(`Opcion "${opcion}" no valida`);
        }
    }
}

function menuCocina() {
    console.log("\nModulo de cocina en construccion, disponible proximamente");
}

async function menuPrincipal() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    try {
        let opcion = "";

        while (opcion !== "0") {
            console.log("\n=== Cafeteria ===");
            console.log("1. Caja");
            console.log("2. Cliente");
            console.log("3. Cocina (proximamente)");
            console.log("0. Salir");
            opcion = (await rl.question("Elige una opcion: ")).trim();

            if (opcion === "1") {
                await menuCaja(rl);
            } else if (opcion === "2") {
                await menuCliente(rl);
            } else if (opcion === "3") {
                menuCocina();
            } else if (opcion !== "0") {
                console.log(`Opcion "${opcion}" no valida`);
            }
        }

        console.log("Hasta luego");
    } catch (error) {
        console.log("\nEntrada cerrada, saliendo del menu");
    } finally {
        rl.close();
    }
}

menuPrincipal();
