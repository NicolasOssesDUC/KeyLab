import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Teclados from "../pages/Teclados";
import { productos } from "../data/productos";
import ProductGrid from "../components/ProductGrid";
import { CartProvider } from "../context/CartContext";

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

describe("Teclados Component", () => {
  it("renderiza el título principal", () => {
    renderWithProvider(<Teclados />);
    expect(screen.getByText("Teclados")).toBeInTheDocument();
  });

  it("filtra correctamente los productos de categoría 'Teclados'", () => {
    const teclados = productos.filter((p) => p.categoria === "Teclados");
    renderWithProvider(<Teclados />);
    const grid = screen.queryByTestId("product-grid");

    if (teclados.length === 0) {
      expect(screen.getByText("No hay teclados disponibles.")).toBeInTheDocument();
      expect(grid).not.toBeInTheDocument();
    } else {
      expect(grid).toBeInTheDocument();
      teclados.forEach((p) => {
        expect(screen.getByText(p.nombre)).toBeInTheDocument();
      });
    }
  });

  it("no muestra productos que no sean de la categoría 'Teclados'", () => {
    renderWithProvider(<Teclados />);
    const otrosProductos = productos.filter((p) => p.categoria !== "Teclados");
    otrosProductos.forEach((p) => {
      expect(screen.queryByText(p.nombre)).not.toBeInTheDocument();
    });
  });
});
