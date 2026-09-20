const cliente = require("./cliente");

function verCatalogo() {
    return cliente.consultarProductos();
}

function agregarProducto(nombre, precio) {
    return cliente.agregarProducto(nombre, precio);
}

function editarProducto(idProducto, nombre, precio) {
    return cliente.editarProducto(idProducto, nombre, precio);
}

function eliminarProducto(idProducto) {
    return cliente.eliminarProducto(idProducto);
}

function verPedidosPendientes() {
    const pendientes = cliente.pedidosCliente.filter(pedido => pedido.estado === "pendiente");

    console.log("\n--- Pedidos pendientes de preparar ---");
    if (pendientes.length === 0) {
        console.log("No hay pedidos pendientes");
        return pendientes;
    }

    for (const pedido of pendientes) {
        const nombres = pedido.productos.map(producto => producto.nombre).join(", ");
        console.log(`#${pedido.id} | ${pedido.cliente} | ${nombres}`);
    }
    return pendientes;
}

function marcarPedidoListo(idPedido) {
    const pedido = cliente.pedidosCliente.find(pedido => pedido.id === idPedido);

    if (!pedido) {
        console.log(`Pedido #${idPedido} no existe`);
        return null;
    }

    if (pedido.estado === "listo") {
        console.log(`Pedido #${idPedido} ya estaba marcado como listo`);
        return pedido;
    }

    pedido.estado = "listo";
    console.log(`Pedido #${idPedido} marcado como listo`);
    return pedido;
}

module.exports = {
    verCatalogo,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    verPedidosPendientes,
    marcarPedidoListo
};
