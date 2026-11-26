package com.TiendaSonido.TiendaSonido.autenticacion;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.TiendaSonido.TiendaSonido.autenticacion.dto.AuthResponse;
import com.TiendaSonido.TiendaSonido.autenticacion.dto.LoginRequest;
import com.TiendaSonido.TiendaSonido.autenticacion.dto.RegistroRequest;
import com.TiendaSonido.TiendaSonido.common.BadRequestException;
import com.TiendaSonido.TiendaSonido.seguridad.JwtService;
import com.TiendaSonido.TiendaSonido.usuarios.Rol;
import com.TiendaSonido.TiendaSonido.usuarios.Usuario;
import com.TiendaSonido.TiendaSonido.usuarios.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByCorreoIgnoreCase(request.correo().trim())
                .orElseThrow(() -> new BadRequestException("Correo o contraseña incorrectos"));

        if (!usuario.isActivo()) {
            throw new BadRequestException("Tu cuenta está desactivada. Contacta a la tienda.");
        }
        if (!passwordEncoder.matches(request.clave(), usuario.getClave())) {
            throw new BadRequestException("Correo o contraseña incorrectos");
        }
        return respuesta(usuario);
    }

    @Transactional
    public AuthResponse registrar(RegistroRequest request) {
        String correo = request.correo().trim().toLowerCase();
        if (usuarioRepository.existsByCorreoIgnoreCase(correo)) {
            throw new BadRequestException("Ese correo ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setRun(request.run());
        usuario.setNombre(request.nombre().trim());
        usuario.setApellidos(request.apellidos());
        usuario.setCorreo(correo);
        usuario.setClave(passwordEncoder.encode(request.clave()));
        usuario.setRegion(request.region());
        usuario.setComuna(request.comuna());
        usuario.setDireccion(request.direccion());
        usuario.setRol(parsearRol(request.rol()));
        usuario.setActivo(true);

        return respuesta(usuarioRepository.save(usuario));
    }

    private Rol parsearRol(String texto) {
        if (texto == null || texto.isBlank()) {
            return Rol.CLIENTE;
        }
        try {
            return Rol.desde(texto);
        } catch (IllegalArgumentException ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

    private AuthResponse respuesta(Usuario usuario) {
        var detalles = User.withUsername(usuario.getCorreo())
                .password(usuario.getClave())
                .authorities("ROLE_" + usuario.getRol().name())
                .build();
        String token = jwtService.generarToken(detalles);

        return new AuthResponse(
                token,
                "Bearer",
                jwtService.getExpirationMs(),
                usuario.getId(),
                usuario.getRun(),
                usuario.getNombre(),
                usuario.getApellidos(),
                usuario.getCorreo(),
                usuario.getRegion(),
                usuario.getComuna(),
                usuario.getDireccion(),
                usuario.getRol().enMinusculas(),
                usuario.isActivo());
    }
}
