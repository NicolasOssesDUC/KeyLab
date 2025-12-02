package com.keylab.backend.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.keylab.backend.model.Usuario;
import com.keylab.backend.repository.UsuarioRepository;
import com.keylab.backend.model.dto.UsuarioRegisterDTO;
import com.keylab.backend.model.dto.UsuarioResponseDTO;



@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;  

    // obtener todos 
    public List<UsuarioResponseDTO> getAllUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    //obtener por id
    public UsuarioResponseDTO getUsuarioById(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) {
            return null;
        }
        return convertToDTO(usuario);
    }

    // crear nuevo usuario(dto registro ----> dto respuesta)
    public UsuarioResponseDTO createUsuario(UsuarioRegisterDTO registroDTO) {
        Usuario usuario = convertToEntity(registroDTO);
        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        return convertToDTO(usuarioGuardado);
    }

    //eliminar 
    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    // mappers

    private UsuarioResponseDTO convertToDTO(Usuario usuario) {
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

    private Usuario convertToEntity(UsuarioRegisterDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setEmail(dto.getEmail());
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setTelefono(dto.getTelefono());
        usuario.setFechaNacimiento(dto.getFechaNacimiento());

        usuario.setRol("CLIENTE"); // Rol por defecto
        usuario.setActivo(true); // Activo por defecto

        //implementar bycrypt aqui en el futuroi
        usuario.setPassword(dto.getPassword());
        usuario.setPasswordHash(dto.getPassword());

        return usuario;
    }

}