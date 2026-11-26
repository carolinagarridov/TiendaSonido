package com.TiendaSonido.TiendaSonido.pedidos;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.TiendaSonido.TiendaSonido.catalogo.Producto;
import com.TiendaSonido.TiendaSonido.catalogo.ProductoRepository;
import com.TiendaSonido.TiendaSonido.common.BadRequestException;
import com.TiendaSonido.TiendaSonido.common.ResourceNotFoundException;
import com.TiendaSonido.TiendaSonido.pedidos.dto.PedidoRequest;
import com.TiendaSonido.TiendaSonido.pedidos.dto.PedidoResponse;
import com.TiendaSonido.TiendaSonido.usuarios.Usuario;
import com.TiendaSonido.TiendaSonido.usuarios.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PedidoService {

    private final PedidoRepository repository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public List<PedidoResponse> listarTodos() {
        return repository.findAllByOrderByNumeroDesc().stream().map(PedidoService::respuesta).toList();
    }

    public List<PedidoResponse> listarMios(String correo) {
        return repository.findByClienteCorreoIgnoreCaseOrderByNumeroDesc(correo).stream()
                .map(PedidoService::respuesta)
                .toList();
    }

    public PedidoResponse buscar(Long numero) {
        return repository.findByNumero(numero).map(PedidoService::respuesta)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado: #" + numero));
    }

    @Transactional
    public PedidoResponse crear(PedidoRequest request, String correoSesion) {
        if (request.items() == null || request.items().isEmpty()) {
            throw new BadRequestException("El pedido debe tener al menos un producto");
        }

        Usuario usuario = resolverUsuario(request.usuarioId(), correoSesion);
        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setClienteCorreo(usuario.getCorreo());
        pedido.setClienteNombre((usuario.getNombre() + " " + usuario.getApellidos()).trim());
        pedido.setTipoEntrega(TipoEntrega.desde(request.tipoEntrega()));
        pedido.setDireccionEntrega(request.direccionEntrega());
        pedido.setEstado(EstadoPedido.EN_PREPARACION);

        long total = 0L;
        for (PedidoRequest.ItemRequest item : request.items()) {
            Producto producto = resolverProducto(item);
            int cantidad = item.cantidad() == null ? 1 : item.cantidad();
            if (cantidad <= 0) {
                throw new BadRequestException("La cantidad debe ser mayor a 0");
            }
            if (producto.getStock() == null || producto.getStock() < cantidad) {
                throw new BadRequestException("Stock insuficiente para " + producto.getNombre());
            }

            producto.setStock(producto.getStock() - cantidad);
            productoRepository.save(producto);

            PedidoItem detalle = new PedidoItem();
            detalle.setProductoId(producto.getId());
            detalle.setCodigo(producto.getCodigo());
            detalle.setNombre(producto.getNombre());
            detalle.setCantidad(cantidad);
            detalle.setPrecioUnitario(producto.getPrecio());
            pedido.agregarItem(detalle);

            total += producto.getPrecio() * cantidad;
        }

        pedido.setTotal(total);
        pedido.setNumero(siguienteNumero());
        return respuesta(repository.save(pedido));
    }

    @Transactional
    public PedidoResponse cambiarEstado(Long numero, String estado) {
        Pedido pedido = repository.findByNumero(numero)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado: #" + numero));
        pedido.setEstado(EstadoPedido.desde(estado));
        return respuesta(repository.save(pedido));
    }

    private Usuario resolverUsuario(Long usuarioId, String correoSesion) {
        if (usuarioId != null) {
            return usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + usuarioId));
        }
        return usuarioRepository.findByCorreoIgnoreCase(correoSesion)
                .orElseThrow(() -> new BadRequestException("No se pudo identificar al cliente del pedido"));
    }

    private Producto resolverProducto(PedidoRequest.ItemRequest item) {
        Producto producto = null;
        if (item.productoId() != null) {
            producto = productoRepository.findById(item.productoId()).orElse(null);
        }
        if (producto == null && item.codigo() != null && !item.codigo().isBlank()) {
            producto = productoRepository.findByCodigoIgnoreCase(item.codigo()).orElse(null);
        }
        if (producto == null) {
            throw new ResourceNotFoundException("Producto no encontrado en el pedido");
        }
        return producto;
    }

    private Long siguienteNumero() {
        return repository.findTopByOrderByNumeroDesc()
                .map(pedido -> pedido.getNumero() + 1)
                .orElse(1001L);
    }

    public static PedidoResponse respuesta(Pedido pedido) {
        List<PedidoResponse.Item> items = pedido.getItems().stream()
                .map(item -> new PedidoResponse.Item(
                        item.getProductoId(),
                        item.getCodigo(),
                        item.getNombre(),
                        item.getCantidad(),
                        item.getPrecioUnitario()))
                .toList();

        return new PedidoResponse(
                pedido.getId(),
                pedido.getNumero(),
                pedido.getFecha() == null ? null : pedido.getFecha().toString(),
                new PedidoResponse.Cliente(pedido.getClienteCorreo(), pedido.getClienteNombre()),
                items,
                pedido.getTotal(),
                new PedidoResponse.Entrega(
                        pedido.getTipoEntrega().enMinusculas(),
                        pedido.getDireccionEntrega()),
                pedido.getEstado().getEtiqueta());
    }
}
