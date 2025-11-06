import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, beforeEach, expect } from "vitest";
import Login from "../pages/Login";
import { AuthContext } from "../context/AuthContext";

// 🔹 Mock global de useNavigate antes de las pruebas
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login", () => {
  const mockLogin = vi.fn();

  // 🔹 Limpiar mocks y localStorage antes de cada test
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const renderLogin = () => {
    return render(
      <MemoryRouter>
        <AuthContext.Provider value={{ login: mockLogin }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  it("renderiza correctamente el título", () => {
    renderLogin();
    expect(screen.getByRole("heading", { name: /log in/i })).toBeInTheDocument();
  });

  it("valida que se pueda escribir en los campos", () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
    const passwordInput = screen.getByPlaceholderText(/contraseña/i);

    fireEvent.change(emailInput, { target: { value: "usuario@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });

    expect(emailInput.value).toBe("usuario@gmail.com");
    expect(passwordInput.value).toBe("1234");
  });

  it("muestra error si el correo o la contraseña están vacíos", () => {
    renderLogin();

    const button = screen.getByRole("button", { name: /comencemos/i });
    fireEvent.click(button);

    expect(screen.getByText(/el correo es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/la contraseña es requerida/i)).toBeInTheDocument();
  });

  it("muestra alerta si el login falla", () => {
    mockLogin.mockReturnValueOnce(false);
    window.alert = vi.fn();

    renderLogin();

    const email = screen.getByPlaceholderText(/correo electrónico/i);
    const pass = screen.getByPlaceholderText(/contraseña/i);
    const button = screen.getByRole("button", { name: /comencemos/i });

    fireEvent.change(email, { target: { value: "usuario@gmail.com" } });
    fireEvent.change(pass, { target: { value: "1234" } });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Correo o contraseña incorrectos.");
  });

  it("redirige a /admin si el login es exitoso con rol Administrador", () => {
    mockLogin.mockReturnValueOnce(true);
    localStorage.setItem("usuarioActivo", JSON.stringify({ rol: "Administrador" }));

    renderLogin();

    const email = screen.getByPlaceholderText(/correo electrónico/i);
    const pass = screen.getByPlaceholderText(/contraseña/i);
    const button = screen.getByRole("button", { name: /comencemos/i });

    fireEvent.change(email, { target: { value: "admin@gmail.com" } });
    fireEvent.change(pass, { target: { value: "1234" } });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });
});
