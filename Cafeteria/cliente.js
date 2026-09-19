
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
        cliente: cliente,
        productos: productos,
        total: total
    };

    pedidosCliente.push(pedido);
    console.log(`Pedido #${pedido.id} creado para ${cliente} - Total: $${total.toFixed(2)}`);
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
        console.log(`#${pedido.id} | ${pedido.cliente} | ${nombres} | $${pedido.total.toFixed(2)}`);
    }
    return pedidosCliente;
}

// mas pruebas
agregarProducto("Galleta", 15);
agregarProducto("Jugo de naranja", 35);
agregarProducto("Chocolate caliente", 40);

module.exports = { catalogo, pedidosCliente, consultarProductos, agregarProducto, buscarProducto, crearPedido, listarPedidos };
