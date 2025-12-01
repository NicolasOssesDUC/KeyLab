package com.keylab.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keylab.backend.model.Orden;
import com.keylab.backend.model.OrdenItem;
import com.keylab.backend.repository.OrdenRepository;

@Service
public class OrdenService {

    @Autowired
    private OrdenRepository ordenRepository;


    public List<Orden> getAllOrdenes() {
        return ordenRepository.findAll();
    }

    public Orden getOrdenById(Long id) {
        return ordenRepository.findById(id).orElse(null);
    }


    public Orden createOrden(Orden orden) {

        // 1) Asegurar que es una nueva orden
        orden.setId(null);

        // 2) Generar número de orden si no viene
        if (orden.getNumeroOrden() == null || orden.getNumeroOrden().isBlank()) {
            orden.setNumeroOrden("ORD-" + UUID.randomUUID().toString().substring(0, 8));
        }

        // 3) Enlazar items correctamente
        if (orden.getItems() != null) {
            for (OrdenItem item : orden.getItems()) {
                item.setId(null);        // el ID debe crearse automáticamente
                item.setOrden(orden);    // FK obligatoria
            }
        }

        // 4) Se llamará a @PrePersist, que calcula totales y fechas
        return ordenRepository.save(orden);
    }



    public void deleteOrden(Long id) {
        ordenRepository.deleteById(id);
    }

}
