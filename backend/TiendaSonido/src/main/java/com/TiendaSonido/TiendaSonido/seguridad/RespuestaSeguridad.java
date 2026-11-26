package com.TiendaSonido.TiendaSonido.seguridad;

import java.io.IOException;
import java.time.Instant;

import jakarta.servlet.http.HttpServletResponse;

/** Escribe respuestas JSON en el filtro de seguridad (sin depender del ObjectMapper del MVC). */
public final class RespuestaSeguridad {

    private RespuestaSeguridad() {
    }

    public static void escribir(HttpServletResponse response, int status, String error, String mensaje)
            throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"error\":\"" + escapar(error)
                + "\",\"mensaje\":\"" + escapar(mensaje)
                + "\",\"campos\":{},\"timestamp\":\"" + Instant.now() + "\"}");
    }

    private static String escapar(String texto) {
        if (texto == null) {
            return "";
        }
        return texto.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", " ")
                .replace("\r", " ");
    }
}
