const DEFAULT_ADMIN_USER = {
  run: '1-9',
  nombre: 'Admin',
  apellidos: 'KeyLab',
  email: 'admin@keylab.cl',
  password: 'admin',
  rol: 'Administrador',
};

export const ALLOWED_EMAIL_DOMAINS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com', 'keylab.cl'];

export function seedAdminUser() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const rawUsuarios = window.localStorage.getItem('usuarios');
    const parsedUsuarios = rawUsuarios ? JSON.parse(rawUsuarios) : [];
    const usuarios = Array.isArray(parsedUsuarios) ? parsedUsuarios : [];

    const hasAnyUser = usuarios.length > 0;
    if (hasAnyUser) {
      return;
    }

    window.localStorage.setItem('usuarios', JSON.stringify([DEFAULT_ADMIN_USER]));
  } catch {
    // Si localStorage devuelve un valor inválido, reiniciamos con el admin por defecto.
    window.localStorage.setItem('usuarios', JSON.stringify([DEFAULT_ADMIN_USER]));
  }
}
