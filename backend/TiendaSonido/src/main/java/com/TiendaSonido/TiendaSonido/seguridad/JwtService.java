package com.TiendaSonido.TiendaSonido.seguridad;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/** Emite y valida tokens JWT HS256. */
@Component
public class JwtService {

    private final SecretKey key;
    private final long expirationMs;

    public JwtService(@Value("${security.jwt.secret}") String secret,
            @Value("${security.jwt.expiration-ms}") long expirationMs) {
        this.key = Keys.hmacShaKeyFor(claveSegura(secret));
        this.expirationMs = expirationMs;
    }

    private byte[] claveSegura(String secret) {
        byte[] bytes;
        try {
            bytes = Decoders.BASE64.decode(secret);
        } catch (RuntimeException ex) {
            bytes = secret.getBytes(StandardCharsets.UTF_8);
        }
        if (bytes.length >= 32) {
            return bytes;
        }
        try {
            return MessageDigest.getInstance("SHA-256").digest(secret.getBytes(StandardCharsets.UTF_8));
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 no disponible", ex);
        }
    }

    public String generarToken(UserDetails usuario) {
        var roles = usuario.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        var ahora = new Date();
        return Jwts.builder()
                .subject(usuario.getUsername())
                .claim("roles", roles)
                .issuedAt(ahora)
                .expiration(new Date(ahora.getTime() + expirationMs))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public String extraerCorreo(String token) {
        return parsear(token).getSubject();
    }

    public boolean esValido(String token, UserDetails usuario) {
        Claims claims = parsear(token);
        return claims.getSubject().equalsIgnoreCase(usuario.getUsername())
                && claims.getExpiration().after(new Date());
    }

    public long getExpirationMs() {
        return expirationMs;
    }

    private Claims parsear(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }
}
