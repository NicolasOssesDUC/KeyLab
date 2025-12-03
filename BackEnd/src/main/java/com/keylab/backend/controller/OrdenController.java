package com.keylab.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.keylab.backend.model.Orden;
import com.keylab.backend.service.OrdenService;


@RestController
@RequestMapping("/api/v1/ordenes")
@CrossOrigin("*")
public class OrdenController {

    @Autowired
    private OrdenService ordenService;

    // GET /api/v1/ordenes -> listar todas las órdenes (admin)
    @GetMapping
    public List<Orden> getAllOrdenes() {
        return ordenService.getAllOrdenes();
    }

    // GET /api/v1/ordenes/{id} -> obtener una orden por id
    @GetMapping("/{id}")
    public Orden getOrden(@PathVariable Long id) {
        return ordenService.getOrdenById(id);
    }

    // POST /api/v1/ordenes -> crear una nueva orden
    @PostMapping
    public Orden crearOrden(@RequestBody Orden orden) {
        return ordenService.createOrden(orden);
    }

    // DELETE /api/v1/ordenes/{id} -> eliminar una orden
    @DeleteMapping("/{id}")
    public void deleteOrden(@PathVariable Long id) {
        ordenService.deleteOrden(id);
    }

    @PostMapping("/checkout/{usuarioId}")
    public Orden checkout(@PathVariable Long usuarioId) {
        return ordenService.crearOrdenDesdeCarrito(usuarioId);
    }
}
