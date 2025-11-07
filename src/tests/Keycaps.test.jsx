import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Keycaps from "../pages/Keycaps";
import { productos } from "../data/productos";
import ProductGrid from "../components/ProductGrid";

// Mock de ProductGrid
vi.mock("../components/ProductGrid", () => ({
  default: ({ productos }) => (
    <div data-testid="product-grid">
      {productos.map((p) => (
        <div key={p.id}>{p.nombre}</div>
      ))}
    </div>
  ),
}));

describe("Página de Keycaps", () => {
  it("muestra el título correctamente", () => {
    render(<Keycaps />);
    expect(screen.getByText("Keycaps")).toBeInTheDocument();
  });

  it("filtra correctamente los productos de categoría 'Keycaps'", () => {
    const keycaps = productos.filter((p) => p.categoria === "Keycaps");
    render(<Keycaps />);
    const grid = screen.queryByTestId("product-grid");

    if (keycaps.length === 0) {
      expect(
        screen.getByText("No hay cases disponibles.")
      ).toBeInTheDocument();
      expect(grid).not.toBeInTheDocument();
    } else {
      expect(grid).toBeInTheDocument();
      keycaps.forEach((p) => {
        expect(screen.getByText(p.nombre)).toBeInTheDocument();
      });
    }
  });

  it("no muestra productos que no sean de la categoría 'Keycaps'", () => {
    render(<Keycaps />);
    const otrosProductos = productos.filter(
      (p) => p.categoria !== "Keycaps"
    );
    otrosProductos.forEach((p) => {
      expect(screen.queryByText(p.nombre)).not.toBeInTheDocument();
    });
  });
});
