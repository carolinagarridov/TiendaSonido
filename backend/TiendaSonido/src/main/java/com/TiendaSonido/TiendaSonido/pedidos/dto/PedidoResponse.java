package com.TiendaSonido.TiendaSonido.pedidos.dto;

import java.util.List;

/** Formato compatible con MisPedidos.jsx y AdminPedidos.jsx de la rama rayenn. */
public record PedidoResponse(
        Long id,
        Long numero,
        String fecha,
        Cliente cliente,
        List<Item> items,
        Long total,
        Entrega entrega,
        String estado) {

    public record Cliente(String correo, String nombre) {
    }

    public record Item(Long productoId, String codigo, String nombre, Integer cantidad, Long precioUnitario) {
    }

    public record Entrega(String tipo, String direccion) {
    }
}
