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
