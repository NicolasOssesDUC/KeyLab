package com.keylab.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keylab.backend.model.OrdenItem;

public interface OrdenItemRepository extends JpaRepository<OrdenItem, Long> {

    
}