import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/usuarios";

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
        const response = await axios.get(API_URL, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return [];
    }
}

export async function addUser(usuario) {
    // Llama a POST /api/v1/usuarios
    // El backend espera UsuarioRegisterDTO (con campo 'rol')
    try {
        const response = await axios.post(API_URL, usuario, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error creando usuario:", error);
        throw error;
    }
}

export async function deleteUserById(id) {
    // Llama a DELETE /api/v1/usuarios/{id}
    try {
        await axios.delete(`${API_URL}/${id}`, getAuthConfig());
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        throw error;
    }
}