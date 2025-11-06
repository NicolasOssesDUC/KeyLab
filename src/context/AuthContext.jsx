import { createContext, useContext, useState, useEffect } from 'react';

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

  // Login por email + password → devuelve el usuario o null
  const login = (email, password) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const found = usuarios.find(
      (u) =>
        String(u.email).trim() === String(email).trim() &&
        String(u.password) === String(password)
    );
    if (!found) return null;
    setUser(found); // ya guarda en sessionStorage por el useEffect
    return found;   // devolvemos el usuario
  };

  // Registro de nuevo usuario
  const register = (usuario) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const exists = usuarios.some(
      (u) => String(u.email).trim() === String(usuario.email).trim()
    );
    if (exists) return null;
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    setUser(usuario);
    return usuario; // devolvemos el usuario
  };

  // Cerrar sesión
  const logout = () => {
    setUser(null);
    window.location.reload(); // opcional para refrescar la UI
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
