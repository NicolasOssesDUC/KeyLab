package com.keylab.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
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

        orden.setItems(items);

        Orden guardada = ordenRepository.save(orden);

        return toResponseDTO(guardada);
    }

    // ============================================================
//     CREAR ORDEN AUTOGENERADA DESDE CARRITO (CON STOCK)
// ============================================================
@Transactional
public OrdenResponseDTO crearOrdenDesdeCarrito(Long usuarioId) {

    // 1) Buscar usuario
    Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + usuarioId));

    // 2) Obtener carrito de ese usuario
    List<CarritoItem> carrito = carritoItemRepository.findByUsuario(usuario);
    if (carrito.isEmpty()) {
        throw new RuntimeException("El carrito está vacío.");
    }

    // 3) Crear orden base
    Orden orden = new Orden();
    orden.setUsuario(usuario);
    orden.setNumeroOrden("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
    orden.setEstado("PENDIENTE");

    // valores por defecto
    orden.setDescuento(0.0);
    orden.setCostoEnvio(0.0);

    List<OrdenItem> items = new ArrayList<>();

    // 4) Recorrer items del carrito → crear OrdenItem + descontar stock
    for (CarritoItem ci : carrito) {

        Producto producto = ci.getProducto();

        // ✅ Validar stock suficiente
        if (producto.getStock() < ci.getCantidad()) {
            throw new RuntimeException(
                    "No hay stock suficiente para el producto: " + producto.getNombre()
            );
        }

        // ✅ Descontar stock
        producto.setStock(producto.getStock() - ci.getCantidad());
        productoRepository.save(producto); // guardar cambio en BD

        // ✅ Crear OrdenItem
        OrdenItem oi = new OrdenItem();
        oi.setOrden(orden);
        oi.setProducto(producto);
        oi.setCantidad(ci.getCantidad());

        // snapshot como en OrdenItemService
        oi.setProductoNombre(producto.getNombre());
        oi.setProductoCategoria(producto.getCategoria());
        oi.setProductoImagenUrl(producto.getImagenUrl());

        // si el carrito tiene precioUnitario, se usa, sino el del producto
        Double precioUnitario = ci.getPrecioUnitario() != null
                ? ci.getPrecioUnitario()
                : producto.getPrecio();

        oi.setPrecioUnitario(precioUnitario);

        // El subtotal generalmente se calcula en la entidad (por @PrePersist),
        // pero si no lo tienes puedes descomentar esta línea:
        // oi.setSubtotal(precioUnitario * ci.getCantidad());

        items.add(oi);
    }

    // 5) Asociar items y guardar orden
    orden.setItems(items);

    Orden guardada = ordenRepository.save(orden);

    // 6) Vaciar carrito
    carritoItemRepository.deleteByUsuario(usuario);

    // 7) Devolver DTO
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
