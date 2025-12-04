import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/usuarios";

// Helper para obtener token (Igual que en productsApi)
const getAuthConfig = () => {
    const userStr = sessionStorage.getItem("authUser");
    if (!userStr) return {};
    try {
        const user = JSON.parse(userStr);
        return { headers: { Authorization: `Bearer ${user.token}` } };
    } catch (e) { return {}; }
};

export async function getUsers() {
    try {
        // El backend mapea getAllUsuarios a la raíz /, no a /all
        const response = await axios.get(API_URL, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return [];
    }
}

// --- Funciones Placeholder para no romper AdminUsuarios.jsx ---

export async function addUser(usuario) {
    // TODO: Conectar con endpoint real de crear usuario (si existiera)
    console.warn("addUser: Funcionalidad no implementada en backend todavía");
    // Simulamos éxito para no romper la UI
    return usuario;
}

export async function deleteUserByEmail(email) {
    // TODO: Conectar con endpoint real de borrar por email
    console.warn("deleteUserByEmail: Funcionalidad no implementada en backend todavía", email);
}
