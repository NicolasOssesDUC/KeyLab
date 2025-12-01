package com.keylab.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.keylab.backend.model.Orden;
import com.keylab.backend.service.OrdenService;
import org.springframework.web.bind.annotation.RequestBody; 

@RestController
@RequestMapping("/api/ordenes")
public class OrdenController {

    @Autowired
    private OrdenService ordenService;
    
    @GetMapping("/all")
    public List<Orden> getAllOrdenes() {
        return ordenService.getAllOrdenes();
    }

    @GetMapping("/{id}")
    public Orden getOrden(@PathVariable Long id) {
        return ordenService.getOrdenById(id);
    }

    @PostMapping
    public Orden crearOrden(@RequestBody Orden orden) {
        return ordenService.createOrden(orden);
    }


}
