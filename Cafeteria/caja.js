const cliente = require("./cliente");

const IVA = 0.16;

function agregarPedido(nombreCliente, idsProductos) {
    const pedido = cliente.crearPedido(nombreCliente, idsProductos);

    if (!pedido) {
        return null;
    }

    const { subtotal, iva, total } = calcularTotales(pedido.productos);
    Object.assign(pedido, { subtotal, iva, total });

    console.log(`Subtotal: $${subtotal.toFixed(2)} | IVA (${TASA_IVA * 100}%): $${iva.toFixed(2)} | Total: $${total.toFixed(2)}`);
    return pedido;
}

function calcularTotales(pedidos) {
    const { subtotal } = pedidos.reduce(
        (acumulado, pedido) => ({ subtotal: acumulado.subtotal + pedido.total }),
        { subtotal: 0 }
    );

    const iva = subtotal * IVA;
    const total = subtotal + iva;

    return { subtotal, iva, total };
}

function mostrarPedidos() {
    const pedidos = cliente.listarPedidos();
    const { subtotal, iva, total } = calcularTotales(pedidos);

    console.log(`Subtotal: $${subtotal.toFixed(2)}`);
    console.log(`IVA (${IVA * 100}%): $${iva.toFixed(2)}`);
    console.log(`Total acumulado: $${total.toFixed(2)}`);

    return pedidos;
}

function obtenerTotal() {
    const { total } = calcularTotales(cliente.pedidosCliente);
    return total;
}

module.exports = { agregarPedido, mostrarPedidos, obtenerTotal, calcularTotales };
