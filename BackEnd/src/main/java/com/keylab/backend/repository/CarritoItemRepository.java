package com.keylab.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keylab.backend.model.CarritoItem;

public interface CarritoItemRepository extends JpaRepository<CarritoItem, Long> {
    
}
