package com.TiendaSonido.TiendaSonido.usuarios;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuarios", uniqueConstraints = @UniqueConstraint(columnNames = "correo"))
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20)
    private String run;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(length = 100)
    private String apellidos;

    @Column(nullable = false, unique = true, length = 120)
    private String correo;

    /** Hash BCrypt; nunca se devuelve al frontend. */
    @Column(nullable = false)
    private String clave;

    @Column(length = 100)
    private String region;

    @Column(length = 100)
    private String comuna;

    @Column(length = 300)
    private String direccion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Rol rol;

    @Builder.Default
    @Column(nullable = false)
    private boolean activo = true;

    @Column(updatable = false)
    private LocalDateTime creadoEn;

    @PrePersist
    public void alCrear() {
        if (creadoEn == null) {
            creadoEn = LocalDateTime.now();
        }
        if (rol == null) {
            rol = Rol.CLIENTE;
        }
    }
}
