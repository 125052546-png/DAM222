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

function buscarBaratos(limite) {
    return cliente.catalogo.filter(producto => producto.precio <= limite);
}

function buscarCaros(limite) {
    return cliente.catalogo.filter(producto => producto.precio >= limite);
}

function buscarPorEtiqueta(etiqueta) {
    return cliente.catalogo.filter(producto => producto.categoria === etiqueta);
}

function buscarBebidas() {
    return buscarPorEtiqueta("bebida");
}

function buscarPostres() {
    return buscarPorEtiqueta("postre");
}

function buscarProductoPorNombre(nombre) {
    return cliente.catalogo.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}

function ordenarPorPrecio(ascendente = true) {
    const copia = [...cliente.catalogo];
    return copia.sort((a, b) => ascendente ? a.precio - b.precio : b.precio - a.precio);
}

function verPedidosActivos() {
    const activos = cliente.pedidosCliente.filter(pedido =>
        pedido.estado !== cliente.ESTADOS_PEDIDO.ENTREGADO && pedido.estado !== cliente.ESTADOS_PEDIDO.CANCELADO
    );

    console.log("\n--- Pedidos activos ---");
    if (activos.length === 0) {
        console.log("No hay pedidos activos");
        return activos;
    }

    for (const pedido of activos) {
        const nombres = pedido.productos.map(producto => producto.nombre).join(", ");
        console.log(`#${pedido.id} | ${pedido.folio} | ${pedido.cliente} | ${nombres} | ${cliente.ETIQUETAS_ESTADO[pedido.estado]}`);
    }
    return activos;
}

function cambiarEstadoPedido(idPedido, nuevoEstado, motivoCancelacion) {
    const pedido = cliente.pedidosCliente.find(pedido => pedido.id === idPedido);

    if (!pedido) {
        console.log(`Pedido #${idPedido} no existe`);
        return null;
    }

    if (!Object.values(cliente.ESTADOS_PEDIDO).includes(nuevoEstado)) {
        console.log(`Estado "${nuevoEstado}" no es valido`);
        return null;
    }

    if (nuevoEstado === cliente.ESTADOS_PEDIDO.CANCELADO) {
        if (!cliente.MOTIVOS_CANCELACION.includes(motivoCancelacion)) {
            console.log("Debes indicar un motivo de cancelacion valido");
            return null;
        }
        pedido.motivoCancelacion = motivoCancelacion;
    } else {
        pedido.motivoCancelacion = null;
    }

    pedido.estado = nuevoEstado;
    console.log(`Pedido #${idPedido} actualizado a "${cliente.ETIQUETAS_ESTADO[nuevoEstado]}"`);
    return pedido;
}

module.exports = {
    verCatalogo,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    buscarBaratos,
    buscarCaros,
    buscarPorEtiqueta,
    buscarBebidas,
    buscarPostres,
    buscarProductoPorNombre,
    ordenarPorPrecio,
    verPedidosActivos,
    cambiarEstadoPedido
};
