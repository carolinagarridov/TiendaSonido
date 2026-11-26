package com.TiendaSonido.TiendaSonido.pedidos.dto;

import java.util.List;

public record PedidoRequest(
        Long usuarioId,
        String tipoEntrega,
        String direccionEntrega,
        Long total,
        List<ItemRequest> items) {

    public record ItemRequest(Long productoId, String codigo, Integer cantidad, Long precioUnitario) {
    }
}
