package com.TiendaSonido.TiendaSonido.common;

import java.time.Instant;
import java.util.Map;

public record ApiError(String error, String mensaje, Map<String, String> campos, Instant timestamp) {

    public static ApiError of(String error, String mensaje) {
        return new ApiError(error, mensaje, Map.of(), Instant.now());
    }

    public static ApiError conCampos(String error, String mensaje, Map<String, String> campos) {
        return new ApiError(error, mensaje, campos, Instant.now());
    }
}
