import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Cases from "../pages/Cases";
import { productos } from "../data/productos";
import ProductGrid from "../components/ProductGrid";
import { CartProvider } from "../context/CartContext"; // simulamos el provider

// Mock del componente ProductGrid
vi.mock("../components/ProductGrid", () => ({
  default: ({ productos }) => (
    <div data-testid="product-grid">
      {productos.map((p) => (
        <div key={p.id}>{p.nombre}</div>
      ))}
    </div>
  ),
}));

// Helper para renderizar dentro de CartProvider
const renderWithProvider = (ui) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe("Página de Cases", () => {
  it("muestra el título correctamente", () => {
    renderWithProvider(<Cases />);
    expect(screen.getByText("Cases")).toBeInTheDocument();
  });

  it("filtra correctamente los productos de categoría 'Cases'", () => {
    const cases = productos.filter((p) => p.categoria === "Cases");
    renderWithProvider(<Cases />);
    const grid = screen.queryByTestId("product-grid");

    if (cases.length === 0) {
      expect(screen.getByText("No hay cases disponibles.")).toBeInTheDocument();
      expect(grid).not.toBeInTheDocument();
    } else {
      expect(grid).toBeInTheDocument();
      cases.forEach((p) => {
        expect(screen.getByText(p.nombre)).toBeInTheDocument();
      });
    }
  });

  it("no muestra productos que no sean de la categoría 'Cases'", () => {
    renderWithProvider(<Cases />);
    const otrosProductos = productos.filter((p) => p.categoria !== "Cases");
    otrosProductos.forEach((p) => {
      expect(screen.queryByText(p.nombre)).not.toBeInTheDocument();
    });
  });
});
