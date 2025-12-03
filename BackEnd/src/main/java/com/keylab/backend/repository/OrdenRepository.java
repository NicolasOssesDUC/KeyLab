package com.keylab.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keylab.backend.model.Orden;
import com.keylab.backend.model.Usuario;

public interface OrdenRepository extends JpaRepository<Orden, Long> {

    // Ver órdenes de un cliente
    List<Orden> findByUsuario(Usuario usuario);

    // Buscar por número de orden (para detalle)
    Optional<Orden> findByNumeroOrden(String numeroOrden);
}