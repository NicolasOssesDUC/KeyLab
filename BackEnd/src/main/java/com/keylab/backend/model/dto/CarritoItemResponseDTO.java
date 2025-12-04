package com.keylab.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarritoItemResponseDTO {
    private Long id;
    private Long productoId;
    private String productoNombre;
    private Integer cantidad;
    private Integer precioUnitario;
}
