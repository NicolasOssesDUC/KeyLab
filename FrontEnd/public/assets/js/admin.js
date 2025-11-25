(function() {
    // 1. Obtener el usuario de la sesión
    const usuarioLogueadoString = sessionStorage.getItem('usuarioLogueado');
    
    // Si no hay nadie logueado, redirigir al login.
    if (!usuarioLogueadoString) {
        console.log('Acceso denegado: No hay usuario en sesión.');
        window.location.href = '../login.html';
        return; 
    }

    
    const usuario = JSON.parse(usuarioLogueadoString);

    // 2. Comprobar si el rol es 'Administrador'
    if (usuario.rol !== 'Administrador') {
        console.log(`Acceso denegado: El usuario ${usuario.nombre} no tiene rol de Administrador.`);
        window.location.href = '../index.html';
    }

    console.log(`Acceso permitido: Hola, ${usuario.nombre}.`);
})();


