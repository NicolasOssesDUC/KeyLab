package com.keylab.backend.controller;

import com.keylab.backend.model.dto.OrdenCreateDTO;
import com.keylab.backend.model.dto.OrdenResponseDTO;
import com.keylab.backend.service.OrdenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ordenes")
@CrossOrigin("*")
public class OrdenController {

    @Autowired
    private OrdenService ordenService;


    @PostMapping
    public OrdenResponseDTO createOrden(@RequestBody OrdenCreateDTO dto) {
        return ordenService.createOrden(dto);
    }


    @GetMapping("/{id}")
    public OrdenResponseDTO getOrdenById(@PathVariable Long id) {
        return ordenService.getOrdenById(id);
    }


    @GetMapping("/usuario/{usuarioId}")
    public List<OrdenResponseDTO> getOrdenesByUsuario(@PathVariable Long usuarioId) {
        return ordenService.getOrdenesByUsuarioId(usuarioId);
    }


    @GetMapping
    public List<OrdenResponseDTO> getAllOrdenes() {
        return ordenService.getAllOrdenes();
    }


    @DeleteMapping("/{id}")
    public void deleteOrden(@PathVariable Long id) {
        ordenService.deleteOrden(id);
    }

    @PostMapping("/checkout/{usuarioId}")
    public OrdenResponseDTO checkout(@PathVariable Long usuarioId) {
        return ordenService.crearOrdenDesdeCarrito(usuarioId);
    }
}

