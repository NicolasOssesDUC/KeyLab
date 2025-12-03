package com.keylab.backend.model;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ordenes")
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "numero_orden", nullable = false, unique = true)
    private String numeroOrden;

    @Column(nullable = false)
    private String estado = "PENDIENTE";

    private Double subtotal = 0.0;
    private Double descuento = 0.0;

    @Column(name = "costo_envio")
    private Double costoEnvio = 0.0;

    private Double total = 0.0;

    // Dirección de envío
    @Column(name = "direccion_envio_calle")
    private String direccionEnvioCalle;

    @Column(name = "direccion_envio_numero")
    private String direccionEnvioNumero;

    @Column(name = "direccion_envio_departamento")
    private String direccionEnvioDepartamento;

    @Column(name = "direccion_envio_comuna")
    private String direccionEnvioComuna;

    @Column(name = "direccion_envio_ciudad")
    private String direccionEnvioCiudad;

    @Column(name = "direccion_envio_region")
    private String direccionEnvioRegion;

    @Column(name = "direccion_envio_codigo_postal")
    private String direccionEnvioCodigoPostal;

    // Contacto
    @Column(name = "contacto_nombre")
    private String contactoNombre;

    @Column(name = "contacto_telefono")
    private String contactoTelefono;

    @Column(name = "contacto_email")
    private String contactoEmail;

    private String notas;

    // Fechas automáticas
    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @Column(name = "pagada_at")
    private OffsetDateTime pagadaAt;

    @Column(name = "enviada_at")
    private OffsetDateTime enviadaAt;

    @Column(name = "entregada_at")
    private OffsetDateTime entregadaAt;

    @OneToMany(mappedBy = "orden", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrdenItem> items = new ArrayList<>();


    @PrePersist
    protected void onCreate() {
        this.createdAt = OffsetDateTime.now();
        this.updatedAt = OffsetDateTime.now();
        calcularTotales();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
        calcularTotales();
    }

    public void calcularTotales() {
        this.subtotal = items.stream()
                .mapToDouble(item -> item.getSubtotal() != null ? item.getSubtotal() : 0.0)
                .sum();

        if (this.descuento == null) descuento = 0.0;
        if (this.costoEnvio == null) costoEnvio = 0.0;

        this.total = subtotal - descuento + costoEnvio;

        if (this.total < 0) this.total = 0.0;
    }
}
