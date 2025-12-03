import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ALLOWED_EMAIL_DOMAINS } from '../utils/auth'; // ✅ solo el dominio, sin seedAdminUser

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // login asíncrono que llama al backend

  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const validateField = (field, value) => {
    let message = '';

    if (field === 'email') {
      const trimmed = value.trim();
      if (!trimmed) {
        message = 'El correo es requerido.';
      } else if (trimmed.length > 100) {
        message = 'El correo excede los 100 caracteres.';
      } else {
        const atIndex = trimmed.lastIndexOf('@');
        const domain = trimmed.substring(atIndex + 1).toLowerCase();
        if (atIndex === -1 || !ALLOWED_EMAIL_DOMAINS.includes(domain)) {
          message = 'El dominio del correo no es válido.';
        }
      }
    }

    if (field === 'password') {
      const trimmed = value.trim();
      if (!trimmed) {
        message = 'La contraseña es requerida.';
      } else if (trimmed.length < 4 || trimmed.length > 10) {
        message = 'La contraseña debe tener entre 4 y 10 caracteres.';
      }
    }

    return message;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setGeneralError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentErrors = {
      email: validateField('email', form.email),
      password: validateField('password', form.password),
    };
    setErrors(currentErrors);

    const hasErrors = Object.values(currentErrors).some(Boolean);
    if (hasErrors) return;

    try {
      // 🔐 Login REAL contra el backend (AuthContext -> /api/auth/authenticate)
      const data = await login(form.email.trim(), form.password.trim());
      // data debería incluir { token, email, rol } si tu AuthContext retorna eso

      const rol = (data?.rol || '').toUpperCase();

      if (rol === 'ADMIN' || rol === 'ADMINISTRADOR') {
        navigate('/admin');
      } else {
        navigate('/'); // Home
      }
    } catch (err) {
      console.error(err);
      setGeneralError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <main className="pt-5">
      <div className="split-container">
        <div className="split-left">
          <Link to="/">
            <img src="/assets/img/logokb.png" alt="Logo KeyLab" className="split-logo" />
          </Link>
          <h1 className="welcome-message">Bienvenido</h1>
        </div>

        <div className="split-right">
          <section className="login-container">
            <div className="login-card">
              <h2>Log In</h2>
              <form id="formulario-login" onSubmit={handleSubmit} noValidate>
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
                  <span id="error-email" className="error-message">
                    {errors.email}
                  </span>
                </div>

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
                  <span id="error-password" className="error-message">
                    {errors.password}
                  </span>
                </div>

                {generalError && (
                  <p className="error-message" style={{ textAlign: 'center' }}>
                    {generalError}
                  </p>
                )}

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Comencemos
                  </button>
                </div>

                <div className="separator">o</div>



                <div className="login-links">
                  <Link to="/pass-recov" className="link-accent">
                    ¿Olvidaste tu contraseña?
                  </Link>
                  <p>
                    ¿No tienes una cuenta?{' '}
                    <Link to="/registro" className="link-accent">
                      Regístrate aquí
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

export default Login;
