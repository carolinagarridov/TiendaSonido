package com.TiendaSonido.TiendaSonido.usuarios;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.TiendaSonido.TiendaSonido.common.BadRequestException;
import com.TiendaSonido.TiendaSonido.common.ResourceNotFoundException;
import com.TiendaSonido.TiendaSonido.usuarios.dto.UsuarioRequest;
import com.TiendaSonido.TiendaSonido.usuarios.dto.UsuarioResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UsuarioService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public List<UsuarioResponse> listar() {
        return repository.findAll().stream().map(UsuarioService::respuesta).toList();
    }

    public UsuarioResponse buscarPorId(Long id) {
        return repository.findById(id).map(UsuarioService::respuesta)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + id));
    }

    @Transactional
    public UsuarioResponse crear(UsuarioRequest request) {
        String correo = request.getCorreo().trim().toLowerCase();
        if (repository.existsByCorreoIgnoreCase(correo)) {
            throw new BadRequestException("Ese correo ya está registrado");
        }
        if (request.getClave() == null || request.getClave().isBlank()) {
            throw new BadRequestException("La contraseña es obligatoria");
        }

        Usuario usuario = new Usuario();
        aplicar(request, usuario);
        usuario.setCorreo(correo);
        usuario.setClave(passwordEncoder.encode(request.getClave()));
        usuario.setRol(parsearRol(request.getRol(), Rol.CLIENTE));
        usuario.setActivo(request.getActivo() == null || request.getActivo());
        return respuesta(repository.save(usuario));
    }

    @Transactional
    public UsuarioResponse actualizar(Long id, UsuarioRequest request) {
        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + id));

        String correoNuevo = request.getCorreo() == null ? usuario.getCorreo()
                : request.getCorreo().trim().toLowerCase();
        if (!usuario.getCorreo().equalsIgnoreCase(correoNuevo)
                && repository.existsByCorreoIgnoreCase(correoNuevo)) {
            throw new BadRequestException("Ese correo ya está registrado");
        }

        aplicar(request, usuario);
        usuario.setCorreo(correoNuevo);
        if (request.getClave() != null && !request.getClave().isBlank()) {
            usuario.setClave(passwordEncoder.encode(request.getClave()));
        }
        if (request.getRol() != null && !request.getRol().isBlank()) {
            usuario.setRol(parsearRol(request.getRol(), usuario.getRol()));
        }
        if (request.getActivo() != null) {
            usuario.setActivo(request.getActivo());
        }
        return respuesta(repository.save(usuario));
    }

    @Transactional
    public void eliminar(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Usuario no encontrado: " + id);
        }
        repository.deleteById(id);
    }

    private void aplicar(UsuarioRequest request, Usuario usuario) {
        if (request.getNombre() != null) {
            usuario.setNombre(request.getNombre().trim());
        }
        if (request.getApellidos() != null) {
            usuario.setApellidos(request.getApellidos().trim());
        }
        if (request.getRun() != null) {
            usuario.setRun(request.getRun().trim());
        }
        if (request.getRegion() != null) {
            usuario.setRegion(request.getRegion().trim());
        }
        if (request.getComuna() != null) {
            usuario.setComuna(request.getComuna().trim());
        }
        if (request.getDireccion() != null) {
            usuario.setDireccion(request.getDireccion().trim());
        }
    }

    private Rol parsearRol(String texto, Rol porDefecto) {
        if (texto == null || texto.isBlank()) {
            return porDefecto;
        }
        try {
            return Rol.desde(texto);
        } catch (IllegalArgumentException ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

    public static UsuarioResponse respuesta(Usuario usuario) {
        return UsuarioResponse.builder()
                .id(usuario.getId())
                .run(usuario.getRun())
                .nombre(usuario.getNombre())
                .apellidos(usuario.getApellidos())
                .correo(usuario.getCorreo())
                .region(usuario.getRegion())
                .comuna(usuario.getComuna())
                .direccion(usuario.getDireccion())
                .rol(usuario.getRol().enMinusculas())
                .activo(usuario.isActivo())
                .creadoEn(usuario.getCreadoEn())
                .build();
    }
}
