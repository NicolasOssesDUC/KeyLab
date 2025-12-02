# Esquema de Base de Datos - KeyLab E-commerce

## 📋 Resumen del Esquema

He diseñado un esquema completo para tu e-commerce de teclados mecánicos con **11 tablas principales** que cubren todas las funcionalidades necesarias.

## 🗂️ Tablas Principales

### 1. **productos** (Ya existente)
- Productos del catálogo
- Incluye nombre, precio, categoría, stock, etc.
- **Índices**: categoria, nombre, activo

### 2. **usuarios**
- Información de clientes y administradores
- Campo `password_hash` para almacenar contraseñas (BCrypt)
- Campo `rol` para diferenciar: 'cliente' o 'admin'
- **No necesitas tabla separada de admins**, usa el campo `rol`
- **Autenticación manual con JWT**, no se usa Supabase Auth

### 3. **direcciones**
- Múltiples direcciones por usuario
- Cada dirección tiene un alias ("Casa", "Trabajo")
- Campo `es_principal` para dirección predeterminada

### 4. **carrito_items** ⭐
- **Carrito dinámico y temporal**
- Un registro por cada producto en el carrito del usuario
- Se actualiza constantemente (INSERT, UPDATE, DELETE)
- **Se vacía automáticamente** al crear una orden
- Constraint UNIQUE: un usuario no puede tener el mismo producto duplicado

**Cómo funciona el carrito:**
```sql
-- Agregar producto al carrito
INSERT INTO carrito_items (usuario_id, producto_id, cantidad, precio_unitario)
VALUES (1, 5, 2, 29990);

-- Actualizar cantidad
UPDATE carrito_items 
SET cantidad = 3 
WHERE usuario_id = 1 AND producto_id = 5;

-- Eliminar del carrito
DELETE FROM carrito_items 
WHERE usuario_id = 1 AND producto_id = 5;

-- Ver carrito completo con detalles
SELECT * FROM vista_carrito WHERE usuario_id = 1;

-- Vaciar carrito al crear orden
DELETE FROM carrito_items WHERE usuario_id = 1;
```

### 5. **ordenes** (Pedidos)
- Registro permanente de compras
- Estados: pendiente → pagada → procesando → enviada → entregada
- **Snapshot de dirección** (se guarda la dirección completa)
- Número de orden único: "KL-20241129-0123"

### 6. **orden_items**
- Detalle de productos en cada orden
- **Snapshot del producto** (nombre, precio al momento de compra)
- Histórico que no cambia si el producto se modifica después

### 7. **pagos**
- Registro de transacciones
- Métodos: webpay, transferencia, mercadopago, paypal
- Estados: pendiente, aprobado, rechazado, reembolsado
- Campo `transaccion_data` (JSONB) para datos adicionales

### 8. **favoritos** (Wishlist)
- Lista de deseos de usuarios
- Relación usuario-producto

### 9. **reseñas**
- Reviews con calificación 1-5 estrellas
- Campo `compra_verificada` para badge "Compra Verificada"
- Sistema de moderación con campo `aprobado`

### 10. **cupones**
- Códigos de descuento
- Tipos: porcentaje o fijo
- Control de usos máximos y fechas de expiración

### 11. **cupones_usados**
- Tracking de cupones utilizados
- Relación con usuario y orden

## 🎯 Características Especiales

### Funciones Útiles
```sql
-- Generar número de orden único
SELECT generar_numero_orden(); -- Retorna: 'KL-20241129-0123'

-- Calcular total del carrito
SELECT calcular_total_carrito(1); -- usuario_id = 1
```

### Triggers Automáticos
- ✅ `updated_at` se actualiza automáticamente en todas las tablas
- ✅ Validación de stock antes de agregar al carrito
- ✅ Previene agregar más cantidad que el stock disponible

### Vistas Útiles
```sql
-- Ver carrito con detalles completos
SELECT * FROM vista_carrito WHERE usuario_id = 1;

-- Resumen de órdenes
SELECT * FROM vista_ordenes_resumen WHERE usuario_id = 1;

-- Productos con rating promedio
SELECT * FROM vista_productos_rating ORDER BY rating_promedio DESC;
```

## 🔐 Seguridad

La seguridad se maneja completamente en **Spring Boot**:
- **Spring Security + JWT** para autenticación
- **@PreAuthorize("hasRole('ADMIN')")** para autorización
- **BCrypt** para hash de contraseñas
- Validación de `usuario_id` en servicios (un usuario solo puede ver/editar sus propios datos)

**No necesitas Row Level Security (RLS)** porque toda la seguridad se controla en el backend.

## 🚀 Cómo Implementar

### Paso 1: Ejecutar en Supabase
```bash
# Opción 1: Desde el dashboard de Supabase
1. Ve a SQL Editor
2. Copia el contenido de database_schema.sql
3. Ejecuta

# Opción 2: Desde psql
psql -h <tu-host> -U postgres -d postgres -f database_schema.sql
```

### Paso 2: Verificar Creación
```sql
-- Ver todas las tablas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Ver datos de ejemplo
SELECT * FROM usuarios;
SELECT * FROM cupones;
SELECT * FROM productos;
```

## 📊 Flujo de Compra

```
1. Usuario navega productos
2. Agrega productos a carrito_items
3. Usuario va al checkout
4. Se crea una ORDEN con los datos:
   - Información del usuario (snapshot)
   - Dirección de envío (snapshot)
   - Items del carrito → orden_items
5. Se vacía carrito_items del usuario
6. Se registra el pago en tabla pagos
7. Actualización de estados: pagada → procesando → enviada → entregada
```

## 🛠️ Próximos Pasos

1. **Backend Spring Boot:**
   - Crear entidades JPA para cada tabla
   - Crear repositorios (extends JpaRepository)
   - Crear servicios para lógica de negocio
   - Crear controllers REST

2. **Autenticación (Spring Security):**
   - Implementar UserDetailsService
   - Crear filtro JWT (JwtAuthenticationFilter)
   - Configurar SecurityFilterChain
   - Endpoints: /api/auth/registro, /api/auth/login

3. **APIs Necesarias:**
   ```
   POST   /api/carrito/agregar
   PUT    /api/carrito/actualizar/{id}
   DELETE /api/carrito/eliminar/{id}
   GET    /api/carrito
   POST   /api/ordenes/crear
   GET    /api/ordenes/{id}
   GET    /api/ordenes/usuario/{usuarioId}
   ```

## 💡 Respuestas a tus Dudas

### ¿Necesito tabla de admins?
**No.** Usa el campo `rol` en la tabla `usuarios`. Filtra por rol='admin' cuando necesites distinguir.

### ¿Cómo hacer el carrito dinámico?
El carrito es la tabla `carrito_items`. Se maneja así:
- **Agregar**: INSERT nuevo registro
- **Actualizar cantidad**: UPDATE
- **Eliminar**: DELETE
- **Ver carrito**: SELECT con JOIN a productos
- **Vaciar**: DELETE todos los items del usuario

El carrito NO es una tabla separada con estado, es simplemente una colección de items que pertenecen al usuario.

### ¿Qué pasa al confirmar la compra?
1. Se copian los items del carrito a `orden_items`
2. Se guarda un "snapshot" (foto) del estado actual
3. Se elimina el carrito: `DELETE FROM carrito_items WHERE usuario_id = ?`
4. Si el usuario agrega nuevos productos, empieza un nuevo carrito

## 📝 Notas Importantes

- **Precios en INTEGER**: Se guardan en centavos/pesos (ej: 29990 = $29.990)
- **Timestamps**: Usa TIMESTAMPTZ para incluir zona horaria
- **Soft Delete**: Campo `activo` en lugar de borrar registros
- **Snapshot Pattern**: Orden guarda copia de datos que pueden cambiar
- **JSONB**: Para datos flexibles como `transaccion_data` en pagos

## 🔍 Consultas Útiles

```sql
-- Ver carrito de un usuario con totales
SELECT 
    p.nombre,
    ci.cantidad,
    ci.precio_unitario,
    (ci.cantidad * ci.precio_unitario) as subtotal
FROM carrito_items ci
JOIN productos p ON ci.producto_id = p.id
WHERE ci.usuario_id = 1;

-- Historial de compras de un usuario
SELECT 
    o.numero_orden,
    o.estado,
    o.total,
    o.created_at
FROM ordenes o
WHERE o.usuario_id = 1
ORDER BY o.created_at DESC;

-- Top productos más vendidos
SELECT 
    p.nombre,
    SUM(oi.cantidad) as total_vendido
FROM orden_items oi
JOIN productos p ON oi.producto_id = p.id
GROUP BY p.id, p.nombre
ORDER BY total_vendido DESC
LIMIT 10;
```

## 🎨 Extras Incluidos

- ✅ Cupones de descuento
- ✅ Sistema de reseñas
- ✅ Lista de favoritos
- ✅ Múltiples direcciones por usuario
- ✅ Historial de pagos
- ✅ Validación automática de stock
- ✅ Índices para mejor performance

¿Necesitas ayuda con alguna parte específica? ¡Estoy aquí para ayudarte! 🚀
