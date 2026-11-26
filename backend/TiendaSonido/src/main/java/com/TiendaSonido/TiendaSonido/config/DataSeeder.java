package com.TiendaSonido.TiendaSonido.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.TiendaSonido.TiendaSonido.catalogo.ProductoRepository;
import com.TiendaSonido.TiendaSonido.catalogo.ProductosSemilla;
import com.TiendaSonido.TiendaSonido.usuarios.Rol;
import com.TiendaSonido.TiendaSonido.usuarios.Usuario;
import com.TiendaSonido.TiendaSonido.usuarios.UsuarioRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/** Carga el catálogo y los usuarios de prueba una sola vez al iniciar. */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationRunner {

    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        if (productoRepository.count() == 0) {
            productoRepository.saveAll(ProductosSemilla.lista());
            log.info("Catálogo sembrado: {} productos", productoRepository.count());
        }

        crearSiFalta("admin@sonidovivo.cl", "admin123", "Admin", "Sonido Vivo", Rol.ADMIN);
        crearSiFalta("vendedor@sonidovivo.cl", "vende123", "Vendedor", "Sonido Vivo", Rol.VENDEDOR);
        crearSiFalta("cliente@sonidovivo.cl", "cliente123", "Cliente", "Sonido Vivo", Rol.CLIENTE);
    }

    private void crearSiFalta(String correo, String clave, String nombre, String apellidos, Rol rol) {
        if (usuarioRepository.findByCorreoIgnoreCase(correo).isPresent()) {
            return;
        }
        Usuario usuario = new Usuario();
        usuario.setCorreo(correo);
        usuario.setClave(passwordEncoder.encode(clave));
        usuario.setNombre(nombre);
        usuario.setApellidos(apellidos);
        usuario.setRun("11111111-1");
        usuario.setRegion("Región de Valparaíso");
        usuario.setComuna("Viña del Mar");
        usuario.setDireccion("Av. Valparaíso 123");
        usuario.setRol(rol);
        usuario.setActivo(true);
        usuarioRepository.save(usuario);
    }
}
