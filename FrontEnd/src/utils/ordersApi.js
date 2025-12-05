<<<<<<< HEAD

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
=======
import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/ordenes";

const getAuthConfig = () => {
    const userStr = sessionStorage.getItem("authUser");
    if (!userStr) return {};
    try {
        const user = JSON.parse(userStr);
        return { headers: { Authorization: `Bearer ${user.token}` } };
    } catch (e) { return {}; }
};

// Obtener todas las órdenes (Admin)
export async function getOrders() {
    try {
        const response = await axios.get(API_URL, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error obteniendo órdenes:", error);
        return [];
    }
}
>>>>>>> 7c65af4c5d04dfaf9d7969ab5d99cd04ef986589
