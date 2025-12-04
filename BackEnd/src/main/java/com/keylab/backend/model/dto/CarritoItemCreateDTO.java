package com.keylab.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarritoItemCreateDTO {
    private Long usuarioId;
    private Long productoId;
    private Integer cantidad;
}