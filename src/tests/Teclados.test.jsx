import { render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

// 🧩 Import original del componente (sin await)
import Teclados from "../pages/Teclados.jsx";

// Mock de ProductGrid para aislar el test
vi.mock("../components/ProductGrid", () => ({
  default: ({ productos }) => (
    <div data-testid="mock-grid">
      {productos.map((p) => (
        <div key={p.id}>{p.nombre}</div>
      ))}
    </div>
  ),
}));

describe("Teclados Component", () => {
  afterEach(() => {
    vi.resetModules();
  });

  it("renderiza el título principal", () => {
    render(<Teclados />);
    expect(
      screen.getByRole("heading", { name: /teclados/i })
    ).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay teclados disponibles", async () => {
    // Mock temporal del archivo productos
    vi.doMock("../data/productos", () => ({ productos: [] }));
    const { default: TecladosSinProductos } = await import(
      "../pages/Teclados.jsx"
    );
    render(<TecladosSinProductos />);
    expect(
      screen.getByText(/no hay teclados disponibles/i)
    ).toBeInTheDocument();
  });

  it("renderiza ProductGrid cuando hay teclados disponibles", async () => {
    vi.doMock("../data/productos", () => ({
      productos: [
        { id: 1, nombre: "Teclado mecánico RGB", categoria: "Teclados" },
      ],
    }));
    const { default: TecladosConProductos } = await import(
      "../pages/Teclados.jsx"
    );
    render(<TecladosConProductos />);
    expect(screen.getByText(/teclado mecánico rgb/i)).toBeInTheDocument();
  });
});
