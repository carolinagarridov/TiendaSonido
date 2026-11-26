package com.TiendaSonido.TiendaSonido.pedidos;

public enum TipoEntrega {
    DESPACHO,
    RETIRO;

    public static TipoEntrega desde(String texto) {
        if (texto == null || texto.isBlank()) {
            return DESPACHO;
        }
        return "retiro".equalsIgnoreCase(texto.trim()) ? RETIRO : DESPACHO;
    }

    public String enMinusculas() {
        return name().toLowerCase();
    }
}
