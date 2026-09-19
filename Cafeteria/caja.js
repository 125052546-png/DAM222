

const listaPedidos = [];
let totalAcumulado = 0;


function agregarPedido(cliente, producto, precio) {
    if (!cliente || !producto || isNaN(precio) || precio <= 0) {
        console.log("Pedido invalido: se requiere cliente, producto y un precio mayor a 0");
        return null;
    }

    const pedido = {
        id: listaPedidos.length + 1,
        cliente: cliente,
        producto: producto,
        precio: precio
    };

    listaPedidos.push(pedido);
    totalAcumulado += precio;

    console.log(`Pedido #${pedido.id} agregado: ${producto} para ${cliente} - $${precio.toFixed(2)}`);
    return pedido;
}


function mostrarPedidos() {
    console.log("\n--- Lista de pedidos ---");
    for (const pedido of listaPedidos) {
        console.log(`#${pedido.id} | ${pedido.cliente} | ${pedido.producto} | $${pedido.precio.toFixed(2)}`);
    }
    console.log(`Total acumulado: $${totalAcumulado.toFixed(2)}`);
    return listaPedidos;
}


function obtenerTotal() {
    return totalAcumulado;
}

// pruebas
agregarPedido("Ana", "Cafe americano", 30);
agregarPedido("Luis", "Capuchino", 45.5);
agregarPedido("Marta", "Sandwich", 55);

module.exports = { listaPedidos, agregarPedido, mostrarPedidos, obtenerTotal };
