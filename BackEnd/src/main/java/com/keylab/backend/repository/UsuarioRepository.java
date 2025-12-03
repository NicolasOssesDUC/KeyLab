package com.keylab.backend.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keylab.backend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Para login / ver si existe
    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);
}