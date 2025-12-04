package com.keylab.backend.model.dto;

import java.time.OffsetDateTime;
import java.util.List;

import lombok.Data;



@Data
public class OrdenResponseDTO {

    private Long id;
    private String numeroOrden;
    private String estado;

    private Integer subtotal;
    private Integer descuento;
    private Integer costoEnvio;
    private Integer total;

    // Dirección
    private String direccionEnvioCalle;
    private String direccionEnvioNumero;
    private String direccionEnvioDepartamento;
    private String direccionEnvioComuna;
    private String direccionEnvioCiudad;
    private String direccionEnvioRegion;
    private String direccionEnvioCodigoPostal;

    // Contacto
    private String contactoNombre;
    private String contactoTelefono;
    private String contactoEmail;

    private String notas;

    // Fechas
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private OffsetDateTime pagadaAt;
    private OffsetDateTime enviadaAt;
    private OffsetDateTime entregadaAt;

    // Usuario (solo el ID)
    private Long usuarioId;

    // Items de la orden (DTO)
    private List<OrdenItemResponseDTO> items;

}
