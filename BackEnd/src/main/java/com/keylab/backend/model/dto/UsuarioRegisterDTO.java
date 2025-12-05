package com.keylab.backend.model.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UsuarioRegisterDTO {
    private String email;
    private String password;
    private String nombre;
    private String apellido;
    private String telefono;
    private LocalDate fechaNacimiento;
    private String rol; // Opcional, solo para Admin
}

