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

    // ============================================
    // 1) Crear una orden
    // POST /api/v1/ordenes
    // ============================================
    @PostMapping
    public OrdenResponseDTO creteOrden(@RequestBody OrdenCreateDTO dto) {
        return ordenService.createOrden(dto);
    }

    // ============================================
    // 2) Obtener una orden por ID
    // GET /api/v1/ordenes/{id}
    // ============================================
    @GetMapping("/{id}")
    public OrdenResponseDTO getOrdenById(@PathVariable Long id) {
        return ordenService.getOrdenById(id);
    }

    // ============================================
    // 3) Obtener todas las órdenes de un usuario
    // GET /api/v1/ordenes/usuario/{usuarioId}
    // ============================================
    @GetMapping("/usuario/{usuarioId}")
    public List<OrdenResponseDTO> getOrdenesByUsuario(@PathVariable Long usuarioId) {
        return ordenService.getOrdenesByUsuarioId(usuarioId);
    }

    // ============================================
    // 4) Obtener todas las órdenes (admin)
    // GET /api/v1/ordenes
    // ============================================
    @GetMapping
    public List<OrdenResponseDTO> getAllOrdenes() {
        return ordenService.getAllOrdenes();
    }

    // ============================================
    // 5) Eliminar una orden
    // DELETE /api/v1/ordenes/{id}
    // ============================================
    @DeleteMapping("/{id}")
    public void deleteOrden(@PathVariable Long id) {
        ordenService.deleteOrden(id);
    }
}
