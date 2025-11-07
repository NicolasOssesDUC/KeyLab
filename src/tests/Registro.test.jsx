import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Registro from "../pages/Registro";
import { MemoryRouter } from "react-router-dom";

// 🔹 Mock de useAuth
const mockRegister = vi.fn();
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({ register: mockRegister }),
}));

// 🔹 Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 🔹 Mock de dominios permitidos
vi.mock("../utils/auth", () => ({
  ALLOWED_EMAIL_DOMAINS: ["gmail.com", "hotmail.com", "outlook.com"],
}));

describe("Registro Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renderiza correctamente los campos principales", () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/RUN/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Apellidos/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/Contraseña/i)).toHaveLength(2);
  });

  test("muestra errores al intentar enviar vacío", () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    const boton = screen.getByRole("button", { name: /crear cuenta/i });
    fireEvent.click(boton);

    expect(screen.getAllByText(/Campo requerido/i)).toHaveLength(3);
    expect(screen.getByText(/Correo requerido/i)).toBeInTheDocument();
  });

  test("muestra error si el dominio del correo no es válido", () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Correo Electrónico/i);
    fireEvent.change(emailInput, { target: { value: "usuario@dominiofalso.com" } });

    const boton = screen.getByRole("button", { name: /crear cuenta/i });
    fireEvent.click(boton);

    expect(screen.getByText(/Dominio no válido/i)).toBeInTheDocument();
  });

  test("muestra error si las contraseñas no coinciden", () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
        target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar Contraseña"), {
        target: { value: "54321" },
    });

    const boton = screen.getByRole("button", { name: /crear cuenta/i });
    fireEvent.click(boton);

    expect(screen.getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
  });

  test("llama a register y navega al login cuando es exitoso", () => {
    mockRegister.mockReturnValue(true);
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/RUN/i), {
      target: { value: "12345678-9" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: "Royel" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Apellidos/i), {
      target: { value: "Tester" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Correo Electrónico/i), {
      target: { value: "royel@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/^Contraseña$/i), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirmar Contraseña/i), {
      target: { value: "12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(mockRegister).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("muestra alerta si el correo ya está registrado", () => {
    mockRegister.mockReturnValue(false);
    window.alert = vi.fn();

    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/RUN/i), {
      target: { value: "12345678-9" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
      target: { value: "Royel" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Apellidos/i), {
      target: { value: "Tester" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Correo Electrónico/i), {
      target: { value: "royel@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/^Contraseña$/i), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirmar Contraseña/i), {
      target: { value: "12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(window.alert).toHaveBeenCalledWith("El correo ya está registrado.");
  });
});
