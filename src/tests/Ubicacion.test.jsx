import { render, screen } from "@testing-library/react";
import Ubicacion from "../pages/Ubicacion";

describe("Ubicacion Component", () => {
  it("renderiza correctamente los encabezados y textos", () => {
    render(<Ubicacion />);

    expect(
      screen.getByText(/¿En dónde nos encontramos ubicados\?/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Nos encontramos ubicados en:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Padre Alonso de Ovalle, 8330196 Santiago, Región Metropolitana/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Horario de atención: Lunes a Viernes de 10:00 a 18:00 hrs/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Sábados de 10:00 a 14:00 hrs/i)).toBeInTheDocument();
    expect(screen.getByText(/Domingos cerrado/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Aquí tienes un mapa sobre nuestros locales/i)
    ).toBeInTheDocument();
  });

  it("contiene el iframe del mapa con los atributos correctos", () => {
    render(<Ubicacion />);

    const iframe = screen.getByTitle("Ubicación KeyLab");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src");
    expect(iframe).toHaveAttribute("loading", "lazy");
    expect(iframe).toHaveAttribute("allowFullScreen");
  });
});