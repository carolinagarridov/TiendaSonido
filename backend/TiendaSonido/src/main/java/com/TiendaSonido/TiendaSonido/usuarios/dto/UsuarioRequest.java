package com.TiendaSonido.TiendaSonido.usuarios.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UsuarioRequest {

    private String run;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    private String apellidos;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo no es válido")
    private String correo;

    /** Solo obligatorio al crear; al actualizar, vacío significa "no cambiar". */
    private String clave;

    private String region;
    private String comuna;
    private String direccion;

    /** ADMIN, VENDEDOR o CLIENTE (se acepta en cualquier casing). */
    private String rol;

    private Boolean activo;
}
