package com.keylab.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.keylab.backend.model.OrdenItem;
import com.keylab.backend.service.OrdenItemService;


@RestController
@RequestMapping("/api/v1/orden-items")
@CrossOrigin("*")
public class OrdenItemController {

    @Autowired
    private OrdenItemService ordenItemService;

    // GET /api/v1/orden-items -> todos los items (rol admin / debug)
    @GetMapping
    public List<OrdenItem> getAllOrdenItems() {
        return ordenItemService.getAllOrdenItems();
    }

    // GET /api/v1/orden-items/{id} -> obtener item por id
    @GetMapping("/{id}")
    public OrdenItem getOrdenItemById(@PathVariable Long id) {
        return ordenItemService.getOrdenItemById(id);
    }

    // GET /api/v1/orden-items/orden/{ordenId} -> obtener items de una orden
    @GetMapping("/orden/{ordenId}")
    public List<OrdenItem> getItemsByOrden(@PathVariable Long ordenId) {
        return ordenItemService.getOrdenItemsByOrdenId(ordenId);
    }

    // DELETE /api/v1/orden-items/{id} -> eliminar item
    @DeleteMapping("/{id}")
    public void deleteOrdenItem(@PathVariable Long id) {
        ordenItemService.deleteOrdenItem(id);
    }
}