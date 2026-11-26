package com.TiendaSonido.TiendaSonido.seguridad;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.TiendaSonido.TiendaSonido.usuarios.Usuario;
import com.TiendaSonido.TiendaSonido.usuarios.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByCorreoIgnoreCase(correo.trim())
                .orElseThrow(() -> new UsernameNotFoundException("Correo no registrado: " + correo));

        return User.withUsername(usuario.getCorreo())
                .password(usuario.getClave())
                .disabled(!usuario.isActivo())
                .authorities("ROLE_" + usuario.getRol().name())
                .build();
    }
}
