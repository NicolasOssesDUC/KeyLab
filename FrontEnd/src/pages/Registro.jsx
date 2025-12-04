import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ALLOWED_EMAIL_DOMAINS } from '../utils/auth';
import { useAuth } from '../context/AuthContext';

function Registro() {
  const [form, setForm] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirmar: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { register } = useAuth();

  useEffect(() => {
    document.body.classList.add('login-body');
    return () => document.body.classList.remove('login-body');
  }, []);

  const validateField = (field, value) => {
    let message = '';

    if (['nombre', 'apellidos', 'run'].includes(field) && !value.trim()) {
      message = 'Campo requerido.';
    }

    if (field === 'email') {
      const trimmed = value.trim();
      const atIndex = trimmed.lastIndexOf('@');
      const domain = trimmed.substring(atIndex + 1).toLowerCase();
      if (!trimmed) message = 'Correo requerido.';
      else if (atIndex === -1 || !ALLOWED_EMAIL_DOMAINS.includes(domain)) {
        message = 'Dominio no válido.';
      }
    }

    if (field === 'password') {
      if (!value.trim()) message = 'Contraseña requerida.';
      else if (value.length < 4 || value.length > 10)
        message = 'Debe tener entre 4 y 10 caracteres.';
    }

    if (field === 'confirmar' && value !== form.password) {
      message = 'Las contraseñas no coinciden.';
    }

    return message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(form).forEach((f) => (newErrors[f] = validateField(f, form[f])));
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      await register({
        nombre: form.nombre.trim(),
        apellido: form.apellidos.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
        telefono: "99999999",
        fechaNacimiento: "2000-01-01"
      });
      
      alert('Registro exitoso. ¡Bienvenido!');
      navigate('/');
    } catch (error) {
      console.error("Error registro:", error);
      alert('Error al registrar: ' + error.message);
    }
  };

  return (
    <main className="pt-5">
      <div className="split-container">
        <div className="split-left">
          <Link to="/">
            <img src="/assets/img/logokb.png" alt="Logo KeyLab" className="split-logo" />
          </Link>
          <h1 className="welcome-message">Crea tu cuenta</h1>
        </div>

        <div className="split-right">
          <section className="login-container">
            <div className="login-card">
              <h2>Registro</h2>
              <form id="formulario-login" onSubmit={handleSubmit} noValidate>
                {/* RUN */}
                <div className="input-group">
                  <svg 
                    className="input-icon" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    width="20" 
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="M12 2a5 5 0 0 1 5 5v1h2a1 1 0 0 1 0 2h-2v7h2a1 1 0 0 1 0 2h-2v1a5 5 0 0 1-10 0v-1H5a1 1 0 0 1 0-2h2v-7H5a1 1 0 0 1 0-2h2V7a5 5 0 0 1 5-5z" />
                  </svg>
                  <input
                    type="text"
                    id="run"
                    name="run"
                    placeholder="RUN"
                    value={form.run}
                    onChange={handleChange}
                    className={errors.run ? 'is-invalid' : ''}
                    required
                  />
                  <span id="error-run" className="error-message">{errors.run}</span>
                </div>

                {/* NOMBRE */}
                <div className="input-group">
                  <svg 
                    className="input-icon" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    width="20" 
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm-7 9v-1a7 7 0 0 1 14 0v1Z" />
                  </svg>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className={errors.nombre ? 'is-invalid' : ''}
                    required
                  />
                  <span id="error-nombre" className="error-message">{errors.nombre}</span>
                </div>

                {/* APELLIDOS */}
                <div className="input-group">
                  <svg 
                    className="input-icon" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    width="20" 
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm-7 9v-1a7 7 0 0 1 14 0v1Z" />
                  </svg>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    placeholder="Apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                    className={errors.apellidos ? 'is-invalid' : ''}
                    required
                  />
                  <span id="error-apellidos" className="error-message">{errors.apellidos}</span>
                </div>

                {/* EMAIL */}
                <div className="input-group">
                  <svg
                    className="input-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="M1.5 4.5h21V19.5h-21V4.5Zm2.25 1.5v1.337l8.25 5.5 8.25-5.5V6H3.75Zm0 12h19.5V8.663l-9.75 6.5-9.75-6.5V18Z" />
                  </svg>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? 'is-invalid' : ''}
                    required
                  />
                  <span id="error-email" className="error-message">{errors.email}</span>
                </div>

                {/* PASSWORD */}
                <div className="input-group">
                  <svg
                    className="input-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3h10.5v-3A5.25 5.25 0 0 0 12 1.5Zm-3.75 5.25a3.75 3.75 0 0 1 7.5 0v3h-7.5v-3ZM4.5 9.75v10.5h15V9.75h-15Zm1.5 1.5h12v7.5h-12v-7.5Z" />
                  </svg>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    className={errors.password ? 'is-invalid' : ''}
                    required
                  />
                  <span id="error-password" className="error-message">{errors.password}</span>
                </div>

                {/* CONFIRMAR PASSWORD */}
                <div className="input-group">
                  <svg
                    className="input-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3h10.5v-3A5.25 5.25 0 0 0 12 1.5Zm-3.75 5.25a3.75 3.75 0 0 1 7.5 0v3h-7.5v-3ZM4.5 9.75v10.5h15V9.75h-15Zm1.5 1.5h12v7.5h-12v-7.5Z" />
                  </svg>
                  <input
                    type="password"
                    id="confirmar"
                    name="confirmar"
                    placeholder="Confirmar Contraseña"
                    value={form.confirmar}
                    onChange={handleChange}
                    className={errors.confirmar ? 'is-invalid' : ''}
                    required
                  />
                  <span id="error-confirmar" className="error-message">{errors.confirmar}</span>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Crear cuenta
                  </button>
                </div>

                <div className="separator">o</div>

                <div className="form-actions">
                  <button type="button" className="btn btn-google">
                    <svg
                      className="google-logo"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0C14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6C44.48 38.37 46.98 32.19 46.98 24.55z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    Registrarse con Google
                  </button>
                </div>

                <div className="login-links">
                  <p>
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="link-accent">
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Registro;
