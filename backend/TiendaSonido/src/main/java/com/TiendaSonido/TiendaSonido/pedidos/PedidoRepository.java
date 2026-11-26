package com.TiendaSonido.TiendaSonido.pedidos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findAllByOrderByNumeroDesc();

    List<Pedido> findByClienteCorreoIgnoreCaseOrderByNumeroDesc(String correo);

    List<Pedido> findByUsuarioIdOrderByNumeroDesc(Long usuarioId);

    Optional<Pedido> findTopByOrderByNumeroDesc();

    Optional<Pedido> findByNumero(Long numero);
}
