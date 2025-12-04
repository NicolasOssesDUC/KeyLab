package com.keylab.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoUpdateDTO {
    private String nombre;
    private String descripcion;
    private Double precio;
    private Integer stock;
    private String categoria;
    private String imagenUrl;
    private Boolean disponible;
    
}
