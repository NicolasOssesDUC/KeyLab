// src/tests/Nosotros.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Nosotros from "../pages/Nosotros";

describe("Nosotros Component", () => {
  it("renderiza el título correctamente", () => {
    render(<Nosotros />);
    expect(screen.getByText("¿Quién es el equipo de KeyLab?")).toBeInTheDocument();
  });

  it("renderiza el párrafo descriptivo", () => {
    render(<Nosotros />);
    expect(
      screen.getByText(
        /En KeyLab somos una familia que es apasionada por los teclados mecánicos/i
      )
    ).toBeInTheDocument();
  });

  it("el contenedor principal tiene la clase 'somos'", () => {
    const { container } = render(<Nosotros />);
    // container.firstChild es el div principal que devuelve el Container
    expect(container.firstChild).toHaveClass("container somos py-5");
  });
});
