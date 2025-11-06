import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const SESSION_KEY = 'authUser';

export function AuthProvider({ children }) {
  // Leer sesión desde sessionStorage
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
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
    } catch {}
  }, [user]);

// login por email + password → devuelve el usuario o null
const login = (email, password) => {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const found = usuarios.find(
    (u) =>
      String(u.email).trim() === String(email).trim() &&
      String(u.password) === String(password)
  );
  if (!found) return null;
  setUser(found);             // esto ya guarda en sessionStorage por el useEffect
  return found;               // ⬅️ devolvemos el usuario
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
  return usuario; // ⬅️ devolvemos el usuario
};

  // Cerrar sesión
  const logout = () => {
    setUser(null);
    // opcional: limpiar y recargar para que el navbar cambie de inmediato
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}