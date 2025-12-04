package com.keylab.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keylab.backend.model.Orden;
import com.keylab.backend.model.OrdenItem;
import com.keylab.backend.model.Producto;
import com.keylab.backend.model.dto.OrdenItemCreateDTO;
import com.keylab.backend.model.dto.OrdenItemResponseDTO;
import com.keylab.backend.repository.OrdenItemRepository;
import com.keylab.backend.repository.OrdenRepository;
import com.keylab.backend.repository.ProductoRepository;

@Service
public class OrdenItemService {

    @Autowired
    private OrdenItemRepository ordenItemRepository;

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private ProductoRepository productoRepository;

    // ============================================================
    //                      LISTAR / OBTENER
    // ============================================================

    public List<OrdenItemResponseDTO> getAllOrdenItems() {
        return ordenItemRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public OrdenItemResponseDTO getOrdenItemById(Long id) {
        OrdenItem item = ordenItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrdenItem no encontrado con id: " + id));

        return toDTO(item);
    }

    public List<OrdenItemResponseDTO> getOrdenItemsByOrdenId(Long ordenId) {
        Orden orden = ordenRepository.findById(ordenId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada con id: " + ordenId));

        return ordenItemRepository.findByOrden(orden)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // ============================================================
    //                        CREAR ITEM
    // ============================================================

    public OrdenItemResponseDTO createOrdenItem(Long ordenId, OrdenItemCreateDTO dto) {

        Orden orden = ordenRepository.findById(ordenId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada con id: " + ordenId));

        Producto producto = productoRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + dto.getProductId()));

        OrdenItem item = new OrdenItem();

        item.setOrden(orden);
        item.setProducto(producto);

        // snapshot
        item.setProductoNombre(producto.getNombre());
        item.setProductoCategoria(producto.getCategoria());
        item.setProductoImagenUrl(producto.getImagenUrl());

        item.setCantidad(dto.getQuantity());
        item.setPrecioUnitario(producto.getPrecio());

        OrdenItem guardado = ordenItemRepository.save(item);

        return toDTO(guardado);
    }

    // ============================================================
    //                        ACTUALIZAR ITEM
    // ============================================================

    public OrdenItemResponseDTO updateOrdenItem(Long id, OrdenItemCreateDTO dto) {
        OrdenItem item = ordenItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrdenItem no encontrado con id: " + id));

        if (dto.getQuantity() > 0) {
            item.setCantidad(dto.getQuantity());
        }

        OrdenItem actualizado = ordenItemRepository.save(item);

        return toDTO(actualizado);
    }

    // ============================================================
    //                        ELIMINAR
    // ============================================================

    public void deleteOrdenItem(Long id) {
        OrdenItem item = ordenItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrdenItem no encontrado con id: " + id));

        ordenItemRepository.delete(item);
    }

    // ============================================================
    //                       MAPEOS PRIVADOS
    // ============================================================

    private OrdenItemResponseDTO toDTO(OrdenItem item) {
        OrdenItemResponseDTO dto = new OrdenItemResponseDTO();

        dto.setId(item.getId());
        dto.setProductoId(item.getProducto().getId());
        dto.setProductoNombre(item.getProductoNombre());
        dto.setCantidad(item.getCantidad());
        dto.setPrecioUnitario(item.getPrecioUnitario());
        dto.setSubtotal(item.getSubtotal());

        return dto;
    }
}
