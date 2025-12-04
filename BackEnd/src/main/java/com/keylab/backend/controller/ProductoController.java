package com.keylab.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.keylab.backend.model.dto.ProductoCreateDTO;
import com.keylab.backend.model.dto.ProductoResponseDTO;
import com.keylab.backend.model.dto.ProductoUpdateDTO;
import com.keylab.backend.service.ProductoService;

@RestController
@RequestMapping("/api/v1/productos")
@CrossOrigin("*")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // Obtener todos los productos
    @GetMapping
    public List<ProductoResponseDTO> getAllProductos() {
        return productoService.getAllProductos();
    }

    // Obtener solo activos
    @GetMapping("/activos")
    public List<ProductoResponseDTO> getProductosActivos() {
        return productoService.getProductosActivos();
    }

    // Buscar producto por id
    @GetMapping("/{id}")
    public ProductoResponseDTO getProductoById(@PathVariable Long id) {
        return productoService.getProductoById(id);
    }

    // Crear producto
    @PostMapping
    public ProductoResponseDTO createProducto(@RequestBody ProductoCreateDTO productoDTO) {
        return productoService.createProducto(productoDTO);
    }

    // Actualizar producto
    @PutMapping("/{id}")
    public ProductoResponseDTO updateProducto(@PathVariable Long id, @RequestBody ProductoUpdateDTO productoDTO) {
        return productoService.updateProducto(id, productoDTO);
    }

    // Eliminar producto
    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
    }
}
