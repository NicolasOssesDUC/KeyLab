document.addEventListener('DOMContentLoaded', function() {
    seedAdminUser();
    initLoginForm();
    initContactoForm();
    initRegistroForm();
    initNuevoUsuarioForm(); 
});

// --- INICIALIZACIÓN Y DATOS SEMILLA ---

function seedAdminUser() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.length === 0) {
        const admin = {
            run: '1-9',
            nombre: 'Admin',
            apellidos: 'KeyLab',
            email: 'admin@keylab.cl',
            password: 'admin',
            rol: 'Administrador'
        };
        usuarios.push(admin);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}

// --- FORMULARIO LOGIN ---
function initLoginForm() {
    const loginForm = document.getElementById('formulario-login');
    if (!loginForm) return;

    loginForm.addEventListener('input', (event) => validateSingleField(event.target));
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const isFormatValid = validateLoginForm();
        if (!isFormatValid) return;

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password);

        if (usuarioEncontrado) {
            sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));
            
            if (usuarioEncontrado.rol === 'Administrador') {
                window.location.href = 'admin/index.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            setFieldError('email', 'Correo o contraseña incorrectos.');
            setFieldError('password', ' ');
        }
    });
}

function validateLoginForm() {
    const isEmailValid = validateSingleField(document.getElementById('email'));
    const isPasswordValid = validateSingleField(document.getElementById('password'));
    return isEmailValid && isPasswordValid;
}


// --- VALIDACIÓN DE CAMPOS (GENERAL) ---
function validateSingleField(field) {
    if (!field || !field.id) return true;

    let isValid = true;
    let message = '';

    switch (field.id) {
        case 'email':
        case 'email-registro':
            const emailValue = field.value.trim();
            const allowedDomains = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com', 'keylab.cl'];
            if (emailValue === '') {
                message = 'El correo es requerido.';
                isValid = false;
            } else if (emailValue.length > 100) {
                message = 'El correo excede los 100 caracteres.';
                isValid = false;
            } else {
                const domain = emailValue.substring(emailValue.lastIndexOf('@') + 1);
                if (emailValue.lastIndexOf('@') === -1 || !allowedDomains.includes(domain.toLowerCase())) {
                    message = 'El dominio del correo no es válido.';
                    isValid = false;
                }
            }
            break;

        case 'password':
        case 'password-registro':
            const passwordValue = field.value.trim();
            if (passwordValue === '') {
                message = 'La contraseña es requerida.';
                isValid = false;
            } else if (passwordValue.length < 4 || passwordValue.length > 10) {
                message = 'La contraseña debe tener entre 4 y 10 caracteres.';
                isValid = false;
            }
            break;

        case 'password-confirm':
            const confirmValue = field.value.trim();
            const originalPassword = document.getElementById('password-registro').value.trim();
            if (confirmValue === '') {
                message = 'Por favor, confirma la contraseña.';
                isValid = false;
            } else if (confirmValue !== originalPassword) {
                message = 'Las contraseñas no coinciden.';
                isValid = false;
            }
            break;

        case 'run':
            const runValue = field.value.trim();
            const runRegex = /^[0-9]{1,8}-[0-9kK]{1}$/;
            if (runValue === '') {
                message = 'El RUN es requerido.';
                isValid = false;
            } else if (!runRegex.test(runValue)) {
                message = 'Formato de RUN no válido (ej: 12345678-9).';
                isValid = false;
            }
            break;
    }

    setFieldError(field.id, message);
    return isValid;
}

function setFieldError(fieldId, message) {
    const errorSpan = document.getElementById(`error-${fieldId}`);
    const input = document.getElementById(fieldId);
    if (errorSpan && input) {
        errorSpan.textContent = message;
        message ? input.classList.add('is-invalid') : input.classList.remove('is-invalid');
    }
}


// --- FORMULARIO CONTACTO ---
function initContactoForm() {
    const contactoForm = document.getElementById('contacto-form');
    if (!contactoForm) return;

    contactoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateContactoForm()) {
            alert('¡Mensaje enviado! Tu mensaje ha sido enviado correctamente.');
            contactoForm.reset();
            clearContactoErrors();
        }
    });
}

function validateContactoForm() {
    let isValid = true;
    clearContactoErrors();
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const mensaje = document.getElementById('mensaje');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre.value.trim()) {
        setContactoError(nombre, 'El nombre es requerido.');
        isValid = false;
    }
    if (!correo.value.trim() || !emailRegex.test(correo.value.trim())) {
        setContactoError(correo, 'Correo electrónico no válido.');
        isValid = false;
    }
    if (!mensaje.value.trim() || mensaje.value.trim().length < 10) {
        setContactoError(mensaje, 'El mensaje debe tener al menos 10 caracteres.');
        isValid = false;
    }
    return isValid;
}

function setContactoError(input, message) {
    input.classList.add('is-invalid');
    input.placeholder = message;
    input.value = '';
}

function clearContactoErrors() {
    const fields = ['nombre', 'correo', 'mensaje'];
    fields.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.classList.remove('is-invalid');
            if (input.dataset.originalPlaceholder) {
                input.placeholder = input.dataset.originalPlaceholder;
            }
        }
    });
}


// --- FORMULARIO REGISTRO PÚBLICO ---
function initRegistroForm() {
    const registroForm = document.getElementById('formulario-registro');
    if (!registroForm) return;

    registroForm.addEventListener('input', (event) => {
        validateSingleField(event.target);
    });

    registroForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateRegistroForm()) {
            const nuevoUsuario = {
                run: document.getElementById('run').value,
                nombre: document.getElementById('nombre').value,
                apellidos: document.getElementById('apellidos').value,
                email: document.getElementById('email-registro').value,
                password: document.getElementById('password-registro').value,
                rol: 'Cliente', // Asignar rol por defecto
                region: document.getElementById('region').value,
                comuna: document.getElementById('comuna').value,
                direccion: document.getElementById('direccion').value,
            };

            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            
            const emailExistente = usuarios.find(user => user.email === nuevoUsuario.email);
            if (emailExistente) {
                setFieldError('email-registro', 'Este correo ya está registrado.');
                return;
            }

            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert('¡Registro exitoso! Serás redirigido al login.');
            setTimeout(() => { window.location.href = 'login.html'; }, 100);
        }
    });

    // Cargar Regiones y Comunas
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');

    fetch('../assets/data/regiones-comunas.json') 
        .then(response => response.json())
        .then(data => {
            const regiones = data;
            regionSelect.innerHTML = '<option value="">Seleccione una región</option>';
            regiones.forEach(region => {
                const option = document.createElement('option');
                option.value = region.region;
                option.textContent = region.region;
                regionSelect.appendChild(option);
            });

            regionSelect.addEventListener('change', function() {
                const selectedRegion = regiones.find(r => r.region === this.value);
                comunaSelect.innerHTML = '';

                if (selectedRegion && this.value) {
                    comunaSelect.disabled = false;
                    comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
                    selectedRegion.comunas.forEach(comuna => {
                        const option = document.createElement('option');
                        option.value = comuna;
                        option.textContent = comuna;
                        comunaSelect.appendChild(option);
                    });
                } else {
                    comunaSelect.disabled = true;
                    comunaSelect.innerHTML = '<option value="">Selecciona una región primero</option>';
                }
            });
        })
        .catch(error => console.error('Error al cargar los datos de regiones:', error));
}

function validateRegistroForm() {
    let isValid = true;
    isValid = validateSingleField(document.getElementById('run')) && isValid;
    isValid = validateSingleField(document.getElementById('nombre')) && isValid;
    isValid = validateSingleField(document.getElementById('apellidos')) && isValid;
    isValid = validateSingleField(document.getElementById('email-registro')) && isValid;
    isValid = validateSingleField(document.getElementById('password-registro')) && isValid;
    isValid = validateSingleField(document.getElementById('password-confirm')) && isValid;
    isValid = validateSingleField(document.getElementById('direccion')) && isValid;
    return isValid;
}


// --- FORMULARIO NUEVO USUARIO (ADMIN) ---

function initNuevoUsuarioForm() {
    const form = document.getElementById('form-nuevo-usuario');
    if (!form) return;

    form.addEventListener('input', (event) => {
        validateSingleField(event.target);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateNuevoUsuarioForm()) {
            const nuevoUsuario = {
                run: document.getElementById('run').value,
                nombre: document.getElementById('nombre').value,
                apellidos: document.getElementById('apellidos').value,
                email: document.getElementById('email-registro').value,
                password: document.getElementById('password-registro').value,
                rol: document.getElementById('rol').value
            };

            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const emailExistente = usuarios.find(user => user.email === nuevoUsuario.email);

            if (emailExistente) {
                setFieldError('email-registro', 'Este correo ya está registrado.');
                return;
            }

            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert('Usuario creado exitosamente.');
            window.location.href = 'usuarios.html'; // Redirigir a la lista de usuarios
        }
    });
}

function validateNuevoUsuarioForm() {
    let isValid = true;
    isValid = validateSingleField(document.getElementById('run')) && isValid;
    isValid = validateSingleField(document.getElementById('nombre')) && isValid;
    isValid = validateSingleField(document.getElementById('apellidos')) && isValid;
    isValid = validateSingleField(document.getElementById('email-registro')) && isValid;
    isValid = validateSingleField(document.getElementById('password-registro')) && isValid;
    isValid = validateSingleField(document.getElementById('rol')) && isValid; // Validar que se haya seleccionado un rol
    return isValid;
}