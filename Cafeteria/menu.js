const readline = require("readline/promises");
const caja = require("./caja");
const cliente = require("./cliente");
const cocina = require("./Cocina");

function limpiar() {
    console.clear();
}

async function pausar(rl) {
    await rl.question("\nPresiona ENTER para continuar...");
}

async function confirmar(rl, mensaje) {
    const respuesta = (await rl.question(`${mensaje} (s/n): `)).trim().toLowerCase();
    return respuesta === "s" || respuesta === "si";
}

function parsearIds(texto) {
    return texto
        .split(",")
        .map(id => Number(id.trim()))
        .filter(id => !isNaN(id) && id > 0);
}

async function flujoCrearPedido(rl, contexto) {
    cliente.consultarProductos();

    const nombre = (await rl.question("\nNombre del cliente: ")).trim();
    if (!nombre) {
        console.log("Nombre invalido: no se puede crear el pedido");
        return;
    }

    const idsTexto = await rl.question("Ids de los productos separados por coma (ej. 1,3,4): ");
    const ids = parsearIds(idsTexto);
    if (ids.length === 0) {
        console.log("Debes indicar al menos un id de producto valido");
        return;
    }

    console.log(`\nSe creara un pedido para "${nombre}" con los productos: ${ids.join(", ")}`);
    const confirmado = await confirmar(rl, `[${contexto}] ¿Deseas confirmar el pedido?`);
    if (!confirmado) {
        console.log("Pedido cancelado");
        return;
    }

    caja.agregarPedido(nombre, ids);
}

async function menuCaja(rl) {
    let opcion = "";

    while (opcion !== "0") {
        limpiar();
        console.log("\n=== Menu Caja ===");
        console.log("1. Crear pedido");
        console.log("2. Ver pedidos y total");
        console.log("0. Volver");
        opcion = (await rl.question("Elige una opcion: ")).trim();

        if (opcion === "1") {
            await flujoCrearPedido(rl, "Caja");
            await pausar(rl);
        } else if (opcion === "2") {
            caja.mostrarPedidos();
            await pausar(rl);
        } else if (opcion !== "0") {
            console.log(`Opcion "${opcion}" no valida`);
            await pausar(rl);
        }
    }
}

async function menuCliente(rl) {
    let opcion = "";

    while (opcion !== "0") {
        limpiar();
        console.log("\n=== Menu Cliente ===");
        console.log("1. Consultar productos");
        console.log("2. Crear pedido");
        console.log("3. Consultar estado de mi pedido");
        console.log("4. Ver menu del dia (stock y promociones)");
        console.log("5. Buscar y filtrar productos");
        console.log("0. Volver");
        opcion = (await rl.question("Elige una opcion: ")).trim();

        if (opcion === "1") {
            cliente.consultarProductos();
            await pausar(rl);
        } else if (opcion === "2") {
            await flujoCrearPedido(rl, "Cliente");
            await pausar(rl);
        } else if (opcion === "4") {
            cliente.mostrarMenuDinamico();
            await pausar(rl);
        } else if (opcion === "5") {
            await menuBusquedaCocina(rl);
        } else if (opcion === "3") {
            const folio = (await rl.question("Folio de tu pedido: ")).trim();
            if (!folio) {
                console.log("Debes indicar un folio");
            } else {
                cliente.consultarPedidoPorFolio(folio);
            }
            await pausar(rl);
        } else if (opcion !== "0") {
            console.log(`Opcion "${opcion}" no valida`);
            await pausar(rl);
        }
    }
}

async function menuCocina(rl) {
    let opcion = "";

    while (opcion !== "0") {
        limpiar();
        console.log("\n=== Menu Cocina ===");
        console.log("1. Ver catalogo");
        console.log("2. Agregar producto");
        console.log("3. Editar producto");
        console.log("4. Eliminar producto");
        console.log("5. Ver pedidos pendientes");
        console.log("6. Marcar pedido como listo");
        console.log("7. Buscar y ordenar productos");
        console.log("0. Volver");
        opcion = (await rl.question("Elige una opcion: ")).trim();

        if (opcion === "1") {
            cocina.verCatalogo();
            await pausar(rl);
        } else if (opcion === "2") {
            const nombre = (await rl.question("Nombre del producto: ")).trim();
            const precio = Number(await rl.question("Precio: "));

            if (!nombre || isNaN(precio) || precio <= 0) {
                console.log("Datos invalidos: se requiere nombre y un precio mayor a 0");
            } else {
                console.log(`\nSe agregara "${nombre}" - $${precio.toFixed(2)} al catalogo`);
                if (await confirmar(rl, "¿Deseas confirmar?")) {
                    cocina.agregarProducto(nombre, precio);
                } else {
                    console.log("Accion cancelada");
                }
            }
            await pausar(rl);
        } else if (opcion === "3") {
            cocina.verCatalogo();
            const id = Number(await rl.question("\nId del producto a editar: "));
            const nombre = (await rl.question("Nuevo nombre: ")).trim();
            const precio = Number(await rl.question("Nuevo precio: "));

            if (isNaN(id) || !cliente.buscarProducto(id)) {
                console.log("Id de producto invalido");
            } else if (!nombre || isNaN(precio) || precio <= 0) {
                console.log("Datos invalidos: se requiere nombre y un precio mayor a 0");
            } else {
                console.log(`\nSe actualizara el producto #${id} a "${nombre}" - $${precio.toFixed(2)}`);
                if (await confirmar(rl, "¿Deseas confirmar?")) {
                    cocina.editarProducto(id, nombre, precio);
                } else {
                    console.log("Accion cancelada");
                }
            }
            await pausar(rl);
        } else if (opcion === "4") {
            cocina.verCatalogo();
            const id = Number(await rl.question("\nId del producto a eliminar: "));

            if (isNaN(id) || !cliente.buscarProducto(id)) {
                console.log("Id de producto invalido");
            } else {
                console.log(`\nSe eliminara el producto #${id} del catalogo`);
                if (await confirmar(rl, "¿Deseas confirmar?")) {
                    cocina.eliminarProducto(id);
                } else {
                    console.log("Accion cancelada");
                }
            }
            await pausar(rl);
        } else if (opcion === "5") {
            cocina.verPedidosPendientes();
            await pausar(rl);
        } else if (opcion === "6") {
            const pendientes = cocina.verPedidosPendientes();
            const id = Number(await rl.question("\nId del pedido a marcar como listo: "));

            if (isNaN(id) || !pendientes.some(pedido => pedido.id === id)) {
                console.log("Id de pedido invalido o no esta pendiente");
            } else {
                console.log(`\nSe marcara el pedido #${id} como listo`);
                if (await confirmar(rl, "¿Deseas confirmar?")) {
                    cocina.marcarPedidoListo(id);
                } else {
                    console.log("Accion cancelada");
                }
            }
            await pausar(rl);
        } else if (opcion === "7") {
            await menuBusquedaCocina(rl);
        } else if (opcion !== "0") {
            console.log(`Opcion "${opcion}" no valida`);
            await pausar(rl);
        }
    }
}

function imprimirProductos(productos) {
    if (productos.length === 0) {
        console.log("No se encontraron productos");
        return;
    }
    productos.forEach(producto => {
        console.log(`${producto.id}. ${producto.nombre} [${producto.categoria}] - $${producto.precio.toFixed(2)}`);
    });
}

async function menuBusquedaCocina(rl) {
    let opcion = "";

    while (opcion !== "0") {
        limpiar();
        console.log("\n=== Buscar y ordenar productos ===");
        console.log("1. Productos baratos (precio menor o igual a...)");
        console.log("2. Productos caros (precio mayor o igual a...)");
        console.log("3. Bebidas");
        console.log("4. Postres");
        console.log("5. Buscar por etiqueta");
        console.log("6. Ordenar de menor a mayor precio");
        console.log("7. Ordenar de mayor a menor precio");
        console.log("0. Volver");
        opcion = (await rl.question("Elige una opcion: ")).trim();

        if (opcion === "1") {
            const limite = Number(await rl.question("Precio maximo: "));
            imprimirProductos(cocina.buscarBaratos(limite));
            await pausar(rl);
        } else if (opcion === "2") {
            const limite = Number(await rl.question("Precio minimo: "));
            imprimirProductos(cocina.buscarCaros(limite));
            await pausar(rl);
        } else if (opcion === "3") {
            imprimirProductos(cocina.buscarBebidas());
            await pausar(rl);
        } else if (opcion === "4") {
            imprimirProductos(cocina.buscarPostres());
            await pausar(rl);
        } else if (opcion === "5") {
            const etiqueta = (await rl.question("Etiqueta (bebida/postre/comida): ")).trim();
            imprimirProductos(cocina.buscarPorEtiqueta(etiqueta));
            await pausar(rl);
        } else if (opcion === "6") {
            imprimirProductos(cocina.ordenarPorPrecio(true));
            await pausar(rl);
        } else if (opcion === "7") {
            imprimirProductos(cocina.ordenarPorPrecio(false));
            await pausar(rl);
        } else if (opcion !== "0") {
            console.log(`Opcion "${opcion}" no valida`);
            await pausar(rl);
        }
    }
}

async function menuPrincipal() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    try {
        let opcion = "";

        while (opcion !== "0") {
            limpiar();
            console.log("\n=== Cafeteria ===");
            console.log("1. Caja");
            console.log("2. Cliente");
            console.log("3. Cocina");
            console.log("0. Salir");
            opcion = (await rl.question("Elige una opcion: ")).trim();

            if (opcion === "1") {
                await menuCaja(rl);
            } else if (opcion === "2") {
                await menuCliente(rl);
            } else if (opcion === "3") {
                await menuCocina(rl);
            } else if (opcion !== "0") {
                console.log(`Opcion "${opcion}" no valida`);
                await pausar(rl);
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
