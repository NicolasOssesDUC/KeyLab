package com.keylab.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.keylab.backend.model.dto.OrdenItemCreateDTO;
import com.keylab.backend.model.dto.OrdenItemResponseDTO;
import com.keylab.backend.service.OrdenItemService;

@RestController
@RequestMapping("/api/v1/orden-items")
@CrossOrigin("*")
public class OrdenItemController {

    @Autowired
    private OrdenItemService ordenItemService;


    @GetMapping
    public List<OrdenItemResponseDTO> getAllOrdenItems() {
        return ordenItemService.getAllOrdenItems();
    }

    @GetMapping("/{id}")
    public OrdenItemResponseDTO getOrdenItemById(@PathVariable Long id) {
        return ordenItemService.getOrdenItemById(id);
    }

    @GetMapping("/orden/{ordenId}")
    public List<OrdenItemResponseDTO> getItemsByOrden(@PathVariable Long ordenId) {
        return ordenItemService.getOrdenItemsByOrdenId(ordenId);
    }


    @PostMapping("/orden/{ordenId}")
    public OrdenItemResponseDTO createOrdenItem(
            @PathVariable Long ordenId,
            @RequestBody OrdenItemCreateDTO dto) {
        return ordenItemService.createOrdenItem(ordenId, dto);
    }


    @PutMapping("/{id}")
    public OrdenItemResponseDTO updateOrdenItem(
            @PathVariable Long id,
            @RequestBody OrdenItemCreateDTO dto) {
        return ordenItemService.updateOrdenItem(id, dto);
    }
    

    @DeleteMapping("/{id}")
    public void deleteOrdenItem(@PathVariable Long id) {
        ordenItemService.deleteOrdenItem(id);
    }
}
