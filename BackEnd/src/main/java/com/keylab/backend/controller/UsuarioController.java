package com.keylab.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keylab.backend.model.dto.UsuarioRegisterDTO;
import com.keylab.backend.model.dto.UsuarioResponseDTO;

import com.keylab.backend.model.Usuario;
import com.keylab.backend.service.UsuarioService;

import org.springframework.web.bind.annotation.RequestBody; 

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;  


    @GetMapping("/all")
    public List<UsuarioResponseDTO> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    @PostMapping("/save")
    public UsuarioResponseDTO postUsuario(@RequestBody UsuarioRegisterDTO registroDTO) {
        return usuarioService.createUsuario(registroDTO);
    }
    
}
