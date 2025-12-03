package com.keylab.backend.model;

import java.time.OffsetDateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    // Precio con Double para decimal
    @Column(nullable = false)
    private Double precio;

    @Column(nullable = false)
    private String categoria;

    private String subcategoria;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(nullable = false)
    private int stock = 0;

    private String descripcion;

    // Producto activo o deshabilitado
    @Column(nullable = false)
    private boolean activo = true;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;


    
    @PrePersist
    private void onCreate() {
        this.createdAt = OffsetDateTime.now();
        this.updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    private void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }
}
