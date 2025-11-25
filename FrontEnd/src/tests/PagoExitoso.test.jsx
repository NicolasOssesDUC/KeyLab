// src/tests/PagoExitoso.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PagoExitoso from "../pages/PagoExitoso";

// Mock de react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({
      state: {
        numeroOrden: 12345,
        total: 250000,
        email: "test@email.com",
        productos: "Teclado Redragon",
      },
    }),
  };
});

describe("PagoExitoso Component", () => {
  it("muestra el mensaje de pago exitoso", () => {
    render(
      <MemoryRouter>
        <PagoExitoso />
      </MemoryRouter>
    );

    expect(screen.getByText("¡Pago Exitoso!")).toBeInTheDocument();
    expect(screen.getByText(/Tu compra ha sido procesada correctamente/i)).toBeInTheDocument();
  });

  it("muestra los detalles de la orden", () => {
    render(
      <MemoryRouter>
        <PagoExitoso />
      </MemoryRouter>
    );

    expect(screen.getByText("#12345")).toBeInTheDocument();
    expect(screen.getByText("$250.000")).toBeInTheDocument();
    expect(screen.getByText("Teclado Redragon")).toBeInTheDocument();
    expect(screen.getByText("test@email.com")).toBeInTheDocument();
  });

  it("renderiza los botones de acción", () => {
    render(
      <MemoryRouter>
        <PagoExitoso />
      </MemoryRouter>
    );

    expect(screen.getByText("Volver al Inicio")).toBeInTheDocument();
    expect(screen.getByText("Seguir Comprando")).toBeInTheDocument();
  });
});
