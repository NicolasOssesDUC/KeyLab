package com.keylab.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keylab.backend.model.Producto;
import com.keylab.backend.model.dto.ProductoCreateDTO;
import com.keylab.backend.model.dto.ProductoResponseDTO;
import com.keylab.backend.model.dto.ProductoUpdateDTO;
import com.keylab.backend.repository.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;


    // =========================
    //     MAPEOS INTERNOS
    // =========================

    private ProductoResponseDTO toResponseDTO(Producto p) {
        return new ProductoResponseDTO(
            p.getId(),
            p.getNombre(),
            p.getDescripcion(),
            p.getPrecio(),
            p.getStock(),
            p.getCategoria(),
            p.getImagenUrl(),
            p.isActivo() // disponible
        );
    }

    private Producto toEntityFromCreate(ProductoCreateDTO dto) {
        Producto p = new Producto();

        p.setNombre(dto.getNombre());
        p.setDescripcion(dto.getDescripcion());
        p.setPrecio(dto.getPrecio());
        p.setCategoria(dto.getCategoria());
        p.setImagenUrl(dto.getImagenUrl());

        p.setActivo(true);
        p.setStock(0);
        p.setSubcategoria(null);

        return p;
    }

    private void applyUpdate(Producto existente, ProductoUpdateDTO dto) {
        if (dto.getNombre() != null) existente.setNombre(dto.getNombre());
        if (dto.getDescripcion() != null) existente.setDescripcion(dto.getDescripcion());
        if (dto.getPrecio() != null) existente.setPrecio(dto.getPrecio());
        if (dto.getStock() != null) existente.setStock(dto.getStock());
        if (dto.getCategoria() != null) existente.setCategoria(dto.getCategoria());
        if (dto.getImagenUrl() != null) existente.setImagenUrl(dto.getImagenUrl());
        if (dto.getDisponible() != null) existente.setActivo(dto.getDisponible());
    }


    // =========================
    //     SERVICIOS CRUD
    // =========================

    public List<ProductoResponseDTO> getAllProductos() {
        return productoRepository.findAll()
            .stream()
            .map(this::toResponseDTO)
            .collect(Collectors.toList());
    }

    public List<ProductoResponseDTO> getProductosActivos() {
        return productoRepository.findByActivoTrue()
            .stream()
            .map(this::toResponseDTO)
            .collect(Collectors.toList());
    }

    public ProductoResponseDTO getProductoById(Long id) {
        Producto p = productoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        return toResponseDTO(p);
    }

    public ProductoResponseDTO createProducto(ProductoCreateDTO dto) {
        Producto nuevo = toEntityFromCreate(dto);

        validarProducto(nuevo);

        productoRepository.save(nuevo);

        return toResponseDTO(nuevo);
    }

    public ProductoResponseDTO updateProducto(Long id, ProductoUpdateDTO dto) {
        Producto existente = productoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        applyUpdate(existente, dto);

        validarProducto(existente);

        productoRepository.save(existente);

        return toResponseDTO(existente);
    }

    public void deleteProducto(Long id) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        productoRepository.delete(producto);
    }


    // =========================
    //       VALIDACIÓN
    // =========================

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
