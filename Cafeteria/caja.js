const cliente = require("./cliente");

const TASA_IVA = 0.16;

function calcularTotales(productos) {
    const { subtotal, iva, total } = productos.reduce(
        ({ subtotal, iva, total }, { precio }) => {
            const ivaProducto = precio * TASA_IVA;
            return {
                subtotal: subtotal + precio,
                iva: iva + ivaProducto,
                total: total + precio + ivaProducto
            };
        },
        { subtotal: 0, iva: 0, total: 0 }
    );

    return { subtotal, iva, total };
}

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

function mostrarPedidos() {
    const pedidos = cliente.listarPedidos();
    const total = obtenerTotal();
    console.log(`Total acumulado: $${total.toFixed(2)}`);
    return pedidos;
}

function obtenerTotal() {
    return cliente.pedidosCliente.reduce((acumulado, { total }) => acumulado + total, 0);
}

module.exports = { calcularTotales, agregarPedido, mostrarPedidos, obtenerTotal };
