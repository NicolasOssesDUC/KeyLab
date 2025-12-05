
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

/**
 * Llama al endpoint de checkout del backend:
 * POST /api/v1/ordenes/checkout/{usuarioId}
 *
 * Devuelve la OrdenResponseDTO (JSON) o lanza un error si algo sale mal.
 */
export async function checkoutOrden(usuarioId, token) {
  if (!usuarioId) {
    throw new Error('checkoutOrden requiere un usuarioId válido');
  }

  const headers = {
    'Content-Type': 'application/json',
  };
  const verificarTokenExpirado = (token) => {
  try {
    const partes = token.split('.');
    if (partes.length === 3) {
      const payload = JSON.parse(atob(partes[1]));
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return true; // Token expirado
      }
    }
  } catch (e) {
    console.warn('No se pudo verificar token:', e);
  }
  return false;
};

// Verificar token antes de continuar
if (token && verificarTokenExpirado(token)) {
  throw new Error('Token expirado. Por favor, inicia sesión nuevamente.');
}

  // Si más adelante usan JWT, acá se agrega:
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/ordenes/checkout/${usuarioId}`, {
    method: 'POST',
    headers,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');

    throw new Error(`Error en checkout (${response.status}): ${text}`);
  }

  return response.json();
}