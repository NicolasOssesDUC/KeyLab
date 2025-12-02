-- ============================================
-- ESQUEMA COMPLETO DE BASE DE DATOS - KEYLAB
-- E-commerce de Teclados Mecánicos
-- ============================================

-- ============================================
-- 1. TABLA PRODUCTOS (Ya existe)
-- ============================================
CREATE TABLE IF NOT EXISTS productos (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  precio INTEGER NOT NULL CHECK (precio >= 0),
  categoria TEXT NOT NULL,
  subcategoria TEXT,
  imagen_url TEXT,  
  stock INTEGER DEFAULT 0 CHECK (stock >= 0),
  descripcion TEXT,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria);
CREATE INDEX IF NOT EXISTS idx_productos_nombre ON productos(nombre);
CREATE INDEX IF NOT EXISTS idx_productos_activo ON productos(activo);

-- ============================================
-- 2. TABLA USUARIOS
-- ============================================
CREATE TABLE usuarios (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, -- Hash bcrypt de la contraseña
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  telefono TEXT,
  fecha_nacimiento DATE,
  
  -- Rol del usuario
  rol TEXT DEFAULT 'cliente' CHECK (rol IN ('cliente', 'admin')),
  
  -- Estado de la cuenta
  activo BOOLEAN DEFAULT TRUE,
  email_verificado BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  ultimo_login TIMESTAMPTZ
);

CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_rol ON usuarios(rol);

-- ============================================
-- 3. TABLA DIRECCIONES (Múltiples por usuario)
-- ============================================
CREATE TABLE direcciones (
  id BIGSERIAL PRIMARY KEY,
  usuario_id BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  
  -- Datos de dirección
  alias TEXT NOT NULL, -- Ej: "Casa", "Trabajo", "Oficina"
  calle TEXT NOT NULL,
  numero TEXT NOT NULL,
  departamento TEXT,
  comuna TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  region TEXT NOT NULL,
  codigo_postal TEXT,
  
  -- Dirección por defecto
  es_principal BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_direcciones_usuario ON direcciones(usuario_id);
CREATE INDEX idx_direcciones_principal ON direcciones(usuario_id, es_principal);

-- ============================================
-- 4. TABLA CARRITO (Items del carrito)
-- ============================================
-- El carrito es dinámico y temporal, se vacía al completar la orden
CREATE TABLE carrito_items (
  id BIGSERIAL PRIMARY KEY,
  usuario_id BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  producto_id BIGINT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  
  cantidad INTEGER NOT NULL DEFAULT 1 CHECK (cantidad > 0),
  precio_unitario INTEGER NOT NULL, -- Precio al momento de agregar al carrito
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Un usuario no puede tener el mismo producto duplicado en el carrito
  UNIQUE(usuario_id, producto_id)
);

CREATE INDEX idx_carrito_usuario ON carrito_items(usuario_id);
CREATE INDEX idx_carrito_producto ON carrito_items(producto_id);

-- ============================================
-- 5. TABLA ORDENES (Pedidos)
-- ============================================
CREATE TABLE ordenes (
  id BIGSERIAL PRIMARY KEY,
  usuario_id BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE SET NULL,
  
  -- Número de orden único y legible
  numero_orden TEXT UNIQUE NOT NULL,
  
  -- Estado de la orden
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN (
    'pendiente',      -- Orden creada, esperando pago
    'pagada',         -- Pago confirmado
    'procesando',     -- Preparando el envío
    'enviada',        -- En camino
    'entregada',      -- Entregada al cliente
    'cancelada',      -- Cancelada
    'reembolsada'     -- Reembolso procesado
  )),
  
  -- Montos
  subtotal INTEGER NOT NULL CHECK (subtotal >= 0),
  descuento INTEGER DEFAULT 0 CHECK (descuento >= 0),
  costo_envio INTEGER DEFAULT 0 CHECK (costo_envio >= 0),
  total INTEGER NOT NULL CHECK (total >= 0),
  
  -- Dirección de envío (snapshot al momento de la orden)
  direccion_envio_calle TEXT NOT NULL,
  direccion_envio_numero TEXT NOT NULL,
  direccion_envio_departamento TEXT,
  direccion_envio_comuna TEXT NOT NULL,
  direccion_envio_ciudad TEXT NOT NULL,
  direccion_envio_region TEXT NOT NULL,
  direccion_envio_codigo_postal TEXT,
  
  -- Información de contacto (snapshot)
  contacto_nombre TEXT NOT NULL,
  contacto_telefono TEXT NOT NULL,
  contacto_email TEXT NOT NULL,
  
  -- Notas adicionales
  notas TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  pagada_at TIMESTAMPTZ,
  enviada_at TIMESTAMPTZ,
  entregada_at TIMESTAMPTZ
);

CREATE INDEX idx_ordenes_usuario ON ordenes(usuario_id);
CREATE INDEX idx_ordenes_estado ON ordenes(estado);
CREATE INDEX idx_ordenes_numero ON ordenes(numero_orden);
CREATE INDEX idx_ordenes_fecha ON ordenes(created_at DESC);

-- ============================================
-- 6. TABLA ORDEN_ITEMS (Detalle de productos en cada orden)
-- ============================================
CREATE TABLE orden_items (
  id BIGSERIAL PRIMARY KEY,
  orden_id BIGINT NOT NULL REFERENCES ordenes(id) ON DELETE CASCADE,
  producto_id BIGINT REFERENCES productos(id) ON DELETE SET NULL,
  
  -- Snapshot del producto al momento de la compra
  producto_nombre TEXT NOT NULL,
  producto_categoria TEXT,
  producto_imagen_url TEXT,
  
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario INTEGER NOT NULL CHECK (precio_unitario >= 0),
  subtotal INTEGER NOT NULL CHECK (subtotal >= 0),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orden_items_orden ON orden_items(orden_id);
CREATE INDEX idx_orden_items_producto ON orden_items(producto_id);

-- ============================================
-- 7. TABLA PAGOS (Registro de transacciones)
-- ============================================
CREATE TABLE pagos (
  id BIGSERIAL PRIMARY KEY,
  orden_id BIGINT NOT NULL REFERENCES ordenes(id) ON DELETE CASCADE,
  
  -- Método de pago
  metodo TEXT NOT NULL CHECK (metodo IN (
    'webpay',
    'transferencia',
    'mercadopago',
    'paypal',
    'otro'
  )),
  
  -- Estado del pago
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN (
    'pendiente',
    'aprobado',
    'rechazado',
    'reembolsado'
  )),
  
  -- Monto
  monto INTEGER NOT NULL CHECK (monto >= 0),
  
  -- IDs de transacción externa (Webpay, MercadoPago, etc)
  transaccion_id TEXT,
  transaccion_data JSONB, -- Datos adicionales de la transacción
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pagos_orden ON pagos(orden_id);
CREATE INDEX idx_pagos_estado ON pagos(estado);
CREATE INDEX idx_pagos_transaccion ON pagos(transaccion_id);

-- ============================================
-- 8. TABLA FAVORITOS (Wishlist)
-- ============================================
CREATE TABLE favoritos (
  id BIGSERIAL PRIMARY KEY,
  usuario_id BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  producto_id BIGINT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(usuario_id, producto_id)
);

CREATE INDEX idx_favoritos_usuario ON favoritos(usuario_id);
CREATE INDEX idx_favoritos_producto ON favoritos(producto_id);

-- ============================================
-- 9. TABLA RESEÑAS (Reviews de productos)
-- ============================================
CREATE TABLE resenas (
  id BIGSERIAL PRIMARY KEY,
  producto_id BIGINT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  usuario_id BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  
  calificacion INTEGER NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
  titulo TEXT,
  comentario TEXT,
  
  -- Verificar si compró el producto
  compra_verificada BOOLEAN DEFAULT FALSE,
  
  -- Moderación
  aprobado BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Un usuario solo puede dejar una reseña por producto
  UNIQUE(producto_id, usuario_id)
);

CREATE INDEX idx_resenas_producto ON resenas(producto_id);
CREATE INDEX idx_resenas_usuario ON resenas(usuario_id);
CREATE INDEX idx_resenas_calificacion ON resenas(calificacion);

-- ============================================
-- 10. TABLA CUPONES (Descuentos)
-- ============================================
CREATE TABLE cupones (
  id BIGSERIAL PRIMARY KEY,
  codigo TEXT UNIQUE NOT NULL,
  descripcion TEXT,
  
  -- Tipo de descuento
  tipo TEXT NOT NULL CHECK (tipo IN ('porcentaje', 'fijo')),
  valor INTEGER NOT NULL CHECK (valor > 0), -- Porcentaje (1-100) o monto fijo
  
  -- Restricciones
  monto_minimo INTEGER DEFAULT 0,
  maximo_usos INTEGER, -- NULL = ilimitado
  usos_actuales INTEGER DEFAULT 0,
  
  -- Vigencia
  fecha_inicio TIMESTAMPTZ DEFAULT NOW(),
  fecha_expiracion TIMESTAMPTZ,
  activo BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cupones_codigo ON cupones(codigo);
CREATE INDEX idx_cupones_activo ON cupones(activo, fecha_expiracion);

-- ============================================
-- 11. TABLA CUPONES_USADOS (Tracking de uso)
-- ============================================
CREATE TABLE cupones_usados (
  id BIGSERIAL PRIMARY KEY,
  cupon_id BIGINT NOT NULL REFERENCES cupones(id) ON DELETE CASCADE,
  usuario_id BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  orden_id BIGINT REFERENCES ordenes(id) ON DELETE SET NULL,
  
  descuento_aplicado INTEGER NOT NULL,
  
  usado_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cupones_usados_cupon ON cupones_usados(cupon_id);
CREATE INDEX idx_cupones_usados_usuario ON cupones_usados(usuario_id);

-- ============================================
-- TRIGGERS PARA UPDATE_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas relevantes
CREATE TRIGGER update_productos_updated_at BEFORE UPDATE ON productos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_direcciones_updated_at BEFORE UPDATE ON direcciones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carrito_items_updated_at BEFORE UPDATE ON carrito_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ordenes_updated_at BEFORE UPDATE ON ordenes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pagos_updated_at BEFORE UPDATE ON pagos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resenas_updated_at BEFORE UPDATE ON resenas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cupones_updated_at BEFORE UPDATE ON cupones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCIONES ÚTILES
-- ============================================

-- Función para generar número de orden único
CREATE OR REPLACE FUNCTION generar_numero_orden()
RETURNS TEXT AS $$
DECLARE
    nuevo_numero TEXT;
    existe BOOLEAN;
BEGIN
    LOOP
        nuevo_numero := 'KL-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
        SELECT EXISTS(SELECT 1 FROM ordenes WHERE numero_orden = nuevo_numero) INTO existe;
        EXIT WHEN NOT existe;
    END LOOP;
    RETURN nuevo_numero;
END;
$$ LANGUAGE plpgsql;

-- Función para calcular el total del carrito de un usuario
CREATE OR REPLACE FUNCTION calcular_total_carrito(p_usuario_id BIGINT)
RETURNS INTEGER AS $$
DECLARE
    total INTEGER;
BEGIN
    SELECT COALESCE(SUM(cantidad * precio_unitario), 0)
    INTO total
    FROM carrito_items
    WHERE usuario_id = p_usuario_id;
    
    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Función para validar stock antes de agregar al carrito
CREATE OR REPLACE FUNCTION validar_stock_carrito()
RETURNS TRIGGER AS $$
DECLARE
    stock_disponible INTEGER;
BEGIN
    SELECT stock INTO stock_disponible
    FROM productos
    WHERE id = NEW.producto_id;
    
    IF stock_disponible < NEW.cantidad THEN
        RAISE EXCEPTION 'Stock insuficiente. Disponible: %, Solicitado: %', stock_disponible, NEW.cantidad;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validar_stock_antes_carrito
    BEFORE INSERT OR UPDATE ON carrito_items
    FOR EACH ROW
    EXECUTE FUNCTION validar_stock_carrito();

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista de carrito con detalles de productos
CREATE OR REPLACE VIEW vista_carrito AS
SELECT 
    ci.id,
    ci.usuario_id,
    ci.producto_id,
    p.nombre AS producto_nombre,
    p.imagen_url,
    p.categoria,
    ci.cantidad,
    ci.precio_unitario,
    (ci.cantidad * ci.precio_unitario) AS subtotal,
    p.stock AS stock_disponible,
    ci.created_at
FROM carrito_items ci
JOIN productos p ON ci.producto_id = p.id
WHERE p.activo = TRUE;

-- Vista de órdenes con totales
CREATE OR REPLACE VIEW vista_ordenes_resumen AS
SELECT 
    o.id,
    o.numero_orden,
    o.usuario_id,
    u.nombre || ' ' || u.apellido AS cliente_nombre,
    u.email AS cliente_email,
    o.estado,
    o.total,
    COUNT(oi.id) AS total_items,
    o.created_at,
    o.updated_at
FROM ordenes o
JOIN usuarios u ON o.usuario_id = u.id
LEFT JOIN orden_items oi ON o.id = oi.orden_id
GROUP BY o.id, u.nombre, u.apellido, u.email;

-- Vista de productos con calificación promedio
CREATE OR REPLACE VIEW vista_productos_rating AS
SELECT 
    p.*,
    COALESCE(AVG(r.calificacion), 0) AS rating_promedio,
    COUNT(r.id) AS total_resenas
FROM productos p
LEFT JOIN resenas r ON p.id = r.producto_id AND r.aprobado = TRUE
GROUP BY p.id;

-- ============================================
-- DATOS DE EJEMPLO/SEED
-- ============================================

-- Insertar usuario admin de ejemplo (password: admin123)
-- Hash generado con BCrypt: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO usuarios (email, password_hash, nombre, apellido, rol, email_verificado, activo)
VALUES 
    ('admin@keylab.cl', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'KeyLab', 'admin', TRUE, TRUE),
    ('cliente@test.cl', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Cliente', 'Demo', 'cliente', TRUE, TRUE)
ON CONFLICT (email) DO NOTHING;

-- Insertar cupones de ejemplo
INSERT INTO cupones (codigo, descripcion, tipo, valor, monto_minimo, maximo_usos, fecha_expiracion)
VALUES 
    ('BIENVENIDA10', 'Descuento de bienvenida', 'porcentaje', 10, 30000, NULL, NOW() + INTERVAL '30 days'),
    ('PRIMERACOMPRA', 'Primera compra', 'fijo', 5000, 50000, 1000, NOW() + INTERVAL '90 days'),
    ('CYBER2024', 'Cyber Monday 2024', 'porcentaje', 20, 0, NULL, NOW() + INTERVAL '7 days')
ON CONFLICT (codigo) DO NOTHING;

-- ============================================
-- NOTAS DE SEGURIDAD
-- ============================================
-- La seguridad se manejará en Spring Boot con:
-- 1. Spring Security + JWT para autenticación
-- 2. @PreAuthorize para autorización por rol
-- 3. Validación de usuario_id en los servicios
-- 
-- No es necesario RLS (Row Level Security) porque:
-- - El backend controla todo el acceso
-- - JWT valida la identidad del usuario
-- - Los controllers/services verifican permisos
