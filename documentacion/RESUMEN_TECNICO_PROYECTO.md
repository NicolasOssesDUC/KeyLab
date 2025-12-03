# Resumen Técnico del Proyecto KeyLab - Backend
**Fecha:** 02 de diciembre de 2025
**Versión:** 0.2.0 (En desarrollo activo)

## 1. Visión General del Proyecto
**KeyLab** es una plataforma de comercio electrónico especializada en teclados mecánicos personalizados. El sistema backend proporciona una API RESTful para gestionar usuarios, catálogo de productos, carritos de compra y órdenes de venta, implementando seguridad basada en tokens y roles.

## 2. Stack Tecnológico

### Core Framework
*   **Lenguaje:** Java 21 (LTS)
*   **Framework Principal:** Spring Boot 3.4.12
*   **Gestor de Dependencias:** Maven 3.9+

### Persistencia y Datos
*   **Base de Datos:** PostgreSQL 15+ (Hospedado en Supabase Cloud)
*   **ORM:** Hibernate 6.x (vía Spring Data JPA)
*   **Driver:** PostgreSQL JDBC Driver
*   **Pool de Conexiones:** HikariCP (Default en Spring Boot)

### Seguridad
*   **Framework:** Spring Security 6
*   **Autenticación:** JWT (JSON Web Tokens) con algoritmo HS256
*   **Librería JWT:** JJWT (io.jsonwebtoken) 0.11.5
*   **Encriptación:** BCrypt (Planeado para contraseñas)

### Herramientas de Desarrollo
*   **Lombok:** Reducción de boilerplate (Getters, Setters, Builders)
*   **Swagger UI / OpenAPI 3:** Documentación interactiva de API (`springdoc-openapi-starter-webmvc-ui`)
*   **DevTools:** Reinicio automático en desarrollo (Opcional)

## 3. Arquitectura del Software
El proyecto sigue una **Arquitectura Monolítica en Capas (Layered Architecture)** estricta, promoviendo la separación de responsabilidades (SoC).

### Estructura de Paquetes (`com.keylab.backend`)

1.  **`controller` (Capa de Presentación):**
    *   Maneja las solicitudes HTTP (REST).
    *   Valida la entrada básica.
    *   Retorna DTOs y códigos de estado HTTP.
    *   *Ejemplos:* `UsuarioController`, `ProductoController`.

2.  **`service` (Capa de Negocio):**
    *   Contiene la lógica empresarial.
    *   Realiza transformaciones de datos (Entity <-> DTO).
    *   Gestiona transacciones (`@Transactional`).
    *   *Ejemplos:* `UsuarioService`, `JwtService`.

3.  **`repository` (Capa de Acceso a Datos):**
    *   Interfaces que extienden `JpaRepository`.
    *   Abstraen las consultas SQL.
    *   *Ejemplos:* `UsuarioRepository`, `ProductoRepository`.

4.  **`model` (Capa de Dominio):**
    *   **`entity`:** Clases persistentes mapeadas a la BD (`@Entity`). Contienen la verdad del negocio.
    *   **`dto`:** Objetos de Transferencia de Datos. Desacoplan la API de la BD.

5.  **`security` (Capa Transversal):**
    *   Configuraciones de filtros HTTP.
    *   Gestión de Tokens JWT.
    *   Proveedores de Autenticación.

## 4. Modelo de Datos (Entidades Principales)

### `Usuario` (`usuarios`)
*   **Roles:** ADMIN, VENDEDOR, CLIENTE.
*   **Seguridad:** Almacena credenciales (actualmente en migración a hash).
*   **Datos:** Email (Unique), Nombre, Apellido, Teléfono.

### `Producto` (`productos`)
*   Catálogo de teclados y accesorios.
*   Gestión de Stock e Imágenes.

### `Orden` (`ordenes`)
*   Cabecera de pedido.
*   Estados: PENDIENTE, PAGADO, ENVIADO.
*   Relación 1:N con `OrdenItem`.

## 5. Funcionalidades Implementadas (Estado Actual)

### Gestión de Usuarios
*   ✅ **Registro:** Creación de usuarios con rol por defecto (CLIENTE). Uso de `UsuarioRegisterDTO`.
*   ✅ **Consulta:** Listado seguro de usuarios vía `UsuarioResponseDTO` (sin exponer passwords).
*   ✅ **Mappers:** Conversión manual eficiente Entity-DTO en `UsuarioService`.

### Infraestructura
*   ✅ **Conexión BD:** Verificada con Supabase (PostgreSQL) mediante Test Runner.
*   ✅ **CORS:** Configurado para permitir peticiones desde Frontend React.

### Seguridad (En Proceso)
*   🚧 **JWT Service:** Generación y validación de tokens implementada (`JwtService`).
*   🚧 **Filtros:** Pendiente integración de `JwtAuthenticationFilter`.
*   🚧 **Login:** Pendiente implementación de `AuthenticationController`.

## 6. Decisiones de Diseño Clave

### Uso de DTOs (Data Transfer Objects)
Se decidió **no exponer las Entidades JPA** en los controladores de Usuarios.
*   **Por qué:** Para evitar fugas de seguridad (passwords) y referencias circulares JSON.
*   **Implementación:** Mappers manuales en la capa de Servicio (sin librerías externas como MapStruct para reducir complejidad de dependencias).

### Estrategia de Base de Datos
*   `spring.jpa.hibernate.ddl-auto=update`: Permite la evolución del esquema sin borrar datos durante el desarrollo.
*   **PostgreSQL:** Elegido por robustez y compatibilidad con el entorno de producción (Supabase).
