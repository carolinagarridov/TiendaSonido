package com.TiendaSonido.TiendaSonido.autenticacion;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TiendaSonido.TiendaSonido.autenticacion.dto.AuthResponse;
import com.TiendaSonido.TiendaSonido.autenticacion.dto.LoginRequest;
import com.TiendaSonido.TiendaSonido.autenticacion.dto.RegistroRequest;
import com.TiendaSonido.TiendaSonido.usuarios.Usuario;
import com.TiendaSonido.TiendaSonido.usuarios.UsuarioRepository;
import com.TiendaSonido.TiendaSonido.usuarios.dto.UsuarioResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticación", description = "Login, registro y perfil con JWT")
public class AuthController {

    private final AuthService service;
    private final UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión y obtener token JWT")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return service.login(request);
    }

    @PostMapping("/registro")
    @Operation(summary = "Registrar usuario (por defecto rol CLIENTE)")
    public ResponseEntity<AuthResponse> registro(@Valid @RequestBody RegistroRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(request));
    }

    @GetMapping("/perfil")
    @Operation(summary = "Datos del usuario autenticado")
    public UsuarioResponse perfil(@AuthenticationPrincipal UserDetails details) {
        Usuario usuario = usuarioRepository.findByCorreoIgnoreCase(details.getUsername()).orElseThrow();
        return com.TiendaSonido.TiendaSonido.usuarios.UsuarioService.respuesta(usuario);
    }
}
