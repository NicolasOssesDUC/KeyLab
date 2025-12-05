package com.keylab.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keylab.backend.model.CarritoItem;
import com.keylab.backend.model.Orden;
import com.keylab.backend.model.OrdenItem;
import com.keylab.backend.model.Producto;
import com.keylab.backend.model.Usuario;
import com.keylab.backend.model.dto.OrdenCreateDTO;
import com.keylab.backend.model.dto.OrdenItemCreateDTO;
import com.keylab.backend.model.dto.OrdenItemResponseDTO;
import com.keylab.backend.model.dto.OrdenResponseDTO;
import com.keylab.backend.repository.CarritoItemRepository;
import com.keylab.backend.repository.OrdenRepository;
import com.keylab.backend.repository.ProductoRepository;
import com.keylab.backend.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
public class OrdenService {

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CarritoItemRepository carritoItemRepository;

    @Autowired
    private ProductoRepository productoRepository;

    // ============================================================
    //                      LISTAR / OBTENER
    // ============================================================

    public List<OrdenResponseDTO> getAllOrdenes() {
        return ordenRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public OrdenResponseDTO getOrdenById(Long id) {
        Orden orden = ordenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada con id: " + id));

        return toResponseDTO(orden);
    }

    public List<OrdenResponseDTO> getOrdenesByUsuarioId(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + usuarioId));

        return ordenRepository.findByUsuario(usuario)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public OrdenResponseDTO getOrdenByNumero(String numeroOrden) {
        Orden orden = ordenRepository.findByNumeroOrden(numeroOrden)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada con número: " + numeroOrden));

        return toResponseDTO(orden);
    }


    // ============================================================
    //                      CREAR ORDEN MANUAL
    // ============================================================
    @Transactional
    public OrdenResponseDTO createOrden(OrdenCreateDTO dto) {

    Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + dto.getUsuarioId()));

    Orden orden = new Orden();
    orden.setId(null);
    orden.setUsuario(usuario);

    orden.setNumeroOrden("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
    orden.setEstado("PENDIENTE");

    orden.setDescuento(0.0);
    orden.setCostoEnvio(0.0);

    // ------ mapear items ------
    List<OrdenItem> items = new ArrayList<>();
    if (dto.getItems() != null) {
        for (OrdenItemCreateDTO itemDto : dto.getItems()) {
            items.add(toOrdenItemEntity(itemDto, orden));
        }
    }

    // 🔥 DESCONTAR STOCK ANTES DE GUARDAR LA ORDEN
    for (OrdenItem item : items) {
        Producto producto = item.getProducto();

        if (producto.getStock() < item.getCantidad()) {
            throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
        }

        producto.setStock(producto.getStock() - item.getCantidad());
        productoRepository.save(producto);
    }

    orden.setItems(items);

    Orden guardada = ordenRepository.save(orden);

    return toResponseDTO(guardada);
}

    // ============================================================
    //              CREAR ORDEN AUTOGENERADA DESDE CARRITO
    // ============================================================

    public OrdenResponseDTO crearOrdenDesdeCarrito(Long usuarioId) {

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + usuarioId));

        List<CarritoItem> carrito = carritoItemRepository.findByUsuario(usuario);
        if (carrito.isEmpty()) {
            throw new RuntimeException("El carrito está vacío.");
        }

        Orden orden = new Orden();
        orden.setUsuario(usuario);
        orden.setNumeroOrden("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        orden.setEstado("PENDIENTE");
        orden.setDescuento(0.0);
        orden.setCostoEnvio(0.0);

        List<OrdenItem> items = new ArrayList<>();

        for (CarritoItem ci : carrito) {
            OrdenItem oi = new OrdenItem();
            oi.setOrden(orden);
            oi.setProducto(ci.getProducto());
            oi.setCantidad(ci.getCantidad());
            oi.setPrecioUnitario(ci.getPrecioUnitario());
            items.add(oi);
        }

        orden.setItems(items);

        Orden guardada = ordenRepository.save(orden);

        carritoItemRepository.deleteByUsuario(usuario);

        return toResponseDTO(guardada);
    }

    // ============================================================
    //                        ELIMINAR
    // ============================================================

    public void deleteOrden(Long id) {
        Orden orden = ordenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada con id: " + id));

        ordenRepository.delete(orden);
    }


    // ============================================================
    //                       MAPEOS PRIVADOS
    // ============================================================

    private OrdenItem toOrdenItemEntity(OrdenItemCreateDTO dto, Orden orden) {
    OrdenItem item = new OrdenItem();
    item.setOrden(orden);

    Producto producto = productoRepository.findById(dto.getProductId())
            .orElseThrow(() ->
                    new RuntimeException("Producto no encontrado con id: " + dto.getProductId())
            );

    item.setProducto(producto);
    item.setCantidad(dto.getQuantity());
    item.setPrecioUnitario(producto.getPrecio());

    return item;
}

    private OrdenResponseDTO toResponseDTO(Orden orden) {
        OrdenResponseDTO dto = new OrdenResponseDTO();

        dto.setId(orden.getId());
        dto.setNumeroOrden(orden.getNumeroOrden());
        dto.setEstado(orden.getEstado());

        dto.setSubtotal(orden.getSubtotal().intValue());
        dto.setDescuento(orden.getDescuento().intValue());
        dto.setCostoEnvio(orden.getCostoEnvio().intValue());
        dto.setTotal(orden.getTotal().intValue());

        dto.setDireccionEnvioCalle(orden.getDireccionEnvioCalle());
        dto.setDireccionEnvioNumero(orden.getDireccionEnvioNumero());
        dto.setDireccionEnvioDepartamento(orden.getDireccionEnvioDepartamento());
        dto.setDireccionEnvioComuna(orden.getDireccionEnvioComuna());
        dto.setDireccionEnvioCiudad(orden.getDireccionEnvioCiudad());
        dto.setDireccionEnvioRegion(orden.getDireccionEnvioRegion());
        dto.setDireccionEnvioCodigoPostal(orden.getDireccionEnvioCodigoPostal());

        dto.setContactoNombre(orden.getContactoNombre());
        dto.setContactoTelefono(orden.getContactoTelefono());
        dto.setContactoEmail(orden.getContactoEmail());

        dto.setNotas(orden.getNotas());

        dto.setCreatedAt(orden.getCreatedAt());
        dto.setUpdatedAt(orden.getUpdatedAt());
        dto.setPagadaAt(orden.getPagadaAt());
        dto.setEnviadaAt(orden.getEnviadaAt());
        dto.setEntregadaAt(orden.getEntregadaAt());

        dto.setUsuarioId(orden.getUsuario().getId());

        dto.setItems(
                orden.getItems()
                        .stream()
                        .map(this::toOrdenItemDTO)
                        .toList()
        );

        return dto;
    }

    private OrdenItemResponseDTO toOrdenItemDTO(OrdenItem item) {
        OrdenItemResponseDTO dto = new OrdenItemResponseDTO();

        dto.setId(item.getId());
        dto.setProductoId(item.getProducto().getId());
        dto.setCantidad(item.getCantidad());
        dto.setPrecioUnitario(item.getPrecioUnitario());
        dto.setSubtotal(item.getSubtotal());

        return dto;
    }

}
