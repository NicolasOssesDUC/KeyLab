import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Keycaps from "../pages/Keycaps";
import { productos } from "../data/productos";
import { CartProvider } from "../context/CartContext"; // 👈 Importante para el contexto del carrito

// ✅ Mock del componente ProductGrid
vi.mock("../components/ProductGrid", () => ({
  default: ({ productos }) => (
    <div data-testid="product-grid">
      {productos.map((p) => (
        <div key={p.id}>{p.nombre}</div>
      ))}
    </div>
  ),
}));

// ✅ Helper para renderizar con el CartProvider
const renderWithContext = (ui) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe("Página de Keycaps", () => {
  it("muestra el título correctamente", () => {
    renderWithContext(<Keycaps />);
    expect(screen.getByText("Keycaps")).toBeInTheDocument();
  });

  it("filtra correctamente los productos de categoría 'Keycaps'", () => {
    const keycaps = productos.filter((p) => p.categoria === "Keycaps");
    renderWithContext(<Keycaps />);
    const grid = screen.queryByTestId("product-grid");

    if (keycaps.length === 0) {
      // 👇 texto corregido, antes decía "No hay cases disponibles"
      expect(
        screen.getByText("No hay keycaps disponibles.")
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
    renderWithContext(<Keycaps />);
    const otrosProductos = productos.filter(
      (p) => p.categoria !== "Keycaps"
    );
    otrosProductos.forEach((p) => {
      expect(screen.queryByText(p.nombre)).not.toBeInTheDocument();
    });
  });
});
