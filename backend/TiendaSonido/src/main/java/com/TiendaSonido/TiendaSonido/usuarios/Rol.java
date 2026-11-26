package com.TiendaSonido.TiendaSonido.usuarios;

import java.util.Locale;

/** Roles del sistema. Se almacenan como texto en la BD y como ROLE_* en Spring Security. */
public enum Rol {
    ADMIN,
    VENDEDOR,
    CLIENTE;

    public static Rol desde(String texto) {
        if (texto == null || texto.isBlank()) {
            return CLIENTE;
        }
        String normalizado = texto.trim().toUpperCase(Locale.ROOT);
        for (Rol rol : values()) {
            if (rol.name().equals(normalizado)) {
                return rol;
            }
        }
        throw new IllegalArgumentException("Rol desconocido: " + texto);
    }

    public String enMinusculas() {
        return name().toLowerCase(Locale.ROOT);
    }
}
