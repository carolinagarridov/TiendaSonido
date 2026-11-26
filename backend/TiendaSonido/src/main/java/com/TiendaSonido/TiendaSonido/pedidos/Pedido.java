package com.TiendaSonido.TiendaSonido.pedidos;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.TiendaSonido.TiendaSonido.usuarios.Usuario;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long numero;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Column(nullable = false, length = 120)
    private String clienteCorreo;

    @Column(nullable = false, length = 120)
    private String clienteNombre;

    @Column(nullable = false)
    private Long total;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoEntrega tipoEntrega;

    @Column(length = 300)
    private String direccionEntrega;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private EstadoPedido estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PedidoItem> items = new ArrayList<>();

    @PrePersist
    public void alCrear() {
        if (fecha == null) {
            fecha = LocalDateTime.now();
        }
        if (estado == null) {
            estado = EstadoPedido.EN_PREPARACION;
        }
    }

    public void agregarItem(PedidoItem item) {
        items.add(item);
        item.setPedido(this);
    }
}
