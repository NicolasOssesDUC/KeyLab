import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Switches from "../pages/Switches";
import { productos } from "../data/productos";

// Mock de ProductGrid para Vitest
vi.mock("../components/ProductGrid", () => {
  return {
    default: ({ productos }) => (
      <div data-testid="product-grid">
        {productos.map((p) => (
          <div key={p.id}>{p.nombre}</div>
        ))}
      </div>
    ),
  };
});

describe("Página Switches", () => {
  test("muestra el título correctamente", () => {
    render(<Switches />);
    expect(
      screen.getByRole("heading", { name: /Switches/i })
    ).toBeInTheDocument();
  });

  test("muestra mensaje si no hay switches disponibles", () => {
    // Guardamos copia original
    const copiaOriginal = [...productos];
    productos.length = 0;

    render(<Switches />);
    expect(
      screen.getByText(/No hay switches disponibles/i)
    ).toBeInTheDocument();

    // Restauramos
    productos.push(...copiaOriginal);
  });

  test("muestra el componente ProductGrid si hay switches", () => {
    render(<Switches />);
    const switches = productos.filter((p) => p.categoria === "Switches");

    if (switches.length > 0) {
      expect(screen.getByTestId("product-grid")).toBeInTheDocument();
      switches.forEach((sw) => {
        expect(screen.getByText(sw.nombre)).toBeInTheDocument();
      });
    }
  });
});
