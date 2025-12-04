package com.keylab.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.keylab.backend.model.dto.CarritoItemCreateDTO;
import com.keylab.backend.model.dto.CarritoItemResponseDTO;
import com.keylab.backend.service.CarritoItemService;

@RestController
@RequestMapping("/api/v1/carrito")
@CrossOrigin("*")
public class CarritoItemController {

    @Autowired  
    private CarritoItemService carritoItemService;

    // ============================
    //         ENDPOINTS
    // ============================

    // 1) Obtener carrito de un usuario
    @GetMapping("/usuario/{usuarioId}")
    public List<CarritoItemResponseDTO> getCarritoByUsuario(@PathVariable Long usuarioId) {
        return carritoItemService.getCarritoByUsuario(usuarioId);
    }

    // 2) Obtener un item del carrito por ID
    @GetMapping("/item/{itemId}")
    public CarritoItemResponseDTO getCarritoItemById(@PathVariable Long itemId) {
        return carritoItemService.getCarritoItemById(itemId);
    }

    // 3) Agregar producto al carrito
    @PostMapping("/agregar")
    public CarritoItemResponseDTO agregarAlCarrito(@RequestBody CarritoItemCreateDTO request) {
        return carritoItemService.agregarAlCarrito(request);
    }

    // 4) Actualizar cantidad de un item
    @PutMapping("/item/{itemId}")
    public CarritoItemResponseDTO actualizarCantidad(
        @PathVariable Long itemId,
        @RequestBody ActualizarCantidadRequest request
    ) {
        return carritoItemService.actualizarCantidad(itemId, request.getCantidad());
    }

    // 5) Eliminar un item del carrito
    @DeleteMapping("/item/{itemId}")
    public void deleteCarritoItem(@PathVariable Long itemId) {
        carritoItemService.deleteCarritoItem(itemId);
    }

    // 6) Vaciar carrito completo
    @DeleteMapping("/usuario/{usuarioId}")
    public void vaciarCarrito(@PathVariable Long usuarioId) {
        carritoItemService.vaciarCarrito(usuarioId);
    }


    // ============================
    //    REQUEST DTOs DEL BODY
    // ============================

    // Actualizar cantidad
    public static class ActualizarCantidadRequest {
        private int cantidad;

        public int getCantidad() { return cantidad; }
        public void setCantidad(int cantidad) { this.cantidad = cantidad; }
    }
}
