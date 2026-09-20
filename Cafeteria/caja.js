const cliente = require("./cliente");

function agregarPedido(nombreCliente, idsProductos) {
    return cliente.crearPedido(nombreCliente, idsProductos);
}

function mostrarPedidos() {
    const pedidos = cliente.listarPedidos();
    const total = obtenerTotal();
    console.log(`Total acumulado: $${total.toFixed(2)}`);
    return pedidos;
}

function obtenerTotal() {
    return cliente.pedidosCliente.reduce((acumulado, pedido) => acumulado + pedido.total, 0);
}

module.exports = { agregarPedido, mostrarPedidos, obtenerTotal };
