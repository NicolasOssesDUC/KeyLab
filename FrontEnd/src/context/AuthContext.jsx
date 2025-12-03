import { createContext, useContext, useState, useEffect } from 'react';
import { loginRequest } from '../utils/authApi'; // 👈 IMPORTANTE: habla con el backend

// Contexto principal
const AuthContext = createContext(null);
export { AuthContext };

const SESSION_KEY = 'authUser';

export function AuthProvider({ children }) {
  // Leer sesión desde sessionStorage
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error('Error leyendo sesión:', error);
      return null;
    }
  });

  // Mantener sessionStorage sincronizado con el estado
  useEffect(() => {
    try {
      if (user) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
    } catch (error) {
      console.error('Error guardando sesión:', error);
    }
  }, [user]);

  // 🔐 Login REAL por email + password → llama al backend y devuelve los datos
  const login = async (email, password) => {
    // Llama a /api/auth/authenticate
    const data = await loginRequest(email, password);

    // data debería ser algo como { token, email, rol, ... }
    setUser(data); // se guarda también en sessionStorage por el useEffect

    return data;   // 👈 Login.jsx usa esto para decidir a dónde redirigir
  };

  // (por ahora) Registro de nuevo usuario sigue usando localStorage
  // Luego lo podemos cambiar para que también use el backend (/api/auth/register)
  const register = (usuario) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const exists = usuarios.some(
      (u) => String(u.email).trim() === String(usuario.email).trim()
    );
    if (exists) return null;
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    setUser(usuario);
    return usuario;
  };

  // Cerrar sesión
  const logout = () => {
    setUser(null);
    window.location.reload(); // opcional, refresca UI
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* eslint-disable-next-line */
export function useAuth() {
  return useContext(AuthContext);
}