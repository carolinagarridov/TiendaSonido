package com.TiendaSonido.TiendaSonido.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class OpenApiConfig {

    public static final String SEGURIDAD_JWT = "bearerAuth";

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Tienda Sonido Vivo API")
                        .version("v1")
                        .description("API modular: autenticación JWT con roles, catálogo (CRUD) y pedidos/boletas. "
                                + "Usa el botón Authorize y pega el token devuelto por /api/v1/auth/login."))
                .components(new Components().addSecuritySchemes(SEGURIDAD_JWT,
                        new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Token JWT obtenido en /api/v1/auth/login")))
                .addSecurityItem(new SecurityRequirement().addList(SEGURIDAD_JWT));
    }
}
