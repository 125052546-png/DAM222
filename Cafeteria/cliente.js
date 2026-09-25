
const catalogo = [
    { id: 1, nombre: "Cafe americano", precio: 30, categoria: "bebida", stock: 20, promocion: false },
    { id: 2, nombre: "Capuchino", precio: 45, categoria: "bebida", stock: 15, promocion: true },
    { id: 3, nombre: "Te chai", precio: 40, categoria: "bebida", stock: 10, promocion: false },
    { id: 4, nombre: "Pan dulce", precio: 20.5, categoria: "postre", stock: 8, promocion: false },
    { id: 5, nombre: "Sandwich", precio: 55, categoria: "comida", stock: 5, promocion: false }
];

const pedidosCliente = [];

function consultarProductos() {
    console.log("\n--- Productos disponibles ---");
    for (const producto of catalogo) {
        const agotado = producto.stock > 0 ? "" : " (AGOTADO)";
        console.log(`${producto.id}. ${producto.nombre} - $${producto.precio.toFixed(2)}${agotado}`);
    }
    return catalogo;
}

const CATEGORIAS = ["bebida", "postre", "comida", "otro"];

function agregarProducto(nombre, precio, categoria = "otro", stock = 10, promocion = false) {
    if (!nombre || isNaN(precio) || precio <= 0) {
        console.log("Producto invalido: se requiere nombre y un precio mayor a 0");
        return null;
    }

    if (!CATEGORIAS.includes(categoria)) {
        console.log(`Categoria invalida: usa ${CATEGORIAS.join(", ")}`);
        return null;
    }

    if (!Number.isInteger(stock) || stock < 0) {
        console.log("Stock invalido: debe ser un entero mayor o igual a 0");
        return null;
    }

    const producto = {
        id: catalogo.length + 1,
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        stock: stock,
        promocion: promocion
    };

    catalogo.push(producto);
    console.log(`Producto #${producto.id} agregado: ${nombre} [${categoria}] - $${precio.toFixed(2)}${promocion ? " (EN PROMOCION)" : ""} | stock: ${stock}`);
    return producto;
}

function mostrarMenuDinamico() {
    console.log("\n--- Menu del dia ---");

    const disponibles = catalogo.filter(producto => producto.stock > 0);

    if (disponibles.length === 0) {
        console.log("No hay productos disponibles por el momento");
        return disponibles;
    }

    const lineas = disponibles.map(producto => {
        const etiquetaPromo = producto.promocion ? " (EN PROMOCION)" : "";
        const etiquetaStock = producto.stock <= 5 ? " - ultimas piezas" : "";
        return `${producto.id}. ${producto.nombre} [${producto.categoria}] - $${producto.precio.toFixed(2)}${etiquetaPromo}${etiquetaStock}`;
    });

    lineas.forEach(linea => console.log(linea));

    return disponibles;
}

function buscarProducto(idProducto) {
    return catalogo.find(producto => producto.id === idProducto);
}

// categoria y promocion son opcionales: si no se indican, se conservan los actuales
function editarProducto(idProducto, nombre, precio, categoria = undefined, promocion = undefined, stock = undefined) {
    const producto = buscarProducto(idProducto);

    if (!producto) {
        console.log(`Producto con id ${idProducto} no existe`);
        return null;
    }

    if (!nombre || isNaN(precio) || precio <= 0) {
        console.log("Producto invalido: se requiere nombre y un precio mayor a 0");
        return null;
    }

    if (categoria !== undefined && !CATEGORIAS.includes(categoria)) {
        console.log(`Categoria invalida: usa ${CATEGORIAS.join(", ")}`);
        return null;
    }

    if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
        console.log("Stock invalido: debe ser un entero mayor o igual a 0");
        return null;
    }

    producto.nombre = nombre;
    producto.precio = precio;
    if (stock !== undefined) producto.stock = stock;
    if (categoria !== undefined) producto.categoria = categoria;
    if (promocion !== undefined) producto.promocion = promocion;
    console.log(`Producto #${producto.id} actualizado: ${producto.nombre} [${producto.categoria}] - $${precio.toFixed(2)}${producto.promocion ? " (EN PROMOCION)" : ""} | stock: ${producto.stock}`);
    return producto;
}

function eliminarProducto(idProducto) {
    const indice = catalogo.findIndex(producto => producto.id === idProducto);

    if (indice === -1) {
        console.log(`Producto con id ${idProducto} no existe`);
        return false;
    }

    const [eliminado] = catalogo.splice(indice, 1);
    console.log(`Producto #${eliminado.id} eliminado: ${eliminado.nombre}`);
    return true;
}

function generarFolio() {
    let folio;

    do {
        const codigo = Math.floor(1000 + Math.random() * 9000);
        folio = `F-${codigo}`;
    } while (pedidosCliente.some(pedido => pedido.folio === folio));

    return folio;
}

// "2x Capuchino, 1x Pan dulce"
function describirProductos(pedido) {
    return pedido.productos.map(producto => `${producto.cantidad}x ${producto.nombre}`).join(", ");
}

// items: [{ id, cantidad }]
function crearPedido(cliente, items) {
    const productos = [];
    let total = 0;

    for (const { id, cantidad } of items) {
        const producto = buscarProducto(id);

        if (!producto) {
            console.log(`Producto con id ${id} no existe, se omite`);
            continue;
        }

        if (producto.stock <= 0) {
            console.log(`"${producto.nombre}" esta agotado, se omite`);
            continue;
        }

        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            console.log(`Cantidad invalida para "${producto.nombre}", se omite`);
            continue;
        }

        productos.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: cantidad });
        total += producto.precio * cantidad;
    }

    if (productos.length === 0) {
        console.log(`No se creo el pedido de ${cliente}: no hay productos validos`);
        return null;
    }

    const pedido = {
        id: pedidosCliente.length + 1,
        folio: generarFolio(),
        cliente: cliente,
        productos: productos,
        total: total,
        estado: "pendiente",
        motivo: null
    };

    pedidosCliente.push(pedido);
    console.log(`Pedido creado para ${cliente} - Total: $${total.toFixed(2)}`);
    console.log(`Tu folio es: ${pedido.folio} (guardalo para consultar el estado de tu pedido)`);
    return pedido;
}

function consultarPedidoPorFolio(folio) {
    const pedido = pedidosCliente.find(pedido => pedido.folio === (folio || "").trim().toUpperCase());

    if (!pedido) {
        console.log(`No se encontro ningun pedido con el folio "${folio}"`);
        return null;
    }

    const nombres = describirProductos(pedido);
    console.log("\n--- Estado de tu pedido ---");
    console.log(`Folio: ${pedido.folio}`);
    console.log(`Cliente: ${pedido.cliente}`);
    console.log(`Productos: ${nombres}`);
    console.log(`Total: $${pedido.total.toFixed(2)}`);
    console.log(`Estado: ${pedido.estado}`);
    if (pedido.motivo) {
        console.log(`Motivo: ${pedido.motivo}`);
    }
    return pedido;
}

const ESTADOS_FINALES = ["listo", "cancelado"];

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Consulta el pedido cada `intervaloMs` con setTimeout y avisa cada cambio de estado.
// Termina cuando el pedido queda listo/cancelado o se agotan las consultas.
async function seguirPedido(folio, intervaloMs = 1000, maxConsultas = 30) {
    const folioNormalizado = (folio || "").trim().toUpperCase();
    let ultimoEstado = null;

    for (let consulta = 0; consulta < maxConsultas; consulta++) {
        const pedido = pedidosCliente.find(pedido => pedido.folio === folioNormalizado);

        if (!pedido) {
            console.log(`No se encontro ningun pedido con el folio "${folio}"`);
            return null;
        }

        if (pedido.estado !== ultimoEstado) {
            ultimoEstado = pedido.estado;
            const motivo = pedido.motivo ? ` - motivo: ${pedido.motivo}` : "";
            console.log(`[${new Date().toLocaleTimeString()}] Pedido ${pedido.folio}: ${pedido.estado}${motivo}`);
        }

        if (ESTADOS_FINALES.includes(pedido.estado)) {
            return pedido;
        }

        await esperar(intervaloMs);
    }

    console.log("Se dejo de seguir el pedido: sigue en proceso, consultalo mas tarde");
    return pedidosCliente.find(pedido => pedido.folio === folioNormalizado);
}

// Pedidos de prueba para no iniciar el sistema en 0
function cargarPedidosDePrueba() {
    const base = [
        { folio: "F-1001", cliente: "Ana", items: [{ id: 1, cantidad: 2 }, { id: 4, cantidad: 1 }], estado: "pendiente", motivo: null },
        { folio: "F-1002", cliente: "Luis", items: [{ id: 2, cantidad: 1 }, { id: 5, cantidad: 2 }], estado: "pendiente", motivo: null },
        { folio: "F-1003", cliente: "Marta", items: [{ id: 3, cantidad: 1 }], estado: "listo", motivo: null },
        { folio: "F-1004", cliente: "Pedro", items: [{ id: 1, cantidad: 1 }, { id: 2, cantidad: 1 }, { id: 4, cantidad: 3 }], estado: "cancelado", motivo: "Cliente no se presento a recoger" }
    ];

    for (const datos of base) {
        const productos = datos.items.map(({ id, cantidad }) => {
            const { nombre, precio } = buscarProducto(id);
            return { id, nombre, precio, cantidad };
        });
        pedidosCliente.push({
            id: pedidosCliente.length + 1,
            folio: datos.folio,
            cliente: datos.cliente,
            productos: productos,
            total: productos.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0),
            estado: datos.estado,
            motivo: datos.motivo
        });
    }
}

function listarPedidos() {
    console.log("\n--- Lista de pedidos ---");

    if (pedidosCliente.length === 0) {
        console.log("No hay pedidos registrados");
        return pedidosCliente;
    }

    for (const pedido of pedidosCliente) {
        const nombres = describirProductos(pedido);
        console.log(`#${pedido.id} | ${pedido.folio} | ${pedido.cliente} | ${nombres} | $${pedido.total.toFixed(2)} | ${pedido.estado}`);
    }
    return pedidosCliente;
}

// mas pruebas
agregarProducto("Galleta", 15, "postre");
agregarProducto("Jugo de naranja", 35, "bebida");
agregarProducto("Chocolate caliente", 40, "bebida", 10, true);
cargarPedidosDePrueba();

module.exports = {
    CATEGORIAS,
    catalogo,
    pedidosCliente,
    consultarProductos,
    mostrarMenuDinamico,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    buscarProducto,
    crearPedido,
    describirProductos,
    listarPedidos,
    consultarPedidoPorFolio,
    seguirPedido
};
