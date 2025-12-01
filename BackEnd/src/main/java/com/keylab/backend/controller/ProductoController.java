package com.keylab.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.keylab.backend.model.Producto;
import com.keylab.backend.service.ProductoService;
import org.springframework.web.bind.annotation.RequestBody; 

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;   

    @GetMapping("/all")
    public List<Producto> getAllProductos() {
        return productoService.getAllProductos();
    }

    @PostMapping("/save")
    public Producto postProducto(@RequestBody Producto entity) {
        return productoService.createProducto(entity);
    }
    
}
