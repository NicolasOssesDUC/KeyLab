package com.keylab.backend.model;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orden_items")
public class OrdenItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "orden_id", nullable = false)
    private Orden orden;

    @ManyToOne(optional = false)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    // snapshot del producto al momento de la compra
    @Column(name = "producto_nombre")
    private String productoNombre;

    @Column(name = "producto_categoria")
    private String productoCategoria;

    @Column(name = "producto_imagen_url")
    private String productoImagenUrl;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(name = "precio_unitario", nullable = false)
    private Double precioUnitario;

    private Double subtotal;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;


    // se ejecuta al crear
    @PrePersist
    protected void onCreate() {
        this.createdAt = OffsetDateTime.now();
        calcularSubtotal();
    }

    // se ejecuta al actualizar
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
        calcularSubtotal();
    }

    private void calcularSubtotal() {
        if (this.cantidad != null && this.precioUnitario != null) {
            this.subtotal = this.cantidad * this.precioUnitario;
        }
    }
}
