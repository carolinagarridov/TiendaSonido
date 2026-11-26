package com.TiendaSonido.TiendaSonido.catalogo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductoRequest {

    @NotBlank(message = "El código es obligatorio")
    private String codigo;

    private String categoria;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    private String marca;
    private String modelo;
    private String descripcion;
    private String imagen;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;

    @NotNull(message = "El precio es obligatorio")
    @Min(value = 1, message = "El precio debe ser mayor a 0")
    private Long precio;
}
