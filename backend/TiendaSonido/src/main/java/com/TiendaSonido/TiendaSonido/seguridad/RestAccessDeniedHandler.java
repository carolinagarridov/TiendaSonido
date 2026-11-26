package com.TiendaSonido.TiendaSonido.seguridad;

import java.io.IOException;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RestAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException {
        RespuestaSeguridad.escribir(response, HttpServletResponse.SC_FORBIDDEN,
                "Prohibido", "Tu rol no tiene permiso para esta operación");
    }
}
