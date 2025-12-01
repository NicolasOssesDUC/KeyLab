package com.keylab.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keylab.backend.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    
} 
