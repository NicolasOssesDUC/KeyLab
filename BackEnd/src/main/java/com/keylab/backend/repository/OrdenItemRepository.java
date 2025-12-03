package com.keylab.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keylab.backend.model.Orden;
import com.keylab.backend.model.OrdenItem;

public interface OrdenItemRepository extends JpaRepository<OrdenItem, Long> {

    List<OrdenItem> findByOrden(Orden orden);
}