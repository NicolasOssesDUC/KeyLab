package com.keylab.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.keylab.backend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
}