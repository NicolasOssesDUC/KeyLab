package com.keylab.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keylab.backend.model.CarritoItem;
import com.keylab.backend.model.Producto;
import com.keylab.backend.model.Usuario;
import com.keylab.backend.repository.CarritoItemRepository;
import com.keylab.backend.repository.ProductoRepository;
import com.keylab.backend.repository.UsuarioRepository;

@Service
public class CarritoItemService {

    @Autowired
    private CarritoItemRepository carritoItemRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    // ====== TUS MÉTODOS ORIGINALES (CRUD GENÉRICO) ======

    public List<CarritoItem> getAllCarritoItems() {
        return carritoItemRepository.findAll();
    }
    
    public CarritoItem getCarritoItemById(Long id) {
        return carritoItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item de carrito no encontrado con id: " + id));
    }

    public CarritoItem createCarritoItem(CarritoItem carritoItem) {
        carritoItem.setId(null);
        return carritoItemRepository.save(carritoItem);
    }

    public void deleteCarritoItem(Long id) {
        CarritoItem item = getCarritoItemById(id);
        carritoItemRepository.delete(item);
    }

    // ====== MÉTODOS “DE CARRITO” REALES ======

    // Ver carrito de un usuario
    public List<CarritoItem> getCarritoByUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + usuarioId));

        return carritoItemRepository.findByUsuario(usuario);
    }

    // Agregar producto al carrito de un usuario
    public CarritoItem agregarAlCarrito(Long usuarioId, Long productoId, int cantidad) {
        if (cantidad <= 0) {
            throw new RuntimeException("La cantidad debe ser mayor que 0");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + usuarioId));

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + productoId));

        // Validación simple de stock
        if (producto.getStock() < cantidad) {
            throw new RuntimeException("No hay stock suficiente del producto");
        }

        // Si ya existe ese producto en el carrito, suma cantidad
        return carritoItemRepository.findByUsuarioAndProducto(usuario, producto)
                .map(itemExistente -> {
                    int nuevaCantidad = itemExistente.getCantidad() + cantidad;
                    if (producto.getStock() < nuevaCantidad) {
                        throw new RuntimeException("No hay stock suficiente para la nueva cantidad");
                    }
                    itemExistente.setCantidad(nuevaCantidad);
                    itemExistente.setPrecioUnitario(producto.getPrecio());
                    return carritoItemRepository.save(itemExistente);
                })
                .orElseGet(() -> {
                    CarritoItem nuevo = new CarritoItem();
                    nuevo.setUsuario(usuario);
                    nuevo.setProducto(producto);
                    nuevo.setCantidad(cantidad);
                    nuevo.setPrecioUnitario(producto.getPrecio());
                    return carritoItemRepository.save(nuevo);
                });
    }

    // Actualizar cantidad de un item del carrito
    public CarritoItem actualizarCantidad(Long itemId, int nuevaCantidad) {
        if (nuevaCantidad <= 0) {
            throw new RuntimeException("La cantidad debe ser mayor que 0");
        }

        CarritoItem item = getCarritoItemById(itemId);
        Producto producto = item.getProducto();

        if (producto.getStock() < nuevaCantidad) {
            throw new RuntimeException("No hay stock suficiente para la nueva cantidad");
        }

        item.setCantidad(nuevaCantidad);
        return carritoItemRepository.save(item);
    }

    // Vaciar carrito de un usuario
    public void vaciarCarrito(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + usuarioId));

        carritoItemRepository.deleteByUsuario(usuario);
    }
}