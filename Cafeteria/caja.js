const cliente = require("./cliente");

const IVA = 0.16;

// items: [{ id, cantidad }]
function agregarPedido(nombreCliente, items) {
    return cliente.crearPedido(nombreCliente, items);
}

const callbacksEstado = [];
const notificaciones = [];

// Registra un callback(pedido, mensaje) que se ejecuta cada vez que un pedido termina o se cancela
function registrarCallbackEstado(callback) {
    if (typeof callback !== "function") {
        throw new TypeError("El callback debe ser una funcion");
    }
    callbacksEstado.push(callback);
}

function notificarEstado(pedido) {
    const mensaje = pedido.estado === "cancelado"
        ? `Pedido #${pedido.id} (${pedido.folio}) de ${pedido.cliente} CANCELADO. Razon: ${pedido.motivo}`
        : `Pedido #${pedido.id} (${pedido.folio}) de ${pedido.cliente} esta LISTO para entregar`;

    notificaciones.push(mensaje);
    callbacksEstado.forEach(callback => callback(pedido, mensaje));
}

function cancelarPedido(idPedido, motivo) {
    const pedido = cliente.pedidosCliente.find(pedido => pedido.id === idPedido);

    if (!pedido) {
        console.log(`Pedido #${idPedido} no existe`);
        return null;
    }

    if (pedido.estado === "listo" || pedido.estado === "cancelado") {
        console.log(`Pedido #${idPedido} ya esta ${pedido.estado}, no se puede cancelar`);
        return null;
    }

    pedido.estado = "cancelado";
    pedido.motivo = (motivo || "").trim() || "Cancelado desde caja";
    notificarEstado(pedido);
    return pedido;
}

// Callback por defecto: avisa en consola
registrarCallbackEstado((pedido, mensaje) => console.log(`\n[CAJA] ${mensaje}`));

function calcularTotales(pedidos) {
    const { subtotal } = pedidos.filter(pedido => pedido.estado !== "cancelado").reduce(
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

module.exports = {
    agregarPedido,
    mostrarPedidos,
    obtenerTotal,
    calcularTotales,
    registrarCallbackEstado,
    notificarEstado,
    cancelarPedido,
    notificaciones
};
