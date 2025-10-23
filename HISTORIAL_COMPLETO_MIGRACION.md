# 📋 Historial Completo de Migración - KeyLab

**Proyecto:** Migración de KeyLab (HTML/CSS/JS estático) → React + Vite  
**Objetivo:** Modernizar la aplicación manteniendo funcionalidad y estilo original  
**Stack:** React 19, Vite, Bootstrap 5.3.8, React Router Dom 7.9.4

---

## 📊 Estado Actual del Proyecto

### ✅ Completado
- Estructura base React + Vite
- Sistema de rutas con React Router
- Componentes layout (Navbar, Footer)
- Página Home con carrusel funcional
- Página Login con validaciones
- Sistema de autenticación básico
- **Wrappers UI:** Button, Layout (Container/Row/Col), Card, FormField, Alert, Table

### 🟡 En Progreso
- Migración de páginas de productos

### ⏳ Pendiente
- Migración completa del carrito
- Panel de administración
- Formularios de registro y recuperación
- Páginas de contenido (Nosotros, Ubicación)
- Sistema de blogs

---

## 📅 Historial Cronológico

### Fase 1: Configuración Inicial (Octubre 2024)

#### ✅ Estructura Base del Proyecto
**Fecha:** Octubre 2024

**Tareas completadas:**
1. Creación del proyecto React con Vite
2. Instalación de dependencias principales:
   - react + react-dom (v19.2.0)
   - react-router-dom (v7.9.4)
   - bootstrap (v5.3.8)
   - react-bootstrap (v2.10.10)

3. Estructura de carpetas:
   ```
   KeyLab/
   ├── public/assets/      # Assets del proyecto original
   ├── src/
   │   ├── components/     # Componentes reutilizables
   │   ├── pages/          # Páginas de la aplicación
   │   ├── ui/             # Wrappers de componentes UI
   │   ├── utils/          # Utilidades y helpers
   │   └── App.jsx         # Componente principal
   ```

4. Migración de assets:
   - Copiados todos los assets a `public/assets/`
   - Importación de CSS principal en App.css
   - Configuración de fuentes Google (Jersey 10)

**Problemas resueltos:**
- Instalación de devDependencies: `npm install --include=dev`
- Rutas de assets correctamente configuradas
- Importación de Bootstrap CSS y JS

---

#### ✅ Componentes de Navegación
**Fecha:** Octubre 2024

**1. Navbar (src/components/Navbar.jsx)**
- Migrado desde HTML a React con react-bootstrap
- Navegación con React Router (Link en lugar de href)
- Dropdown de productos funcional
- Contador dinámico del carrito (lee localStorage)
- Menú responsive con botón hamburguesa
- Event listeners para actualizar contador en tiempo real

**2. Footer (src/components/Footer.jsx)**
- Componente simple con estilos originales
- Enlaces a redes sociales
- Información de contacto

---

#### ✅ Sistema de Rutas
**Fecha:** Octubre 2024

**Configuración en App.jsx:**
- BrowserRouter implementado
- Rutas principales configuradas:
  ```
  / → Home
  /productos → Productos
  /teclados → Teclados
  /keycaps → Keycaps
  /switches → Switches
  /cases → Cases
  /contacto → Contacto
  /nosotros → Nosotros
  /ubicacion → Ubicacion
  /login → Login
  /carrito → Carrito
  /perfil/:nombreUsuario → PerfilUsuario
  ```

---

### Fase 2: Páginas Principales (Octubre 2024)

#### ✅ Home (src/pages/Home.jsx)
**Fecha:** Octubre 2024

**Funcionalidades implementadas:**
1. Banner intro con estilos originales
2. Carrusel de productos:
   - Autoplay cada 3 segundos
   - Navegación prev/next
   - Animación fade entre slides
   - Responsive
3. useEffect para gestión del carrusel
4. useState para tracking del slide actual

**Código clave:**
```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setActiveSlide((prev) => (prev + 1) % 3);
  }, 3000);
  return () => clearInterval(interval);
}, []);
```

---

#### ✅ Login (src/pages/Login.jsx)
**Fecha:** Octubre 2024

**Funcionalidades implementadas:**
1. Layout split (imagen izquierda, formulario derecha)
2. Validaciones en tiempo real:
   - Formato de correo electrónico
   - Dominios permitidos (@gmail.com, @outlook.com, etc.)
   - Longitud mínima de contraseña (8 caracteres)
3. Clases de error de Bootstrap (`is-invalid`)
4. Manejo de estado con useState
5. Seed de usuario administrador por defecto

**Archivo de utilidades creado:**
- `src/utils/auth.js`: Gestión de autenticación
  - `seedAdminUser()`: Crea usuario admin por defecto
  - `ALLOWED_DOMAINS`: Lista de dominios de correo permitidos
  - Funciones de validación de credenciales

**Reglas de negocio:**
- Usuario admin por defecto:
  - Email: admin@keylab.cl
  - Password: Admin123
  - Rol: administrador
- Almacenamiento: localStorage para usuarios, sessionStorage para sesión activa

---

### Fase 3: Sistema de Wrappers UI (Octubre 2024)

#### ✅ Paso 1: Button.jsx
**Fecha:** 19 de Octubre 2024  
**Ubicación:** `src/ui/Button.jsx`

**Objetivo:**
Crear el primer wrapper para encapsular Bootstrap, estableciendo el patrón para todos los componentes UI.

**Concepto de Wrapper:**
```
react-bootstrap (dependencia externa) ❌
          ↓
Nuestro Wrapper (control total) ✅
          ↓
Clases CSS de Bootstrap (mismo resultado visual)
```

**Props implementadas:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | string | 'primary' | Color: primary, danger, success, warning, info, light, dark, link |
| `size` | string | 'md' | Tamaño: sm, md, lg |
| `outline` | boolean | false | Botón con borde (btn-outline-*) |
| `block` | boolean | false | Ancho completo (w-100) |
| `type` | string | 'button' | Tipo HTML: button, submit, reset |
| `disabled` | boolean | false | Deshabilitar botón |
| `className` | string | '' | Clases CSS adicionales |
| `children` | ReactNode | - | Contenido del botón |

**Características técnicas:**
1. **forwardRef**: Permite acceso al DOM para librerías externas
2. **Mapas de variantes**: Objetos para mapear props a clases CSS
   ```jsx
   const VARIANTS = {
     primary: 'btn-primary',
     danger: 'btn-danger',
     success: 'btn-success',
     // ...
   };
   ```
3. **Construcción dinámica de clases**:
   ```jsx
   const classes = [
     'btn',
     variantClass,
     sizeClass,
     blockClass,
     className
   ].filter(Boolean).join(' ');
   ```
4. **Spread operator**: Pasa props adicionales automáticamente

**Ejemplos de uso:**
```jsx
// Botón simple
<Button variant="primary">Guardar</Button>

// Botón outline pequeño
<Button variant="danger" outline size="sm">Eliminar</Button>

// Botón de ancho completo
<Button variant="success" block type="submit">Continuar</Button>

// Con event handler
<Button variant="warning" onClick={handleClick}>Click</Button>
```

**Comparación:**

| Antes (react-bootstrap) | Después (nuestro wrapper) |
|------------------------|---------------------------|
| `import { Button } from 'react-bootstrap'` | `import Button from '../ui/Button'` |
| `<Button variant="primary">` | `<Button variant="primary">` |
| **Dependencia externa** | **Control total** |

---

#### ✅ Paso 2: Layout.jsx (Container, Row, Col)
**Fecha:** 21 de Octubre 2024  
**Ubicación:** `src/ui/Layout.jsx`

**Objetivo:**
Crear los componentes fundamentales del sistema de grillas de Bootstrap, usados en todas las páginas para layout responsivo.

**Componentes exportados:**

##### 1. Container
**Props:**
- `fluid` (boolean, default: false): Ancho completo vs contenedor con márgenes
- `className` (string): Clases adicionales
- `children` (ReactNode): Contenido

**Generación de clases:**
```jsx
fluid ? 'container-fluid' : 'container'
```

**Uso:**
```jsx
// Container normal (con márgenes automáticos)
<Container>
  <h1>Contenido</h1>
</Container>

// Container de ancho completo
<Container fluid>
  <div>Ocupa todo el ancho</div>
</Container>
```

##### 2. Row
**Props:**
- `className` (string): Clases adicionales
- `children` (ReactNode): Columnas

**Uso:**
```jsx
<Row>
  <Col>Columna 1</Col>
  <Col>Columna 2</Col>
</Row>
```

##### 3. Col
**Props responsivos:**
- `xs` (number/string): Breakpoint extra small (<576px)
- `sm` (number/string): Breakpoint small (≥576px)
- `md` (number/string): Breakpoint medium (≥768px)
- `lg` (number/string): Breakpoint large (≥992px)
- `xl` (number/string): Breakpoint extra large (≥1200px)
- `xxl` (number/string): Breakpoint extra extra large (≥1400px)

**Lógica de clases:**
```jsx
const colClasses = [];
if (xs) colClasses.push(`col-${xs}`);
if (sm) colClasses.push(`col-sm-${sm}`);
if (md) colClasses.push(`col-md-${md}`);
// ... etc

// Si no hay breakpoints, usar 'col' genérico
if (colClasses.length === 0) {
  colClasses.push('col');
}
```

**Ejemplos de uso:**

```jsx
// 1. Tres columnas iguales
<Row>
  <Col md={4}>Columna 1</Col>
  <Col md={4}>Columna 2</Col>
  <Col md={4}>Columna 3</Col>
</Row>

// 2. Columnas responsivas (stack en móvil, side-by-side en desktop)
<Row>
  <Col xs={12} md={6} lg={3}>100% móvil, 50% tablet, 25% desktop</Col>
  <Col xs={12} md={6} lg={3}>100% móvil, 50% tablet, 25% desktop</Col>
  <Col xs={12} md={6} lg={3}>100% móvil, 50% tablet, 25% desktop</Col>
  <Col xs={12} md={6} lg={3}>100% móvil, 50% tablet, 25% desktop</Col>
</Row>

// 3. Columnas automáticas (dividen el espacio equitativamente)
<Row>
  <Col>Auto 1</Col>
  <Col>Auto 2</Col>
  <Col>Auto 3</Col>
</Row>

// 4. Layout típico de página
<Container>
  <Row>
    <Col md={8}>
      <h1>Contenido Principal</h1>
      <p>Artículo...</p>
    </Col>
    <Col md={4}>
      <aside>Sidebar</aside>
    </Col>
  </Row>
</Container>
```

**Características técnicas:**
1. **forwardRef**: Todos los componentes soportan refs
2. **Spread operator**: Props HTML nativas se pasan directamente
3. **Clases dinámicas**: Se construyen según props proporcionadas
4. **Fallback inteligente**: Si no hay breakpoints, usa `col` genérico

**Página de prueba creada:**
- Ruta: `/test-layout`
- Archivo: `src/pages/TestLayout.jsx`
- Demuestra todos los casos de uso:
  - Container normal vs fluid
  - Columnas con diferentes breakpoints
  - Columnas automáticas
  - Diferentes combinaciones responsivas

**Pruebas realizadas:**
✅ Container normal muestra márgenes correctos  
✅ Container fluid ocupa todo el ancho  
✅ Columnas se distribuyen correctamente en desktop (md)  
✅ Columnas se apilan en móvil (xs)  
✅ Columnas automáticas dividen espacio equitativamente  
✅ Clases Bootstrap se generan correctamente  
✅ Props adicionales (className, style) funcionan  

**Comparación HTML generado:**

| Código JSX | HTML Resultante |
|-----------|----------------|
| `<Container>` | `<div class="container">` |
| `<Container fluid>` | `<div class="container-fluid">` |
| `<Row>` | `<div class="row">` |
| `<Col md={6}>` | `<div class="col-md-6">` |
| `<Col xs={12} lg={4}>` | `<div class="col-12 col-lg-4">` |

**Integración con proyecto:**
- ✅ Archivo creado en `src/ui/Layout.jsx`
- ✅ Exportaciones nombradas (no default)
- ✅ Página de prueba agregada al router
- ✅ Bootstrap JS cargado en `main.jsx` para interactividad
- ✅ Todos los componentes usando `forwardRef`

---

#### ✅ Paso 3: Card.jsx (Familia completa)
**Fecha:** 23 de Octubre 2024  
**Ubicación:** `src/ui/Card.jsx`

**Objetivo:**
Crear componentes de tarjetas (cards) modulares para mostrar productos, información y formularios.

**Componentes exportados:**

##### 1. Card (Contenedor principal)
**Props:**
- `shadow` (boolean, default: false): Añade sombra sutil
- `className` (string): Clases adicionales
- `children` (ReactNode): Contenido de la card

##### 2. CardHeader (Encabezado)
**Props:**
- `className` (string): Clases adicionales
- `children` (ReactNode): Contenido del header

##### 3. CardBody (Cuerpo con padding)
**Props:**
- `className` (string): Clases adicionales
- `children` (ReactNode): Contenido principal

##### 4. CardTitle (Título)
**Props:**
- `as` (string, default: 'h5'): Elemento HTML a renderizar
- `className` (string): Clases adicionales
- `children` (ReactNode): Texto del título

##### 5. CardText (Párrafo de texto)
**Props:**
- `className` (string): Clases adicionales
- `children` (ReactNode): Contenido del texto

##### 6. CardFooter (Pie de página)
**Props:**
- `className` (string): Clases adicionales
- `children` (ReactNode): Contenido del footer

##### 7. CardImg (Imagen)
**Props:**
- `variant` (string, default: 'top'): Posición de la imagen (top/bottom)
- `src` (string): URL de la imagen
- `alt` (string): Texto alternativo
- `className` (string): Clases adicionales

**Ejemplos de uso:**

```jsx
// Card simple
<Card>
  <CardBody>
    <CardTitle>Título</CardTitle>
    <CardText>Contenido</CardText>
  </CardBody>
</Card>

// Card completa con imagen
<Card shadow>
  <CardImg variant="top" src="/img/producto.jpg" alt="Producto" />
  <CardBody>
    <CardTitle>Teclado Mecánico</CardTitle>
    <CardText>Descripción del producto...</CardText>
    <Button variant="primary">Ver más</Button>
  </CardBody>
  <CardFooter>
    <small className="text-muted">$150.000</small>
  </CardFooter>
</Card>

// Card con header personalizado
<Card>
  <CardHeader className="bg-primary text-white">
    Información Importante
  </CardHeader>
  <CardBody>
    <CardText>Contenido de la card...</CardText>
  </CardBody>
</Card>
```

**Características técnicas:**
- ✅ Todos usan `forwardRef`
- ✅ Composición modular (usar solo las partes necesarias)
- ✅ Clases Bootstrap: card, card-header, card-body, card-title, card-text, card-footer, card-img-*
- ✅ `CardTitle` permite cambiar elemento HTML con prop `as`
- ✅ `CardImg` soporta variant para posición

**Página de prueba:**
- Ruta: `/test-card`
- Archivo: `src/pages/TestCard.jsx`

---

#### ✅ Paso 4: FormField.jsx (Campos de formulario universales)
**Fecha:** 23 de Octubre 2024  
**Ubicación:** `src/ui/FormField.jsx`

**Objetivo:**
Crear un componente universal para todos los tipos de inputs con validación integrada.

**Props principales:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `id` | string | - | ID del input |
| `name` | string | - | Nombre del input |
| `label` | string | - | Etiqueta del campo |
| `type` | string | 'text' | Tipo: text, email, password, checkbox, radio, etc. |
| `as` | string | 'input' | Elemento: input, select, textarea |
| `options` | array | [] | Opciones para select (string[] o {value, label}[]) |
| `helperText` | string | - | Texto de ayuda debajo del input |
| `error` | string | - | Mensaje de error |
| `isInvalid` | boolean | false | Estado inválido |
| `isValid` | boolean | false | Estado válido |
| `floating` | boolean | false | Labels flotantes |
| `inline` | boolean | false | Checkboxes/radios inline |
| `plaintext` | boolean | false | Renderizar como texto plano |
| `required` | boolean | false | Campo requerido |

**Tipos soportados:**
1. **Inputs de texto:** text, email, password, number, date, etc.
2. **Textarea:** con prop `as="textarea"`
3. **Select:** con prop `as="select"` + `options`
4. **Checkbox/Radio:** con prop `type="checkbox"` o `type="radio"`

**Ejemplos de uso:**

```jsx
// Input de texto simple
<FormField
  id="username"
  name="username"
  label="Nombre de usuario"
  type="text"
  required
/>

// Input con error
<FormField
  id="email"
  name="email"
  label="Correo electrónico"
  type="email"
  error="Email inválido"
  isInvalid
/>

// Input con helper text
<FormField
  id="password"
  name="password"
  label="Contraseña"
  type="password"
  helperText="Mínimo 8 caracteres"
/>

// Select con opciones
<FormField
  id="category"
  name="category"
  label="Categoría"
  as="select"
  options={['Teclados', 'Keycaps', 'Switches']}
/>

// Select con objetos
<FormField
  as="select"
  options={[
    { value: 'teclados', label: 'Teclados Mecánicos' },
    { value: 'keycaps', label: 'Keycaps Custom' }
  ]}
/>

// Textarea
<FormField
  id="description"
  name="description"
  label="Descripción"
  as="textarea"
  rows={4}
/>

// Checkbox
<FormField
  id="terms"
  name="terms"
  label="Acepto términos y condiciones"
  type="checkbox"
/>

// Radio buttons inline
<FormField
  id="gender-male"
  name="gender"
  label="Masculino"
  type="radio"
  value="male"
  inline
/>

// Floating labels
<FormField
  id="email"
  name="email"
  label="Correo electrónico"
  type="email"
  floating
/>
```

**Características técnicas:**
- ✅ Usa `forwardRef` (compatible con react-hook-form)
- ✅ Lógica inteligente para clases según tipo
- ✅ Soporta validación visual (is-invalid, is-valid)
- ✅ Helper text y mensajes de error
- ✅ Floating labels de Bootstrap 5
- ✅ Checkboxes y radios inline
- ✅ Plaintext para formularios read-only
- ✅ Spread operator para props HTML nativas

**Función auxiliar `getControlClasses`:**
```jsx
// Determina la clase CSS según el tipo de input
plaintext → 'form-control-plaintext'
checkbox/radio → 'form-check-input'
select → 'form-select'
default → 'form-control'
```

**Función auxiliar `getWrapperClasses`:**
```jsx
// Determina el wrapper según el tipo
floating → 'form-floating'
checkbox/radio → 'form-check' + opcional 'form-check-inline'
default → 'mb-3' (margin-bottom)
```

---

#### ✅ Paso 5: Alert.jsx (Mensajes de feedback)
**Fecha:** 23 de Octubre 2024  
**Ubicación:** `src/ui/Alert.jsx`

**Objetivo:**
Crear componente de alertas para mensajes de éxito, error, advertencia e información.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | string | 'primary' | Color: primary, secondary, success, danger, warning, info, light, dark |
| `dismissible` | boolean | false | Permite cerrar la alerta |
| `heading` | string | - | Encabezado de la alerta |
| `onClose` | function | - | Callback al cerrar |
| `show` | boolean | - | Control externo de visibilidad |
| `className` | string | '' | Clases adicionales |
| `closeLabel` | string | 'Close' | Texto del botón cerrar (accesibilidad) |
| `children` | ReactNode | - | Contenido de la alerta |

**Variantes disponibles:**
```jsx
VARIANTS = {
  primary: 'alert-primary',      // Azul
  secondary: 'alert-secondary',  // Gris
  success: 'alert-success',      // Verde
  danger: 'alert-danger',        // Rojo
  warning: 'alert-warning',      // Amarillo
  info: 'alert-info',            // Celeste
  light: 'alert-light',          // Claro
  dark: 'alert-dark'             // Oscuro
}
```

**Modos de operación:**

1. **No controlado (por defecto):**
   - Maneja su propia visibilidad con `useState`
   - Al cerrar, desaparece automáticamente

2. **Controlado:**
   - Prop `show` controla visibilidad desde el padre
   - `onClose` notifica al padre para cambiar `show`

**Ejemplos de uso:**

```jsx
// Alerta simple
<Alert variant="success">
  ¡Operación exitosa!
</Alert>

// Alerta con encabezado
<Alert variant="danger" heading="Error">
  No se pudo completar la operación.
</Alert>

// Alerta dismissible (no controlada)
<Alert variant="warning" dismissible>
  Esta es una advertencia que puedes cerrar.
</Alert>

// Alerta dismissible (controlada)
const [showAlert, setShowAlert] = useState(true);

<Alert 
  variant="info" 
  dismissible 
  show={showAlert}
  onClose={() => setShowAlert(false)}
>
  Mensaje controlado por el padre.
</Alert>

// Alerta con contenido HTML
<Alert variant="primary">
  <strong>Nota:</strong> Esto es un mensaje importante.
  <hr />
  <p className="mb-0">Más detalles aquí...</p>
</Alert>
```

**Características técnicas:**
- ✅ Control de visibilidad interno (no controlado) o externo (controlado)
- ✅ `useState` para estado interno
- ✅ Callback `onClose` opcional
- ✅ Clases Bootstrap: alert, alert-*, alert-dismissible, fade, show
- ✅ Botón de cierre con `btn-close`
- ✅ Atributo `role="alert"` para accesibilidad
- ✅ Encabezado con clase `alert-heading`

**Lógica de visibilidad:**
```jsx
const isControlled = controlledShow !== undefined;
const isVisible = isControlled ? controlledShow : uncontrolledShow;

if (!isVisible) return null;
```

---

#### ✅ Paso 6: Table.jsx (Tablas de datos)
**Fecha:** 23 de Octubre 2024  
**Ubicación:** `src/ui/Table.jsx`

**Objetivo:**
Crear componentes de tabla modulares para listados de datos en el admin panel.

**Componentes exportados:**

##### 1. Table (Contenedor principal)
**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `striped` | boolean/string | false | Filas rayadas: true o 'columns' |
| `hover` | boolean | false | Efecto hover en filas |
| `bordered` | boolean | false | Bordes en todas las celdas |
| `borderless` | boolean | false | Sin bordes |
| `size` | string | - | Tamaño: 'sm' para tabla compacta |
| `variant` | string | - | Color de fondo: 'dark', 'light', etc. |
| `responsive` | boolean/string | false | Wrapper responsive: true o breakpoint ('sm', 'md', 'lg', 'xl', 'xxl') |
| `className` | string | '' | Clases adicionales |

##### 2. TableHead (Encabezado)
**Props:** `className`, `children`

##### 3. TableBody (Cuerpo)
**Props:** `className`, `children`

##### 4. TableFoot (Pie de tabla)
**Props:** `className`, `children`

##### 5. TableRow (Fila)
**Props:** `className`, `children`

##### 6. TableCell (Celda)
**Props:**
- `as` (string): Elemento a renderizar: 'td' o 'th'
- `scope` (string): Scope para headers: 'row', 'col'
- `className` (string): Clases adicionales

**Ejemplos de uso:**

```jsx
// Tabla simple
<Table>
  <TableHead>
    <TableRow>
      <TableCell as="th">ID</TableCell>
      <TableCell as="th">Nombre</TableCell>
      <TableCell as="th">Precio</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>1</TableCell>
      <TableCell>Teclado</TableCell>
      <TableCell>$150.000</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Tabla con todas las características
<Table striped hover bordered size="sm" responsive>
  <TableHead>
    <TableRow>
      <TableCell as="th" scope="col">#</TableCell>
      <TableCell as="th" scope="col">Producto</TableCell>
      <TableCell as="th" scope="col">Stock</TableCell>
      <TableCell as="th" scope="col">Acciones</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {productos.map((p, i) => (
      <TableRow key={p.id}>
        <TableCell as="th" scope="row">{i + 1}</TableCell>
        <TableCell>{p.nombre}</TableCell>
        <TableCell>{p.stock}</TableCell>
        <TableCell>
          <Button size="sm" variant="primary">Editar</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

// Tabla responsive solo en móvil
<Table responsive="sm">
  {/* contenido */}
</Table>

// Tabla con footer
<Table>
  <TableHead>...</TableHead>
  <TableBody>...</TableBody>
  <TableFoot>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell>$450.000</TableCell>
    </TableRow>
  </TableFoot>
</Table>
```

**Características técnicas:**
- ✅ Función `getTableClasses` construye clases dinámicamente
- ✅ Función `wrapResponsive` envuelve en div si es necesaria
- ✅ `TableCell` usa `forwardRef` y soporta `as="th"` o `as="td"`
- ✅ Props HTML nativas se pasan con spread operator
- ✅ Soporte completo para striped, hover, bordered, borderless
- ✅ Responsive con breakpoints específicos

**Clases Bootstrap generadas:**
```jsx
table                  // Base
table-striped          // Filas rayadas
table-striped-columns  // Columnas rayadas
table-hover            // Efecto hover
table-bordered         // Con bordes
table-borderless       // Sin bordes
table-sm               // Compacta
table-dark / table-*   // Variantes de color
table-responsive       // Wrapper responsive
table-responsive-sm    // Responsive solo en breakpoint
```

---

## 📁 Estructura Actual del Proyecto

```
KeyLab/
├── public/
│   └── assets/
│       ├── css/
│       │   ├── main.css           # Estilos principales
│       │   └── admin.css          # Estilos del admin
│       ├── data/
│       │   └── productos.js       # Datos de productos
│       ├── fonts/
│       ├── img/                   # Imágenes del proyecto
│       └── js/
│           ├── carrito.js         # Lógica original del carrito
│           └── validaciones.js    # Validaciones originales
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # ✅ Navbar con dropdown
│   │   └── Footer.jsx             # ✅ Footer simple
│   ├── pages/
│   │   ├── Home.jsx               # ✅ Con carrusel
│   │   ├── Login.jsx              # ✅ Con validaciones
│   │   ├── Carrito.jsx            # 🟡 Placeholder
│   │   ├── Productos.jsx          # 🟡 Placeholder
│   │   ├── Teclados.jsx           # 🟡 Placeholder
│   │   ├── Keycaps.jsx            # 🟡 Placeholder
│   │   ├── Switches.jsx           # 🟡 Placeholder
│   │   ├── Cases.jsx              # 🟡 Placeholder
│   │   ├── Contacto.jsx           # 🟡 Placeholder
│   │   ├── Nosotros.jsx           # 🟡 Placeholder
│   │   ├── Ubicacion.jsx          # 🟡 Placeholder
│   │   ├── PerfilUsuario.jsx      # 🟡 Placeholder
│   │   └── TestLayout.jsx         # ✅ Página de pruebas
│   ├── ui/                        # 🎯 Wrappers de Bootstrap
│   │   ├── Button.jsx             # ✅ Completado
│   │   ├── Layout.jsx             # ✅ Completado (Container/Row/Col)
│   │   ├── Card.jsx               # ✅ Completado (Card, CardHeader, CardBody, etc.)
│   │   ├── FormField.jsx          # ✅ Completado (input, select, textarea, checkbox, radio)
│   │   ├── Alert.jsx              # ✅ Completado (alertas con todas las variantes)
│   │   ├── Table.jsx              # ✅ Completado (Table, TableHead, TableBody, etc.)
│   │   └── index.js               # ✅ Exportaciones centralizadas
│   ├── utils/
│   │   └── auth.js                # ✅ Autenticación básica
│   ├── App.jsx                    # ✅ Router principal
│   ├── App.css                    # ✅ Estilos globales
│   ├── main.jsx                   # ✅ Entry point
│   └── index.css                  # ✅ Reset CSS
└── package.json
```

---

## 🎯 Diferencias Clave: HTML Original vs React

| HTML Original | React Migrado |
|--------------|---------------|
| `class="container"` | `<Container>` |
| `<div class="row">` | `<Row>` |
| `<div class="col-md-6">` | `<Col md={6}>` |
| `class="btn btn-primary"` | `<Button variant="primary">` |
| `href="pagina.html"` | `<Link to="/ruta">` |
| Scripts inline | `useEffect()`, `useState()` |
| `onclick="function()"` | `onClick={handleClick}` |
| Bootstrap JS directo | Bootstrap + React wrappers |
| `/assets/` | `/public/assets/` |
| Múltiples archivos HTML | Una SPA con React Router |

---

## 🔧 Dependencias Instaladas

### Producción
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.4",
  "bootstrap": "^5.3.8",
  "react-bootstrap": "^2.10.10"
}
```

### Desarrollo
```json
{
  "@vitejs/plugin-react": "^5.0.4",
  "vite": "^7.1.9",
  "eslint": "^9.37.0"
}
```

---

## 🚀 Comandos Disponibles

```bash
# Iniciar servidor de desarrollo (http://localhost:5173)
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint

# Ejecutar tests
npm run test
```

---

## 🔧 Problemas Resueltos

### 1. Instalación de devDependencies
**Problema:** npm no instalaba dependencias de desarrollo  
**Solución:** `npm install --include=dev`

### 2. Rutas de Assets
**Problema:** Imágenes y CSS no se cargaban  
**Solución:** Mover todo a `public/assets/` y usar rutas absolutas `/assets/...`

### 3. Navbar con Bootstrap
**Problema:** Dropdown no funcionaba con componentes simples  
**Solución:** Usar react-bootstrap temporalmente, luego crear wrappers propios

### 4. Carrusel en React
**Problema:** Código jQuery no compatible  
**Solución:** Reimplementar con useState + useEffect + setInterval

### 5. Validaciones de Formularios
**Problema:** Scripts inline no funcionan en React  
**Solución:** Crear funciones de validación en utils/ y manejar con estado

### 6. Bootstrap JavaScript
**Problema:** Componentes interactivos (collapse, dropdown) no funcionaban  
**Solución:** Importar `bootstrap/dist/js/bootstrap.bundle.min.js` en `main.jsx`

---

## 📝 Próximos Pasos

### 🔴 Prioridad Alta (Integrante A)

#### ✅ Wrappers UI Base Completados
1. ✅ **Button.jsx** - Botones con variantes, tamaños y estados
2. ✅ **Layout.jsx** - Container, Row, Col para sistema de grillas
3. ✅ **Card.jsx** - Familia completa de componentes de tarjetas
4. ✅ **FormField.jsx** - Input universal para formularios
5. ✅ **Alert.jsx** - Alertas dismissibles con todas las variantes
6. ✅ **Table.jsx** - Tablas con todas las características de Bootstrap

#### ⏳ Wrappers Pendientes
1. **Badge.jsx**
   - Para etiquetas de estado
   - Para categorías de productos

2. **Navigation.jsx** (Navbar, Nav, NavDropdown, NavItem, NavLink)
   - Reemplazar react-bootstrap en Navbar.jsx actual
   - Sistema de navegación completo
   - Dropdown sin dependencias externas

3. **Modal.jsx**
   - Para diálogos y confirmaciones
   - Formularios en modal

4. **Pagination.jsx**
   - Para paginación de productos/listados

#### Actualizar Navbar
5. Migrar `src/components/Navbar.jsx` para usar los nuevos wrappers en lugar de react-bootstrap
6. Verificar que el menú responsive siga funcionando
7. Mantener el contador del carrito funcional

#### Documentación
8. Crear `src/ui/README.md` con:
    - Propósito de cada componente
    - Tabla de props
    - Ejemplos de uso
    - Lista de componentes pendientes

### 🟡 Prioridad Media (Integrante B)

#### Migrar Páginas de Productos
1. Crear componentes reutilizables:
   - `ProductCard`: Tarjeta de producto individual
   - `ProductGrid`: Grilla de productos
   - `ProductFilter`: Filtros de categoría/precio

2. Migrar páginas:
   - `Productos.jsx`: Catálogo completo
   - `Teclados.jsx`: Filtrado por categoría
   - `Keycaps.jsx`: Filtrado por categoría
   - `Switches.jsx`: Filtrado por categoría
   - `Cases.jsx`: Filtrado por categoría

3. Conectar con datos:
   - Cargar productos desde `public/assets/data/productos.js`
   - Implementar filtrado y búsqueda
   - Agregar al carrito funcional

4. Migrar páginas de contenido:
   - `Contacto.jsx`: Formulario de contacto
   - `Nosotros.jsx`: Información de la empresa
   - `Ubicacion.jsx`: Mapa y dirección

### 🟢 Prioridad Baja (Integrante C)

#### Sistema de Carrito
1. Crear Context API para el carrito:
   - `CartContext.jsx`: Estado global del carrito
   - `CartProvider.jsx`: Provider para la app
   - Acciones: add, remove, update, clear

2. Migrar `Carrito.jsx`:
   - Listar productos del carrito
   - Actualizar cantidades
   - Calcular totales
   - Botón de checkout

3. Hooks personalizados:
   - `useCart()`: Para acceder al carrito desde cualquier componente
   - `useAuth()`: Para gestión de autenticación

#### Autenticación Completa
4. Completar flujo de Login:
   - Validar credenciales contra localStorage
   - Guardar sesión en sessionStorage
   - Redirección según rol (admin/cliente)

5. Crear páginas:
   - `Registro.jsx`: Formulario de registro
   - `PassRecov.jsx`: Recuperación de contraseña
   - `Perfil.jsx`: Editar perfil de usuario

#### Panel de Administración
6. Layout del admin:
   - Sidebar con navegación
   - Dashboard con estadísticas

7. CRUD de Productos:
   - Listar productos (tabla)
   - Crear producto nuevo
   - Editar producto existente
   - Eliminar producto

8. CRUD de Usuarios:
   - Listar usuarios
   - Editar roles
   - Desactivar usuarios

---

## 🎓 Conceptos React Aplicados

### Hooks Utilizados
- **useState**: Estado local en componentes
- **useEffect**: Efectos secundarios (carrusel, localStorage)
- **forwardRef**: Referencias a elementos DOM

### Patrones de Diseño
- **Component Composition**: Composición de componentes pequeños y reutilizables
- **Props Drilling**: Pasar datos de padres a hijos
- **Controlled Components**: Formularios controlados por React
- **Wrapper Pattern**: Encapsular dependencias externas

### Técnicas JavaScript
- **Destructuring**: Extraer props de objetos
- **Default Parameters**: Valores por defecto
- **Spread Operator**: Copiar y combinar objetos
- **Template Literals**: Strings dinámicos
- **Array Methods**: filter, map, join
- **Conditional Logic**: Operadores ternarios y short-circuit

---

## 📚 Recursos y Referencias

### Documentación Oficial
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3)

### Guías Específicas
- [React forwardRef](https://react.dev/reference/react/forwardRef)
- [Bootstrap Grid System](https://getbootstrap.com/docs/5.3/layout/grid/)
- [Bootstrap Buttons](https://getbootstrap.com/docs/5.3/components/buttons/)
- [React Hooks](https://react.dev/reference/react)

### Archivos de Referencia del Proyecto Original
- `/home/nicolas/u/FS2/Proyecto-FS2/docs/BOOTSTRAP_USAGE_MAP.md`
- `/home/nicolas/u/FS2/Proyecto-FS2/assets/js/*.js`
- `/home/nicolas/u/FS2/Proyecto-FS2/assets/css/*.css`

---

## 📌 Notas Importantes

1. **Bootstrap está temporalmente**: Los wrappers usan clases Bootstrap, pero cuando tengamos todos los componentes listos, podemos cambiar el interior de cada wrapper sin tocar el resto del código.

2. **Mantener estilos originales**: El archivo `public/assets/css/main.css` contiene estilos personalizados que complementan Bootstrap. Estos se deben respetar.

3. **Assets en public**: Todos los assets (imágenes, CSS, JS originales) están en `public/assets/` para acceso directo sin procesamiento de Vite.

4. **localStorage vs sessionStorage**: 
   - `localStorage`: Datos persistentes (usuarios, productos en carrito)
   - `sessionStorage`: Sesión actual (usuario logueado)

5. **Coordinación entre integrantes**: 
   - A crea wrappers → B y C los usan inmediatamente
   - Comunicar en README cuando un nuevo componente esté listo
   - No duplicar trabajo: revisar qué está hecho antes de empezar

6. **Testing manual**: Por ahora, probar manualmente en el navegador. Considerar tests automatizados más adelante.

7. **Git workflow**: Hacer commits frecuentes con mensajes descriptivos. Cada wrapper o página completada debe ser un commit.

---

## 🎯 Métricas de Progreso

### Componentes UI Wrappers
- ✅ Button (6/10) - 10%
- ✅ Layout (Container, Row, Col) (6/10) - 10%
- ✅ Card (6/10) - 10%
- ✅ FormField (6/10) - 10%
- ✅ Alert (6/10) - 10%
- ✅ Table (6/10) - 10%
- ⏳ Badge (0/10)
- ⏳ Navigation (0/10)
- ⏳ Modal (0/10)
- ⏳ Pagination (0/10)

**Total Wrappers: 60% completado** (6 de 10)

### Páginas
- ✅ Home (1/13) - 8%
- ✅ Login (1/13) - 8%
- ⏳ Productos (0/13)
- ⏳ Teclados (0/13)
- ⏳ Keycaps (0/13)
- ⏳ Switches (0/13)
- ⏳ Cases (0/13)
- ⏳ Contacto (0/13)
- ⏳ Nosotros (0/13)
- ⏳ Ubicacion (0/13)
- ⏳ Carrito (0/13)
- ⏳ Perfil (0/13)
- ⏳ Admin (0/13)

**Total Páginas: 15% completado** (2 de 13)

### Funcionalidades
- ✅ Routing (100%)
- ✅ Navegación (100%)
- ✅ Carrusel (100%)
- 🟡 Autenticación (50%)
- ⏳ Carrito (0%)
- ⏳ Catálogo (0%)
- ⏳ Admin Panel (0%)
- ⏳ Formularios (25%)

**Total Funcionalidades: 47% completado**

---

## 🏁 Objetivo Final

Una aplicación React moderna, mantenible y escalable que:
1. ✅ Replique toda la funcionalidad del proyecto HTML original
2. ✅ Mantenga el diseño y estilo visual original
3. ✅ Use componentes reutilizables y bien documentados
4. ✅ Tenga Bootstrap encapsulado en wrappers (fácil de reemplazar)
5. ✅ Sea fácil de mantener y extender por cualquier desarrollador
6. 🟡 Tenga código limpio, organizado y siguiendo mejores prácticas
7. ⏳ Sea responsive en todos los dispositivos
8. ⏳ Tenga buena performance (lazy loading, optimizaciones)

---

**Última actualización:** 23 de Octubre 2024  
**Próximo paso:** Crear Badge.jsx, Navigation.jsx, Modal.jsx y migrar páginas de productos  
**Responsable actual:** Integrantes A, B y C (Wrappers pendientes + Migración de páginas)
