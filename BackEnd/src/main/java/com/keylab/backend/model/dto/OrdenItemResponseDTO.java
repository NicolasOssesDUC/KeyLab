package com.keylab.backend.model.dto;

import lombok.Data;

@Data
public class OrdenItemResponseDTO {
    private Long id;
    private Long productoId;
    private String productoNombre;
    private int cantidad;
    private Double precioUnitario;
    private Double subtotal;
}
