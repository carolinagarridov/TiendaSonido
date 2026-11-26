package com.TiendaSonido.TiendaSonido.pedidos;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.TiendaSonido.TiendaSonido.pedidos.dto.PedidoRequest;
import com.TiendaSonido.TiendaSonido.pedidos.dto.PedidoResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/boletas")
@RequiredArgsConstructor
@Tag(name = "Pedidos / Boletas", description = "Compra de clientes y administración de estados")
public class PedidoController {

    private final PedidoService service;

    @PostMapping
    @Operation(summary = "Confirmar pedido (cliente autenticado; descuenta stock)")
    public ResponseEntity<PedidoResponse> crear(@Valid @RequestBody PedidoRequest request,
            @AuthenticationPrincipal UserDetails details) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(request, details.getUsername()));
    }

    @GetMapping("/mias")
    @Operation(summary = "Pedidos del usuario autenticado")
    public List<PedidoResponse> mios(@AuthenticationPrincipal UserDetails details) {
        return service.listarMios(details.getUsername());
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','VENDEDOR')")
    @Operation(summary = "Todos los pedidos (ADMIN o VENDEDOR)")
    public List<PedidoResponse> todos() {
        return service.listarTodos();
    }

    @GetMapping("/{numero}")
    @PreAuthorize("hasAnyRole('ADMIN','VENDEDOR')")
    @Operation(summary = "Pedido por número (ADMIN o VENDEDOR)")
    public PedidoResponse buscar(@PathVariable Long numero) {
        return service.buscar(numero);
    }

    @PatchMapping("/{numero}/estado")
    @PreAuthorize("hasAnyRole('ADMIN','VENDEDOR')")
    @Operation(summary = "Cambiar estado: En preparación / Despachado / Entregado")
    public PedidoResponse cambiarEstado(@PathVariable Long numero, @RequestParam String estado) {
        return service.cambiarEstado(numero, estado);
    }
}
