
const catalogo = [
    { id: 1, nombre: "Cafe americano", precio: 30 },
    { id: 2, nombre: "Capuchino", precio: 45 },
    { id: 3, nombre: "Te chai", precio: 40 },
    { id: 4, nombre: "Pan dulce", precio: 20.5 },
    { id: 5, nombre: "Sandwich", precio: 55 }
];

const pedidosCliente = [];

function consultarProductos() {
    console.log("\n--- Productos disponibles ---");
    for (const producto of catalogo) {
        console.log(`${producto.id}. ${producto.nombre} - $${producto.precio.toFixed(2)}`);
    }
    return catalogo;
}

function agregarProducto(nombre, precio) {
    if (!nombre || isNaN(precio) || precio <= 0) {
        console.log("Producto invalido: se requiere nombre y un precio mayor a 0");
        return null;
    }

    const producto = {
        id: catalogo.length + 1,
        nombre: nombre,
        precio: precio
    };

    catalogo.push(producto);
    console.log(`Producto #${producto.id} agregado: ${nombre} - $${precio.toFixed(2)}`);
    return producto;
}

function buscarProducto(idProducto) {
    return catalogo.find(producto => producto.id === idProducto);
}

function editarProducto(idProducto, nombre, precio) {
    const producto = buscarProducto(idProducto);

    if (!producto) {
        console.log(`Producto con id ${idProducto} no existe`);
        return null;
    }

    if (!nombre || isNaN(precio) || precio <= 0) {
        console.log("Producto invalido: se requiere nombre y un precio mayor a 0");
        return null;
    }

    producto.nombre = nombre;
    producto.precio = precio;
    console.log(`Producto #${producto.id} actualizado: ${nombre} - $${precio.toFixed(2)}`);
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

function crearPedido(cliente, idsProductos) {
    const productos = [];
    let total = 0;

    for (const idProducto of idsProductos) {
        const producto = buscarProducto(idProducto);

        if (!producto) {
            console.log(`Producto con id ${idProducto} no existe, se omite`);
            continue;
        }

        productos.push(producto);
        total += producto.precio;
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
        estado: "pendiente"
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

    const nombres = pedido.productos.map(producto => producto.nombre).join(", ");
    console.log("\n--- Estado de tu pedido ---");
    console.log(`Folio: ${pedido.folio}`);
    console.log(`Cliente: ${pedido.cliente}`);
    console.log(`Productos: ${nombres}`);
    console.log(`Total: $${pedido.total.toFixed(2)}`);
    console.log(`Estado: ${pedido.estado}`);
    return pedido;
}

function listarPedidos() {
    console.log("\n--- Lista de pedidos ---");

    if (pedidosCliente.length === 0) {
        console.log("No hay pedidos registrados");
        return pedidosCliente;
    }

    for (const pedido of pedidosCliente) {
        const nombres = pedido.productos.map(producto => producto.nombre).join(", ");
        console.log(`#${pedido.id} | ${pedido.cliente} | ${nombres} | $${pedido.total.toFixed(2)} | ${pedido.estado}`);
    }
    return pedidosCliente;
}

// mas pruebas
agregarProducto("Galleta", 15);
agregarProducto("Jugo de naranja", 35);
agregarProducto("Chocolate caliente", 40);

module.exports = {
    catalogo,
    pedidosCliente,
    consultarProductos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    buscarProducto,
    crearPedido,
    listarPedidos,
    consultarPedidoPorFolio
};
