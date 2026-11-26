package com.TiendaSonido.TiendaSonido.seguridad;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException {
        RespuestaSeguridad.escribir(response, HttpServletResponse.SC_UNAUTHORIZED,
                "NoAutorizado", "Debes iniciar sesión para acceder a este recurso");
    }
}
