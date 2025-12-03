// src/utils/authApi.js

// Puedes ajustar esta URL si ya tienes una variable de entorno o config central
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Llama al endpoint de autenticación del backend
export async function loginRequest(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    // Aquí lanzamos error para que AuthContext lo capture en el try/catch
    throw new Error("Credenciales inválidas o error en el servidor");
  }

  // Debería devolver: { token, email, rol, ... }
  return await response.json();
}