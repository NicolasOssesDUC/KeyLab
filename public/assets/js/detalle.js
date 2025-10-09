document.addEventListener('DOMContentLoaded', function() {
    // 1. Obtener el ID del producto desde la URL
    const params = new URLSearchParams(window.location.search);
    const productoId = parseInt(params.get('id'));

    
    if (isNaN(productoId)) {
        document.getElementById('producto-detalle').innerHTML = '<div class="alert alert-danger">Error: Producto no especificado.</div>';
        return;
    }

    // 2. Buscar el producto 
    const productosParaBuscar = JSON.parse(localStorage.getItem('productos')) || productos;
    const producto = productosParaBuscar.find(p => p.id === productoId);

    // 3. Si el producto no se encuentra, mostrar un mensaje
    if (!producto) {
        document.getElementById('producto-detalle').innerHTML = '<div class="alert alert-danger">Producto no encontrado.</div>';
        return;
    }

    // 4. Rellenar la página 
    document.getElementById('nombre').textContent = producto.nombre;
    document.getElementById('precio').textContent = `$${producto.precio.toLocaleString('es-CL')}`;
    document.getElementById('imagen').src = producto.imagen;
    document.getElementById('imagen').alt = producto.nombre;
    document.getElementById('descripcion').textContent = producto.descripcion || 'Este producto no tiene una descripción disponible.';

    // botón "Agregar al Carrito"
    const btnCarrito = document.getElementById('btn-carrito');
    if (btnCarrito) {
        btnCarrito.addEventListener('click', () => {
            window.agregarAlCarrito(producto.id);
        });
    }
});
