package com.keylab.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keylab.backend.model.CarritoItem;
import com.keylab.backend.model.Usuario;
import com.keylab.backend.model.Producto;

public interface CarritoItemRepository extends JpaRepository<CarritoItem, Long> {

    // Todos los items del carrito de un usuario
    List<CarritoItem> findByUsuario(Usuario usuario);

    // Un item específico (por usuario + producto) para sumar cantidad, etc.
    Optional<CarritoItem> findByUsuarioAndProducto(Usuario usuario, Producto producto);

    // Para vaciar carrito al generar orden
    void deleteByUsuario(Usuario usuario);
}