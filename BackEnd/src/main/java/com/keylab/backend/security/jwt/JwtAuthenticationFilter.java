package com.keylab.backend.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;
    
    //servicio (ApplicationConfig)
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // 1. Verificar si el header existe y empieza con "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Extraer el token (quitar "Bearer ")
        jwt = authHeader.substring(7);
        
        // 3. Extraer el email del token
        userEmail = jwtService.extractUsername(jwt);

        // 4. Si hay email y el usuario no está autenticado todavía en el contexto
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // Cargar detalles del usuario desde la BD
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // 5. Validar el token
            if (jwtService.isTokenValid(jwt, userDetails)) {
                
                // Crear objeto de autenticación
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                
                // Establecer la autenticación en el contexto (Login exitoso para esta petición)
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        // Continuar con el siguiente filtro de la cadena
        filterChain.doFilter(request, response);
    }
}
