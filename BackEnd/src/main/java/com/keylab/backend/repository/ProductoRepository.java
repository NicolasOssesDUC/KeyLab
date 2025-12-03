package com.keylab.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keylab.backend.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByCategoria(String categoria);

    List<Producto> findByActivoTrue();
}
