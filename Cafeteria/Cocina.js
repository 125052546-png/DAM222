const cliente = require("./cliente");
const caja = require("./caja");

function verCatalogo() {
    return cliente.consultarProductos();
}

function agregarProducto(nombre, precio, categoria, promocion, stock) {
    return cliente.agregarProducto(nombre, precio, categoria, stock, promocion);
}

function editarProducto(idProducto, nombre, precio, categoria, promocion, stock) {
    return cliente.editarProducto(idProducto, nombre, precio, categoria, promocion, stock);
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

// Ignora mayusculas y acentos: "cafe" encuentra "Café americano"
function normalizar(texto) {
    return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function buscarPorNombre(texto) {
    const busqueda = normalizar(texto || "");
    if (!busqueda) return [];
    return cliente.catalogo.filter(producto => normalizar(producto.nombre).includes(busqueda));
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

    for (const pedido of pendientes) {
        const nombres = cliente.describirProductos(pedido);
        console.log(`#${pedido.id} | ${pedido.folio} | ${pedido.cliente} | ${nombres}`);
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

const MOTIVOS_FALLO = [
    "Se acabo un ingrediente",
    "Fallo la maquina de cafe",
    "Se cayo el pedido durante la preparacion",
    "Error en la cocina"
];

// Devuelve una Promise: tras `duracionMs` el pedido queda "listo" (resolve) o falla (reject).
// Al terminar avisa a caja mediante sus callbacks.
function prepararPedido(idPedido, { duracionMs = 3000 + Math.random() * 2000, probabilidadExito = 0.8 } = {}) {
    return new Promise((resolve, reject) => {
        const pedido = cliente.pedidosCliente.find(pedido => pedido.id === idPedido);

        if (!pedido) {
            return reject(new Error(`Pedido #${idPedido} no existe`));
        }

        if (pedido.estado !== "pendiente") {
            return reject(new Error(`Pedido #${idPedido} no esta pendiente (estado: ${pedido.estado})`));
        }

        pedido.estado = "preparando";
        console.log(`Pedido #${idPedido} en preparacion (${(duracionMs / 1000).toFixed(1)} s)...`);

        setTimeout(() => {
            if (Math.random() < probabilidadExito) {
                pedido.estado = "listo";
                caja.notificarEstado(pedido);
                resolve(pedido);
            } else {
                pedido.estado = "cancelado";
                pedido.motivo = MOTIVOS_FALLO[Math.floor(Math.random() * MOTIVOS_FALLO.length)];
                caja.notificarEstado(pedido);
                reject(new Error(pedido.motivo));
            }
        }, duracionMs);
    });
}

module.exports = {
    prepararPedido,
    verCatalogo,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    buscarBaratos,
    buscarCaros,
    buscarPorEtiqueta,
    buscarPorNombre,
    buscarProductoPorNombre,
    ordenarPorPrecio,
    verPedidosActivos,
    cambiarEstadoPedido
};
