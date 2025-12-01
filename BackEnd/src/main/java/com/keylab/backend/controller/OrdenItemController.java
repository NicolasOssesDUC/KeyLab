package com.keylab.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.keylab.backend.service.OrdenItemService;
import com.keylab.backend.model.OrdenItem;

@RestController
@RequestMapping("/api/orden-items")
public class OrdenItemController {

    @Autowired
    private OrdenItemService ordenItemService;

    @GetMapping("/all")
    public List<OrdenItem> getAllOrdenItems() {
        return ordenItemService.getAllOrdenItems();
    }   

    @GetMapping("/{id}")
    public OrdenItem getOrdenItemById(@PathVariable Long id) {
        return ordenItemService.getOrdenItemById(id);
    }



}
