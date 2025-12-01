package com.keylab.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.keylab.backend.service.CarritoItemService;

import org.springframework.web.bind.annotation.RequestBody; 

import com.keylab.backend.model.CarritoItem;

@RestController
@RequestMapping("/api/carrito-items")  
public class CarritoItemController {

    @Autowired
    private CarritoItemService carritoItemService;

    @GetMapping("/all")
    public List<CarritoItem> getAllCarritoItems() {
        return carritoItemService.getAllCarritoItems();
    }

    @PostMapping("/save")
    public CarritoItem postCarritoItem(@RequestBody CarritoItem entity) {    
        return carritoItemService.createCarritoItem(entity);
    }  

    @GetMapping("/{id}")
    public CarritoItem getCarritoItem(@PathVariable Long id) {
        return carritoItemService.getCarritoItemById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCarritoItem(@PathVariable Long id) {
        carritoItemService.deleteCarritoItem(id);
    }


    
}
