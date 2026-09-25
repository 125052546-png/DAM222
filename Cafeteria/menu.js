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

// Devuelve la etiqueta elegida (ENTER conserva `porDefecto`) o null si no es valida
async function pedirCategoria(rl, porDefecto) {
    const texto = (await rl.question(`Etiqueta (${cliente.CATEGORIAS.join("/")}) [${porDefecto}]: `)).trim().toLowerCase();
    const categoria = texto || porDefecto;
    return cliente.CATEGORIAS.includes(categoria) ? categoria : null;
}

// Devuelve el stock elegido (ENTER conserva `porDefecto`) o null si no es valido
async function pedirStock(rl, porDefecto) {
    const texto = (await rl.question(`Existencias (stock) [${porDefecto}]: `)).trim();
    const stock = texto === "" ? porDefecto : Number(texto);
    return Number.isInteger(stock) && stock >= 0 ? stock : null;
}

async function flujoCrearPedido(rl, contexto) {
    cliente.consultarProductos();

    const nombre = (await rl.question("\nNombre del cliente: ")).trim();
    if (!nombre) {
        console.log("Nombre invalido: no se puede crear el pedido");
        return;
    }

    const items = [];
    let agregarOtro = true;

    while (agregarOtro) {
        const id = Number(await rl.question("Id del producto: "));
        const producto = cliente.buscarProducto(id);

        if (!producto) {
            console.log("Id de producto invalido");
        } else {
            const cantidad = Number(await rl.question(`Cantidad de "${producto.nombre}": `));

            if (!Number.isInteger(cantidad) || cantidad <= 0) {
                console.log("Cantidad invalida: debe ser un entero mayor a 0");
            } else {
                items.push({ id, cantidad });
                console.log(`Agregado: ${cantidad}x ${producto.nombre}`);
            }
        }

        agregarOtro = await confirmar(rl, "¿Quieres agregar mas productos?");
    }

    if (items.length === 0) {
        console.log("Debes agregar al menos un producto valido");
        return;
    }

    const resumen = items.map(({ id, cantidad }) => `${cantidad}x ${cliente.buscarProducto(id).nombre}`).join(", ");
    console.log(`\nSe creara un pedido para "${nombre}" con: ${resumen}`);
    const confirmado = await confirmar(rl, `[${contexto}] ¿Deseas confirmar el pedido?`);
    if (!confirmado) {
        console.log("Pedido cancelado");
        return;
    }

    cliente.crearPedido(nombre, items);
}

async function menuCaja(rl) {
    let opcion = "";

    while (opcion !== "0") {
        limpiar();
        console.log("\n=== Menu Caja ===");
        console.log("1. Crear pedido");
        console.log("2. Ver pedidos y total");
        console.log("3. Cancelar pedido");
        console.log("4. Ver notificaciones de pedidos");
        console.log("0. Volver");
        opcion = (await rl.question("Elige una opcion: ")).trim();

        if (opcion === "1") {
            await flujoCrearPedido(rl, "Caja");
            await pausar(rl);
        } else if (opcion === "2") {
            caja.mostrarPedidos();
            await pausar(rl);
        } else if (opcion === "3") {
            cliente.listarPedidos();
            const id = Number(await rl.question("\nId del pedido a cancelar: "));
            const motivo = (await rl.question("Razon de la cancelacion: ")).trim();
            if (isNaN(id)) {
                console.log("Id de pedido invalido");
            } else if (!motivo) {
                console.log("Debes indicar una razon");
            } else if (await confirmar(rl, `¿Cancelar el pedido #${id}?`)) {
                caja.cancelarPedido(id, motivo);
            } else {
                console.log("Accion cancelada");
            }
            await pausar(rl);
        } else if (opcion === "4") {
            console.log("\n--- Notificaciones ---");
            if (caja.notificaciones.length === 0) {
                console.log("Sin notificaciones");
            }
            caja.notificaciones.forEach(mensaje => console.log(mensaje));
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
        console.log("6. Preparar pedido");
        console.log("7. Buscar y ordenar productos");
        console.log("0. Volver");
        opcion = (await rl.question("Elige una opcion: ")).trim();

        if (opcion === "1") {
            cocina.verCatalogo();
            await pausar(rl);
        } else if (opcion === "2") {
            const nombre = (await rl.question("Nombre del producto: ")).trim();
            const precio = Number(await rl.question("Precio: "));
            const categoria = await pedirCategoria(rl, "otro");
            const stock = await pedirStock(rl, 10);
            const promocion = await confirmar(rl, "¿Esta en promocion?");

            if (!nombre || isNaN(precio) || precio <= 0) {
                console.log("Datos invalidos: se requiere nombre y un precio mayor a 0");
            } else if (!categoria) {
                console.log(`Etiqueta invalida: usa ${cliente.CATEGORIAS.join(", ")}`);
            } else if (stock === null) {
                console.log("Stock invalido: debe ser un entero mayor o igual a 0");
            } else {
                console.log(`\nSe agregara "${nombre}" [${categoria}] - $${precio.toFixed(2)}${promocion ? " (EN PROMOCION)" : ""} | stock: ${stock}`);
                if (await confirmar(rl, "¿Deseas confirmar?")) {
                    cocina.agregarProducto(nombre, precio, categoria, promocion, stock);
                } else {
                    console.log("Accion cancelada");
                }
            }
            await pausar(rl);
        } else if (opcion === "3") {
            cocina.verCatalogo();
            const id = Number(await rl.question("\nId del producto a editar: "));
            const actual = cliente.buscarProducto(id);

            if (isNaN(id) || !actual) {
                console.log("Id de producto invalido");
                await pausar(rl);
                continue;
            }

            console.log("(ENTER en cualquier campo deja el valor actual)");
            const nombre = (await rl.question(`Nuevo nombre [${actual.nombre}]: `)).trim() || actual.nombre;
            const textoPrecio = (await rl.question(`Nuevo precio [${actual.precio}]: `)).trim();
            const precio = textoPrecio === "" ? actual.precio : Number(textoPrecio);
            const categoria = await pedirCategoria(rl, actual.categoria);
            const stock = await pedirStock(rl, actual.stock);
            const textoPromo = (await rl.question(`¿En promocion? (s/n) [${actual.promocion ? "s" : "n"}]: `)).trim().toLowerCase();
            const promocion = textoPromo === "" ? actual.promocion : (textoPromo === "s" || textoPromo === "si");

            if (isNaN(precio) || precio <= 0) {
                console.log("Datos invalidos: el precio debe ser mayor a 0");
            } else if (!categoria) {
                console.log(`Etiqueta invalida: usa ${cliente.CATEGORIAS.join(", ")}`);
            } else if (stock === null) {
                console.log("Stock invalido: debe ser un entero mayor o igual a 0");
            } else {
                console.log(`\nSe actualizara el producto #${id} a "${nombre}" [${categoria}] - $${precio.toFixed(2)}${promocion ? " (EN PROMOCION)" : ""} | stock: ${stock}`);
                if (await confirmar(rl, "¿Deseas confirmar?")) {
                    cocina.editarProducto(id, nombre, precio, categoria, promocion, stock);
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
            const id = Number(await rl.question("\nId del pedido a preparar: "));

            if (isNaN(id) || !pendientes.some(pedido => pedido.id === id)) {
                console.log("Id de pedido invalido o no esta pendiente");
            } else {
                console.log(`\nSe empezara a preparar el pedido #${id}`);
                if (await confirmar(rl, "¿Deseas confirmar?")) {
                    // Se prepara en segundo plano: el resultado llega a caja por callback
                    cocina.prepararPedido(id)
                        .then(pedido => console.log(`[COCINA] Pedido #${pedido.id} terminado`))
                        .catch(error => console.log(`[COCINA] Fallo la preparacion: ${error.message}`));
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
        const promo = producto.promocion ? " (EN PROMOCION)" : "";
        console.log(`${producto.id}. ${producto.nombre} [${producto.categoria}] - $${producto.precio.toFixed(2)}${promo}`);
    });
}

async function menuBusquedaCocina(rl) {
    let opcion = "";

    while (opcion !== "0") {
        limpiar();
        console.log("\n=== Buscar y ordenar productos ===");
        console.log("1. Productos baratos (precio menor o igual a...)");
        console.log("2. Productos caros (precio mayor o igual a...)");
        console.log("3. Buscar por nombre");
        console.log("4. Buscar por etiqueta");
        console.log("5. Ordenar de menor a mayor precio");
        console.log("6. Ordenar de mayor a menor precio");
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
            const texto = (await rl.question("Nombre o parte del nombre: ")).trim();
            if (!texto) {
                console.log("Debes escribir algo para buscar");
            } else {
                imprimirProductos(cocina.buscarPorNombre(texto));
            }
            await pausar(rl);
        } else if (opcion === "4") {
            const etiqueta = (await rl.question(`Etiqueta (${cliente.CATEGORIAS.join("/")}): `)).trim().toLowerCase();
            imprimirProductos(cocina.buscarPorEtiqueta(etiqueta));
            await pausar(rl);
        } else if (opcion === "5") {
            imprimirProductos(cocina.ordenarPorPrecio(true));
            await pausar(rl);
        } else if (opcion === "6") {
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
