import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Switches from "../pages/Switches";
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

describe("Página Switches", () => {
  it("muestra el título correctamente", () => {
    renderWithProvider(<Switches />);
    expect(screen.getByText("Switches")).toBeInTheDocument();
  });

  it("filtra correctamente los productos de categoría 'Switches'", () => {
    const switches = productos.filter((p) => p.categoria === "Switches");
    renderWithProvider(<Switches />);
    const grid = screen.queryByTestId("product-grid");

    if (switches.length === 0) {
      expect(screen.getByText("No hay switches disponibles.")).toBeInTheDocument();
      expect(grid).not.toBeInTheDocument();
    } else {
      expect(grid).toBeInTheDocument();
      switches.forEach((p) => {
        expect(screen.getByText(p.nombre)).toBeInTheDocument();
      });
    }
  });

  it("no muestra productos que no sean de la categoría 'Switches'", () => {
    renderWithProvider(<Switches />);
    const otrosProductos = productos.filter((p) => p.categoria !== "Switches");
    otrosProductos.forEach((p) => {
      expect(screen.queryByText(p.nombre)).not.toBeInTheDocument();
    });
  });
});
