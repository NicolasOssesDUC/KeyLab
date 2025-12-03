package com.keylab.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keylab.backend.model.CarritoItem;
import com.keylab.backend.model.Orden;
import com.keylab.backend.model.OrdenItem;
import com.keylab.backend.model.Usuario;
import com.keylab.backend.repository.CarritoItemRepository;
import com.keylab.backend.repository.OrdenRepository;
import com.keylab.backend.repository.UsuarioRepository;

@Service
public class OrdenService {

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CarritoItemRepository carritoItemRepository;

    // Listar todas las órdenes (admin)
    public List<Orden> getAllOrdenes() {
        return ordenRepository.findAll();
    }

    // Buscar orden por id (ahora lanza excepción si no existe)
    public Orden getOrdenById(Long id) {
        return ordenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada con id: " + id));
    }

    // Listar órdenes de un usuario
    public List<Orden> getOrdenesByUsuarioId(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + usuarioId));

        return ordenRepository.findByUsuario(usuario);
    }

    // Buscar una orden por su número
    public Orden getOrdenByNumero(String numeroOrden) {
        return ordenRepository.findByNumeroOrden(numeroOrden)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada con número: " + numeroOrden));
    }

    // Crear una orden (cuando ya viene armada desde el frontend)
    // En tu proyecto lo ideal es crearla desde el carrito, pero esta versión igual es válida.
    public Orden createOrden(Orden orden) {

        // 1) Asegurar que es una nueva orden
        orden.setId(null);

        // 2) Generar número de orden si no viene
        if (orden.getNumeroOrden() == null || orden.getNumeroOrden().isBlank()) {
            orden.setNumeroOrden("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }

        // 3) Asegurar estado por defecto
        if (orden.getEstado() == null || orden.getEstado().isBlank()) {
            orden.setEstado("PENDIENTE");
        }

        // 4) Evitar nulos en valores numéricos
        if (orden.getDescuento() == null) {
            orden.setDescuento(0.0);
        }
        if (orden.getCostoEnvio() == null) {
            orden.setCostoEnvio(0.0);
        }

        // 5) Enlazar items correctamente
        if (orden.getItems() != null) {
            for (OrdenItem item : orden.getItems()) {
                item.setId(null);        // el ID debe crearse automáticamente
                item.setOrden(orden);    // FK obligatoria
            }
        }

        // 6) @PrePersist en la entidad Orden va a llamar calcularTotales()
        return ordenRepository.save(orden);
    }

    // =================== CHECKOUT DESDE CARRITO ===================

    public Orden crearOrdenDesdeCarrito(Long usuarioId) {
        // 1) Buscar usuario
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + usuarioId));

        // 2) Obtener items del carrito
        List<CarritoItem> itemsCarrito = carritoItemRepository.findByUsuario(usuario);
        if (itemsCarrito.isEmpty()) {
            throw new RuntimeException("El carrito está vacío, no se puede crear una orden");
        }

        // 3) Crear la orden base
        Orden orden = new Orden();
        orden.setId(null);
        orden.setUsuario(usuario);
        orden.setEstado("PENDIENTE");
        orden.setNumeroOrden("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        // Opcional: dejar en 0 por defecto
        if (orden.getDescuento() == null) {
            orden.setDescuento(0.0);
        }
        if (orden.getCostoEnvio() == null) {
            orden.setCostoEnvio(0.0);
        }

        // 4) Convertir CarritoItem -> OrdenItem
        List<OrdenItem> itemsOrden = new ArrayList<>();

        for (CarritoItem ci : itemsCarrito) {
            OrdenItem oi = new OrdenItem();
            oi.setId(null);
            oi.setOrden(orden);
            oi.setProducto(ci.getProducto());
            oi.setCantidad(ci.getCantidad());
            oi.setPrecioUnitario(ci.getPrecioUnitario()); // mismo precio que en el carrito

            // El subtotal se calcula en OrdenItem con calcularSubtotal() (@PrePersist/@PreUpdate)
            itemsOrden.add(oi);
        }

        // IMPORTANTE: el nombre del campo en Orden es "items"
        orden.setItems(itemsOrden);

        // 5) Guardar orden (calcularTotales() se ejecuta en @PrePersist)
        Orden guardada = ordenRepository.save(orden);

        // 6) Vaciar carrito del usuario
        carritoItemRepository.deleteByUsuario(usuario);

        return guardada;
    }

    // Eliminar orden
    public void deleteOrden(Long id) {
        Orden orden = getOrdenById(id);
        ordenRepository.delete(orden);
    }
}