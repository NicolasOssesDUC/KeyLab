package com.keylab.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keylab.backend.model.Producto;
import com.keylab.backend.repository.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    // Obtener todos los productos
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    // Obtener solo los productos activos
    public List<Producto> getProductosActivos() {
        return productoRepository.findByActivoTrue();
    }

    // Buscar un producto por id (devolver excepción si no existe)
    public Producto getProductoById(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }

    // Crear producto
    public Producto createProducto(Producto producto) {

        validarProducto(producto);

        producto.setId(null); // asegurar que se cree uno nuevo
        producto.setActivo(true);
        return productoRepository.save(producto);
    }

    // Actualizar un producto
    public Producto updateProducto(Long id, Producto datos) {
        Producto existente = getProductoById(id);

        validarProducto(datos);

        existente.setNombre(datos.getNombre());
        existente.setPrecio(datos.getPrecio());
        existente.setCategoria(datos.getCategoria());
        existente.setSubcategoria(datos.getSubcategoria());
        existente.setStock(datos.getStock());
        existente.setDescripcion(datos.getDescripcion());
        existente.setImagenUrl(datos.getImagenUrl());
        existente.setActivo(datos.isActivo());

        return productoRepository.save(existente);
    }

    // Eliminar un producto (podría ser lógica o física)
    public void deleteProducto(Long id) {
        Producto producto = getProductoById(id);
        productoRepository.delete(producto);
    }


    // -------- VALIDACIONES ---------

    private void validarProducto(Producto producto) {
        if (producto.getPrecio() == null || producto.getPrecio() < 0) {
            throw new RuntimeException("El precio no puede ser menor que 0");
        }
        if (producto.getStock() < 0) {
            throw new RuntimeException("El stock no puede ser negativo");
        }
        if (producto.getNombre() == null || producto.getNombre().isBlank()) {
            throw new RuntimeException("El nombre del producto es obligatorio");
        }
    }

}