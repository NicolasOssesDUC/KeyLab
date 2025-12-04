# Código Fuente: productsApi.js (Conectado al Backend)

**Ubicación:** `FrontEnd/src/utils/productsApi.js`

Este archivo reemplaza la lógica de LocalStorage por llamadas reales a tu API REST usando Axios.
Incluye manejo automático del Token JWT para las operaciones de escritura (Crear/Editar/Borrar).

Copia y reemplaza todo el contenido del archivo con esto:

```javascript
import axios from 'axios';

// URL Base de tu Backend
const API_URL = "http://localhost:8080/api/v1/productos";

// --- FUNCIONES PÚBLICAS ---

// Obtener todos los productos (Para Admin)
export async function getProducts() {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Devuelve array de ProductoResponseDTO
    } catch (error) {
        console.error("Error conectando con Backend (getProducts):", error);
        return [];
    }
}

// Obtener solo productos activos (Para Clientes/Catálogo)
// Nota: Asegúrate de que tu backend tenga este endpoint, si no, usa getProducts()
export async function getActiveProducts() {
    try {
        const response = await axios.get(`${API_URL}/activos`);
        return response.data;
    } catch (error) {
        console.error("Error conectando con Backend (getActiveProducts):", error);
        return [];
    }
}

// Obtener un producto por ID
export async function getProductById(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo producto ${id}:`, error);
        return null;
    }
}

// --- FUNCIONES PROTEGIDAS (ADMIN) ---

// Helper para obtener el token
const getAuthConfig = () => {
    const userStr = sessionStorage.getItem("authUser");
    if (!userStr) {
        console.warn("No hay usuario logueado, la petición fallará.");
        return {};
    }
    
    try {
        const user = JSON.parse(userStr);
        // Importante: 'user.token' debe coincidir con lo que devuelve tu AuthenticationResponse
        return { 
            headers: { Authorization: `Bearer ${user.token}` } 
        };
    } catch (e) {
        console.error("Error leyendo sesión:", e);
        return {};
    }
};

export async function addProduct(producto) {
    // producto debe ser un objeto JSON con { nombre, precio, stock... }
    const response = await axios.post(API_URL, producto, getAuthConfig());
    return response.data;
}

export async function updateProduct(id, producto) {
    const response = await axios.put(`${API_URL}/${id}`, producto, getAuthConfig());
    return response.data;
}

export async function deleteProduct(id) {
    await axios.delete(`${API_URL}/${id}`, getAuthConfig());
}
```
