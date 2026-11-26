package com.TiendaSonido.TiendaSonido.catalogo;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.TiendaSonido.TiendaSonido.catalogo.dto.ProductoRequest;
import com.TiendaSonido.TiendaSonido.common.BadRequestException;
import com.TiendaSonido.TiendaSonido.common.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductoService {

    private final ProductoRepository repository;

    public List<Producto> listar(String categoria) {
        if (categoria == null || categoria.isBlank() || categoria.equalsIgnoreCase("Todas")) {
            return repository.findAll();
        }
        return repository.findByCategoriaIgnoreCase(categoria);
    }

    public Producto buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + id));
    }

    @Transactional
    public Producto crear(ProductoRequest request) {
        String codigo = request.getCodigo().trim().toUpperCase();
        if (repository.existsByCodigoIgnoreCase(codigo)) {
            throw new BadRequestException("El código " + codigo + " ya existe");
        }
        Producto producto = new Producto();
        aplicar(request, producto);
        producto.setCodigo(codigo);
        return repository.save(producto);
    }

    @Transactional
    public Producto actualizar(Long id, ProductoRequest request) {
        Producto producto = buscar(id);
        String codigo = request.getCodigo().trim().toUpperCase();
        if (repository.findByCodigoIgnoreCase(codigo)
                .filter(otro -> !otro.getId().equals(id))
                .isPresent()) {
            throw new BadRequestException("El código " + codigo + " ya existe");
        }
        aplicar(request, producto);
        producto.setCodigo(codigo);
        return repository.save(producto);
    }

    @Transactional
    public void eliminar(Long id) {
        Producto producto = buscar(id);
        repository.delete(producto);
    }

    private void aplicar(ProductoRequest request, Producto producto) {
        producto.setCategoria(request.getCategoria());
        producto.setNombre(request.getNombre().trim());
        producto.setMarca(request.getMarca());
        producto.setModelo(request.getModelo());
        producto.setDescripcion(request.getDescripcion());
        producto.setImagen(request.getImagen());
        producto.setStock(request.getStock());
        producto.setPrecio(request.getPrecio());
    }
}
