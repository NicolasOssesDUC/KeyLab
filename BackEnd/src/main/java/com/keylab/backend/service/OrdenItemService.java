package com.keylab.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keylab.backend.model.Orden;
import com.keylab.backend.model.OrdenItem;
import com.keylab.backend.repository.OrdenItemRepository;
import com.keylab.backend.repository.OrdenRepository;

@Service
public class OrdenItemService {

    @Autowired
    private OrdenItemRepository ordenItemRepository;

    @Autowired
    private OrdenRepository ordenRepository;

    // Listar todos los items de orden (útil para admin o debug)
    public List<OrdenItem> getAllOrdenItems() {
        return ordenItemRepository.findAll();
    }

    // Obtener un item de orden por id (ahora lanza excepción si no existe)
    public OrdenItem getOrdenItemById(Long id) {
        return ordenItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrdenItem no encontrado con id: " + id));
    }

    // Obtener todos los items de una orden específica
    public List<OrdenItem> getOrdenItemsByOrdenId(Long ordenId) {
        Orden orden = ordenRepository.findById(ordenId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada con id: " + ordenId));

        return ordenItemRepository.findByOrden(orden);
    }

    // Eliminar un item de orden (no es lo habitual en producción,
    // pero puede ser útil para administración o correcciones)
    public void deleteOrdenItem(Long id) {
        OrdenItem item = getOrdenItemById(id);
        ordenItemRepository.delete(item);
    }
}
