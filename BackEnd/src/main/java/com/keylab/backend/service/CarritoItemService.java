package com.keylab.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keylab.backend.model.CarritoItem;
import com.keylab.backend.model.Producto;
import com.keylab.backend.model.Usuario;
import com.keylab.backend.model.dto.CarritoItemCreateDTO;
import com.keylab.backend.model.dto.CarritoItemResponseDTO;
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


    // ======================================
    //              MAPEOS
    // ======================================

    private CarritoItemResponseDTO toResponseDTO(CarritoItem item) {
        return new CarritoItemResponseDTO(
            item.getId(),
            item.getProducto().getId(),
            item.getProducto().getNombre(),
            item.getCantidad(),
            item.getPrecioUnitario().intValue()
        );
    }

    private CarritoItem toEntity(CarritoItemCreateDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Producto producto = productoRepository.findById(dto.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        CarritoItem item = new CarritoItem();

        item.setUsuario(usuario);
        item.setProducto(producto);
        item.setCantidad(dto.getCantidad());
        item.setPrecioUnitario(producto.getPrecio());

        return item;
    }


    // ======================================
    //                CRUD
    // ======================================

    public List<CarritoItemResponseDTO> getAllCarritoItems() {
        return carritoItemRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public CarritoItemResponseDTO getCarritoItemById(Long id) {
        CarritoItem item = carritoItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));

        return toResponseDTO(item);
    }

    public CarritoItemResponseDTO createCarritoItem(CarritoItemCreateDTO dto) {
        CarritoItem item = toEntity(dto);

        validarStock(item.getProducto(), dto.getCantidad());

        carritoItemRepository.save(item);

        return toResponseDTO(item);
    }

    public void deleteCarritoItem(Long id) {
        CarritoItem item = carritoItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));

        carritoItemRepository.delete(item);
    }


    // ======================================
    //       MÉTODOS DEL CARRITO REAL
    // ======================================

    public List<CarritoItemResponseDTO> getCarritoByUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return carritoItemRepository.findByUsuario(usuario)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public CarritoItemResponseDTO agregarAlCarrito(CarritoItemCreateDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Producto producto = productoRepository.findById(dto.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        validarStock(producto, dto.getCantidad());

        // Si ya existe, suma cantidad
        return carritoItemRepository.findByUsuarioAndProducto(usuario, producto)
                .map(itemExistente -> {
                    int nuevaCantidad = itemExistente.getCantidad() + dto.getCantidad();

                    validarStock(producto, nuevaCantidad);

                    itemExistente.setCantidad(nuevaCantidad);
                    itemExistente.setPrecioUnitario(producto.getPrecio());

                    carritoItemRepository.save(itemExistente);

                    return toResponseDTO(itemExistente);
                })
                .orElseGet(() -> {
                    CarritoItem nuevo = toEntity(dto);
                    carritoItemRepository.save(nuevo);
                    return toResponseDTO(nuevo);
                });
    }

    public CarritoItemResponseDTO actualizarCantidad(Long itemId, int nuevaCantidad) {
        if (nuevaCantidad <= 0) {
            throw new RuntimeException("La cantidad debe ser mayor que 0");
        }

        CarritoItem item = carritoItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));

        validarStock(item.getProducto(), nuevaCantidad);

        item.setCantidad(nuevaCantidad);
        carritoItemRepository.save(item);

        return toResponseDTO(item);
    }

    public void vaciarCarrito(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        carritoItemRepository.deleteByUsuario(usuario);
    }


    // ======================================
    //             VALIDACIÓN
    // ======================================

    private void validarStock(Producto producto, int cantidad) {
        if (producto.getStock() < cantidad) {
            throw new RuntimeException("Stock insuficiente del producto");
        }
    }
}
