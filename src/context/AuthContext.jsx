// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  // Mantener localStorage en sincronía con el estado
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // login por email + password -> devuelve true si encontró usuario
  const login = (email, password) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const found = usuarios.find(
      (u) =>
        String(u.email).trim() === String(email).trim() &&
        String(u.password) === String(password)
    );
    if (!found) return false;
    setUser(found);
    return true;
  };

  // register: recibe un objeto usuario { run, nombre, apellidos, email, password, rol }
  // devuelve true si registró, false si el email ya existe
  const register = (usuario) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const exists = usuarios.some(
      (u) => String(u.email).trim() === String(usuario.email).trim()
    );
    if (exists) return false;
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    setUser(usuario); // iniciar sesión automático tras registrar
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useAuth() {
  return useContext(AuthContext);
}
