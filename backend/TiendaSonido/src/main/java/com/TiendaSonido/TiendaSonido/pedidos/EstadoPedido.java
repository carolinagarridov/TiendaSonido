package com.TiendaSonido.TiendaSonido.pedidos;

import java.util.Locale;

public enum EstadoPedido {
    EN_PREPARACION("En preparación"),
    DESPACHADO("Despachado"),
    ENTREGADO("Entregado");

    private final String etiqueta;

    EstadoPedido(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public String getEtiqueta() {
        return etiqueta;
    }

    public static EstadoPedido desde(String texto) {
        if (texto == null || texto.isBlank()) {
            return EN_PREPARACION;
        }
        String valor = texto.toLowerCase(Locale.ROOT);
        if (valor.contains("despach")) {
            return DESPACHADO;
        }
        if (valor.contains("entreg")) {
            return ENTREGADO;
        }
        return EN_PREPARACION;
    }
}
