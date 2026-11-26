package com.TiendaSonido.TiendaSonido.usuarios.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UsuarioResponse {

    private Long id;
    private String run;
    private String nombre;
    private String apellidos;
    private String correo;
    private String region;
    private String comuna;
    private String direccion;
    private String rol;
    private boolean activo;
    private LocalDateTime creadoEn;
}
