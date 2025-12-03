package com.keylab.backend.security.auth;

import com.keylab.backend.model.Usuario;
import com.keylab.backend.model.dto.UsuarioRegisterDTO;
import com.keylab.backend.repository.UsuarioRepository;
import com.keylab.backend.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(UsuarioRegisterDTO request) {
        // Crea el usuario manualmente (similar a tu convertToEntity)
        Usuario user = new Usuario();
        user.setNombre(request.getNombre());
        user.setApellido(request.getApellido());
        user.setEmail(request.getEmail());
        user.setTelefono(request.getTelefono());
        user.setFechaNacimiento(request.getFechaNacimiento());
        
        // Encripta password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPasswordHash(passwordEncoder.encode(request.getPassword())); // Legacy 
        
        user.setRol("CLIENTE");
        user.setActivo(true);

        repository.save(user);
        
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
    
}
