package com.keylab.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keylab.backend.model.Usuario;
import com.keylab.backend.model.dto.UsuarioRegisterDTO;
import com.keylab.backend.model.dto.UsuarioResponseDTO;
import com.keylab.backend.repository.UsuarioRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    // ---------- MÉTODOS USADOS POR EL CONTROLLER ----------

    // Listar todos como DTO
    public List<UsuarioResponseDTO> getAllUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    // Buscar por id -> DTO
    public UsuarioResponseDTO getUsuarioById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
        return toResponseDTO(usuario);
    }

    // Buscar por email (por si después lo usas en login)
    public Optional<Usuario> getUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    // Crear usuario desde DTO de registro
    public UsuarioResponseDTO createUsuario(UsuarioRegisterDTO registroDTO) {

        validarRegistro(registroDTO);

        if (usuarioRepository.existsByEmail(registroDTO.getEmail())) {
            throw new RuntimeException("Ya existe un usuario con este email");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(registroDTO.getEmail());
        usuario.setNombre(registroDTO.getNombre());
        usuario.setApellido(registroDTO.getApellido());
        usuario.setTelefono(registroDTO.getTelefono());
        usuario.setFechaNacimiento(registroDTO.getFechaNacimiento());

        // Password ENCRIPTADA
        String encodedPass = passwordEncoder.encode(registroDTO.getPassword());
        usuario.setPassword(encodedPass);
        usuario.setPasswordHash(encodedPass); // Legacy

        // Rol (Desde DTO o por defecto)
        if (registroDTO.getRol() != null && !registroDTO.getRol().isBlank()) {
            usuario.setRol(registroDTO.getRol());
        } else {
            usuario.setRol("CLIENTE");
        }
        
        usuario.setActivo(true);

        Usuario guardado = usuarioRepository.save(usuario);
        return toResponseDTO(guardado);
    }

    // Actualizar usuario usando también UsuarioRegisterDTO
    public UsuarioResponseDTO updateUsuario(Long id, UsuarioRegisterDTO datos) {
        Usuario existente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));

        if (datos.getEmail() != null && !datos.getEmail().isBlank()) {
            existente.setEmail(datos.getEmail());
        }
        if (datos.getNombre() != null && !datos.getNombre().isBlank()) {
            existente.setNombre(datos.getNombre());
        }
        if (datos.getApellido() != null && !datos.getApellido().isBlank()) {
            existente.setApellido(datos.getApellido());
        }
        if (datos.getTelefono() != null && !datos.getTelefono().isBlank()) {
            existente.setTelefono(datos.getTelefono());
        }
        if (datos.getFechaNacimiento() != null) {
            existente.setFechaNacimiento(datos.getFechaNacimiento());
        }
        if (datos.getPassword() != null && !datos.getPassword().isBlank()) {
            existente.setPasswordHash(datos.getPassword());
        }

        validarUpdate(datos);

        Usuario actualizado = usuarioRepository.save(existente);
        return toResponseDTO(actualizado);
    }

    // Desactivar usuario (activo = false)
    public void desactivarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
        usuario.setActivo(false);
        usuarioRepository.save(usuario);
    }

    // Borrado físico
    public void deleteUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
        usuarioRepository.delete(usuario);
    }

    // ---------- MAPEOS Y VALIDACIONES INTERNAS ----------

    private UsuarioResponseDTO toResponseDTO(Usuario usuario) {
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(usuario.getId());
        dto.setEmail(usuario.getEmail());
        dto.setNombre(usuario.getNombre());
        dto.setApellido(usuario.getApellido());
        dto.setTelefono(usuario.getTelefono());
        dto.setRol(usuario.getRol());
        dto.setActivo(usuario.isActivo());
        return dto;
    }

    private void validarRegistro(UsuarioRegisterDTO dto) {
        if (dto.getEmail() == null || dto.getEmail().isBlank()) {
            throw new RuntimeException("El email es obligatorio");
        }
        if (dto.getNombre() == null || dto.getNombre().isBlank()) {
            throw new RuntimeException("El nombre es obligatorio");
        }
        if (dto.getApellido() == null || dto.getApellido().isBlank()) {
            throw new RuntimeException("El apellido es obligatorio");
        }
        if (dto.getPassword() == null || dto.getPassword().isBlank()) {
            throw new RuntimeException("La contraseña es obligatoria");
        }
        // telefono y fechaNacimiento pueden ser opcionales
    }

    private void validarUpdate(UsuarioRegisterDTO dto) {
        if (dto.getEmail() != null && dto.getEmail().isBlank()) {
            throw new RuntimeException("El email no puede estar vacío");
        }
        if (dto.getNombre() != null && dto.getNombre().isBlank()) {
            throw new RuntimeException("El nombre no puede estar vacío");
        }
        if (dto.getApellido() != null && dto.getApellido().isBlank()) {
            throw new RuntimeException("El apellido no puede estar vacío");
        }
        // password en update es opcional
    }
}