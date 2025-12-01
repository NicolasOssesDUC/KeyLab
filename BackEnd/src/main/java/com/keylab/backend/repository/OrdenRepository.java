package com.keylab.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keylab.backend.model.Orden;

public interface OrdenRepository extends JpaRepository<Orden, Long> {

    
}