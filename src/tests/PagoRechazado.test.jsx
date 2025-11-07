// src/tests/PagoRechazado.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PagoRechazado from "../pages/PagoRechazado";

// Mock de react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({
      state: {
        motivo: "Fondos insuficientes",
        total: 150000,
        numeroTarjeta: "1234",
      },
    }),
  };
});

describe("PagoRechazado Component", () => {
  it("muestra el mensaje de pago rechazado", () => {
    render(
      <MemoryRouter>
        <PagoRechazado />
      </MemoryRouter>
    );

    expect(screen.getByText("Pago Rechazado")).toBeInTheDocument();
    expect(screen.getByText(/No se pudo procesar tu pago/i)).toBeInTheDocument();
  });

  it("muestra los detalles del rechazo", () => {
    render(
      <MemoryRouter>
        <PagoRechazado />
      </MemoryRouter>
    );

    expect(screen.getByText("Fondos insuficientes")).toBeInTheDocument();
    expect(screen.getByText("$150.000")).toBeInTheDocument();
    expect(screen.getByText("**** 1234")).toBeInTheDocument();
    expect(screen.getByText("Rechazado")).toBeInTheDocument();
  });

  it("renderiza los botones de acción", () => {
    render(
      <MemoryRouter>
        <PagoRechazado />
      </MemoryRouter>
    );

    expect(screen.getByText("🔄 Intentar Nuevamente")).toBeInTheDocument();
    expect(screen.getByText("← Volver al Carrito")).toBeInTheDocument();
    expect(screen.getByText("Cancelar Compra")).toBeInTheDocument();
  });
});
