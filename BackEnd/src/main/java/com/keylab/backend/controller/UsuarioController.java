package com.keylab.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.keylab.backend.model.dto.UsuarioRegisterDTO;
import com.keylab.backend.model.dto.UsuarioResponseDTO;
import com.keylab.backend.service.UsuarioService;

@RestController
@RequestMapping("/api/v1/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // GET: Listar todos los usuarios
    @GetMapping
    public List<UsuarioResponseDTO> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    // GET: Buscar usuario por id
    @GetMapping("/{id}")
    public UsuarioResponseDTO getUsuarioById(@PathVariable Long id) {
        return usuarioService.getUsuarioById(id);
    }

    // POST: Registrar usuario
    @PostMapping
    public UsuarioResponseDTO crearUsuario(@RequestBody UsuarioRegisterDTO registroDTO) {
        return usuarioService.createUsuario(registroDTO);
    }

    // PUT: Actualizar usuario
    @PutMapping("/{id}")
    public UsuarioResponseDTO updateUsuario(@PathVariable Long id,
                                            @RequestBody UsuarioRegisterDTO datos) {
        return usuarioService.updateUsuario(id, datos);
    }

    // DELETE: Borrado físico
    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
    }

    // PATCH: Desactivar usuario
    @PatchMapping("/{id}/desactivar")
    public void desactivarUsuario(@PathVariable Long id) {
        usuarioService.desactivarUsuario(id);
    }
}