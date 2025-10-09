// --- LÓGICA DEL CARRITO DE COMPRAS ---

window.obtenerCarrito = function() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

window.guardarCarrito = function(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    window.actualizarContador();
}

window.agregarAlCarrito = function(idProducto) {
    // BUSCAMOS EN LOCALSTORAGE
    const productosMaestros = JSON.parse(localStorage.getItem('productos')) || [];
    const productoAAgregar = productosMaestros.find(p => p.id === idProducto);

    if (!productoAAgregar) {
        console.error(`Producto con ID ${idProducto} no encontrado en localStorage.`);
        return;
    }

    const carrito = window.obtenerCarrito();
    const itemEnCarrito = carrito.find(item => item.id === idProducto);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        const nuevoItem = { ...productoAAgregar, cantidad: 1 };
        carrito.push(nuevoItem);
    }

    window.guardarCarrito(carrito);
    alert(`'${productoAAgregar.nombre}' ha sido añadido al carrito.`);
}

window.eliminarItemDelCarrito = function(index) {
    const carrito = window.obtenerCarrito();
    carrito.splice(index, 1);
    window.guardarCarrito(carrito);
}

window.vaciarCarrito = function() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        window.guardarCarrito([]);
    }
}

window.actualizarContador = function() {
    const carrito = window.obtenerCarrito();
    const contadorElemento = document.getElementById('contador');
    if (contadorElemento) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contadorElemento.textContent = totalItems;
    }
}

window.renderizarPaginaCarrito = function() {
    const carrito = window.obtenerCarrito();
    const lista = document.getElementById('carrito-lista');
    const totalDiv = document.getElementById('carrito-total');
    const vacioDiv = document.getElementById('carrito-vacio');

    if (!lista) return;

    lista.innerHTML = '';
    if (carrito.length === 0) {
        vacioDiv.style.display = 'block';
        totalDiv.textContent = '';
        return;
    }

    vacioDiv.style.display = 'none';
    let sumaTotal = 0;

    carrito.forEach((item, index) => {
        sumaTotal += item.precio * item.cantidad;
        const itemHTML = `
            <div class="card mb-3">
              <div class="row g-0 align-items-center">
                <div class="col-md-2 text-center">
                  <img src="${item.imagen}" class="img-fluid rounded" style="max-height:70px;">
                </div>
                <div class="col-md-4">
                  <div class="card-body">
                    <h5 class="card-title">${item.nombre}</h5>
                    <p class="card-text mb-0">Precio: $${item.precio.toLocaleString('es-CL')}</p>
                  </div>
                </div>
                <div class="col-md-2">
                    <p class="card-text">Cantidad: ${item.cantidad}</p>
                </div>
                <div class="col-md-4 text-end pe-4">
                  <button class="btn btn-danger btn-sm eliminar-item" data-index="${index}">Eliminar</button>
                </div>
              </div>
            </div>
        `;
        lista.innerHTML += itemHTML;
    });

    totalDiv.textContent = `Total: $${sumaTotal.toLocaleString('es-CL')}`;

    document.querySelectorAll('.eliminar-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            window.eliminarItemDelCarrito(parseInt(index));
            window.renderizarPaginaCarrito();
        });
    });
}

// --- INICIALIZACIÓN --- 
document.addEventListener('DOMContentLoaded', () => {
    window.actualizarContador();
    window.renderizarPaginaCarrito();

    const btnVaciar = document.getElementById('vaciar-carrito');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            window.vaciarCarrito();
            window.renderizarPaginaCarrito();
        });
    }

    const btnFinalizar = document.getElementById('finalizar-compra');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            const carrito = window.obtenerCarrito();
            if(carrito.length === 0) return;
            alert('¡Gracias por tu compra!');
            window.guardarCarrito([]);
            window.renderizarPaginaCarrito();
        });
    }
});
