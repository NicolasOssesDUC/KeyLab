package com.keylab.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.keylab.backend.model.CarritoItem;
import com.keylab.backend.service.CarritoItemService;








@RestController
@RequestMapping("/api/v1/carrito")
@CrossOrigin("*")
public class CarritoItemController {

    @Autowired  
    private CarritoItemService carritoItemService;

    // ✅ 1) Obtener el carrito de un usuario
    // GET /api/v1/carrito/usuario/{usuarioId}
    @GetMapping("/usuario/{usuarioId}")
    public List<CarritoItem> getCarritoByUsuario(@PathVariable Long usuarioId) {
        return carritoItemService.getCarritoByUsuario(usuarioId);
    }

    // ✅ 2) Obtener un item de carrito por id
    // GET /api/v1/carrito/item/{itemId}
    @GetMapping("/item/{itemId}")
    public CarritoItem getCarritoItemById(@PathVariable Long itemId) {
        return carritoItemService.getCarritoItemById(itemId);
    }

    // ✅ 3) Agregar un producto al carrito
    // POST /api/v1/carrito/agregar
    @PostMapping("/agregar")
    public CarritoItem agregarAlCarrito(@RequestBody AgregarCarritoRequest request) {
        return carritoItemService.agregarAlCarrito(
                request.getUsuarioId(),
                request.getProductoId(),
                request.getCantidad()
        );
    }

    // ✅ 4) Actualizar cantidad de un item del carrito
    // PUT /api/v1/carrito/item/{itemId}
    @PutMapping("/item/{itemId}")
    public CarritoItem actualizarCantidad(@PathVariable Long itemId,
                                          @RequestBody ActualizarCantidadRequest request) {
        return carritoItemService.actualizarCantidad(itemId, request.getCantidad());
    }

    // ✅ 5) Eliminar un item del carrito
    // DELETE /api/v1/carrito/item/{itemId}
    @DeleteMapping("/item/{itemId}")
    public void deleteCarritoItem(@PathVariable Long itemId) {
        carritoItemService.deleteCarritoItem(itemId);
    }

    // ✅ 6) Vaciar carrito completo de un usuario
    // DELETE /api/v1/carrito/usuario/{usuarioId}
    @DeleteMapping("/usuario/{usuarioId}")
    public void vaciarCarrito(@PathVariable Long usuarioId) {
        carritoItemService.vaciarCarrito(usuarioId);
    }


    // ====== DTOs simples para las peticiones ======

    // Body para /agregar
    public static class AgregarCarritoRequest {
        private Long usuarioId;
        private Long productoId;
        private int cantidad;

        public Long getUsuarioId() { return usuarioId; }
        public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

        public Long getProductoId() { return productoId; }
        public void setProductoId(Long productoId) { this.productoId = productoId; }

        public int getCantidad() { return cantidad; }
        public void setCantidad(int cantidad) { this.cantidad = cantidad; }
    }

    // Body para actualizar cantidad
    public static class ActualizarCantidadRequest {
        private int cantidad;

        public int getCantidad() { return cantidad; }
        public void setCantidad(int cantidad) { this.cantidad = cantidad; }
    }
}
