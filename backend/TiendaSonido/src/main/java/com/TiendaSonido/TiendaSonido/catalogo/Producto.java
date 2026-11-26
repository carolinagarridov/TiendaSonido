package com.TiendaSonido.TiendaSonido.catalogo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "productos", uniqueConstraints = @UniqueConstraint(columnNames = "codigo"))
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String codigo;

    @Column(length = 80)
    private String categoria;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(length = 80)
    private String marca;

    @Column(length = 80)
    private String modelo;

    @Column(length = 500)
    private String descripcion;

    @Column(length = 255)
    private String imagen;

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    private Long precio;

    /** Constructor usado por el catálogo semilla. */
    public Producto(String codigo, String categoria, String nombre, String marca, String modelo,
            Integer stock, Long precio, String descripcion) {
        this.codigo = codigo;
        this.categoria = categoria;
        this.nombre = nombre;
        this.marca = marca;
        this.modelo = modelo;
        this.stock = stock;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}
