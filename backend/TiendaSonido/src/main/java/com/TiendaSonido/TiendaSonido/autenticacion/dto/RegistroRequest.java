package com.TiendaSonido.TiendaSonido.autenticacion.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegistroRequest(
        String run,
        @NotBlank(message = "El nombre es obligatorio") String nombre,
        String apellidos,
        @NotBlank(message = "El correo es obligatorio") @Email(message = "El correo no es válido") String correo,
        @NotBlank(message = "La contraseña es obligatoria") @Size(min = 4, max = 10, message = "La contraseña debe tener entre 4 y 10 caracteres") String clave,
        String region,
        String comuna,
        String direccion,
        String rol) {
}
