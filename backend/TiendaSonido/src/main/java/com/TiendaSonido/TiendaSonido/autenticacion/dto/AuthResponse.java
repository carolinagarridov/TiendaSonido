package com.TiendaSonido.TiendaSonido.autenticacion.dto;

public record AuthResponse(
        String token,
        String tokenType,
        long expiresIn,
        Long id,
        String run,
        String nombre,
        String apellidos,
        String correo,
        String region,
        String comuna,
        String direccion,
        String rol,
        boolean activo) {
}
