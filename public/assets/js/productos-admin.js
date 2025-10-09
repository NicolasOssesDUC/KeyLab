// --- LÓGICA PARA LA GESTIÓN DE PRODUCTOS EN EL PANEL DE ADMIN ---

function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || [];
}

function guardarProductos(listaProductos) {
    localStorage.setItem('productos', JSON.stringify(listaProductos));
}

function guardarNuevoProducto() {
    const nombre = document.getElementById('nombre').value.trim();
    const categoria = document.getElementById('categoria').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value, 10);
    const imagen = document.getElementById('imagen').value.trim(); // <-- LEER CAMPO IMAGEN
    const descripcion = document.getElementById('descripcion').value.trim();

    if (!nombre || !categoria || isNaN(precio) || isNaN(stock) || !imagen) { // <-- AÑADIR VALIDACIÓN DE IMAGEN
        alert('Por favor, completa todos los campos requeridos (Nombre, Categoría, Precio, Stock, Ruta de Imagen).');
        return;
    }

    const listaProductos = obtenerProductos();
    const nuevoId = listaProductos.reduce((maxId, p) => Math.max(p.id, maxId), 0) + 1;

    const nuevoProducto = {
        id: nuevoId,
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        stock: stock,
        descripcion: descripcion,
        imagen: imagen, // <-- GUARDAR LA RUTA DE LA IMAGEN
        estado: document.getElementById('estado').checked ? 'Activo' : 'Inactivo'
    };

    listaProductos.push(nuevoProducto);
    guardarProductos(listaProductos);

    alert('¡Producto guardado exitosamente!');
    window.location.href = 'productos.html';
}