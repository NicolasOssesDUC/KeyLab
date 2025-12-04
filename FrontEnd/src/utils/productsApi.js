import axios from 'axios';

// url base apra api de productos
const API_URL = "http://localhost:8080/api/v1/productos";

//obtener todos los productos(publico)
export async function getProducts() {
    try {
        const response = await axios.get(API_URL);
        return response.data; // devuelve la lista del ProductosResponseDTO
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return []; // array vacio pa no romper la ui
    }

}
//productos activos (publico)
export async function getActiveProducts() { 
    try {
        const response = await axios.get(`${API_URL}/activos`);
        return response.data; // devuelve la lista del ProductosResponseDTO
    } catch (error) {
        console.error("Error al obtener los productos activos:", error);
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

// Helper para el token
const getAuthConfig = () => {
    const userStr = sessionStorage.getItem("authUser");
    if (!userStr) {
        console.warn("No hay usuario logueado, la petición fallará.");
        return {};
    }
    
    try {
        const user = JSON.parse(userStr);
        //'user.token' debe coincidir con lo que devuelve AuthenticationResponse
        return { 
            headers: { Authorization: `Bearer ${user.token}` } 
        };
    } catch (e) {
        console.error("Error leyendo sesión:", e);
        return {};
    }
};

export async function addProduct(producto) {
    // producto objeto JSON con { nombre, precio, stock... }
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