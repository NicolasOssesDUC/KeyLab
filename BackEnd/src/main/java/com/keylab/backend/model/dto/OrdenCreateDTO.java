package com.keylab.backend.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdenCreateDTO {
    private Long usuarioId;
    private List<OrdenItemCreateDTO> items;
    
    private String direccionEnvioCalle;
    private String direccionEnvioNumero;
    private String direccionEnvioDepartamento;
    private String direccionEnvioComuna;
    private String direccionEnvioCiudad;
    private String direccionEnvioRegion;
    private String direccionEnvioCodigoPostal;

    private String contactoNombre;
    private String contactoTelefono;
    private String contactoEmail;

    private String notas;
}
