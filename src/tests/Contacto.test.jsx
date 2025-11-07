import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Contacto from "../pages/Contacto";
import Swal from "sweetalert2";

vi.mock("sweetalert2", () => ({
  default: { fire: vi.fn() },
}));

describe("Contacto Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza correctamente los campos y el botón", () => {
    render(<Contacto />);
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("muestra error si el nombre tiene menos de 3 caracteres", () => {
    render(<Contacto />);
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Jo" } });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: "Mensaje válido" } });
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "error",
        title: "Error",
        text: "El nombre debe tener al menos 3 caracteres",
      })
    );
  });

  it("muestra error si el mensaje tiene menos de 10 caracteres", () => {
    render(<Contacto />);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Carlos" },
    });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "test@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Mensaje"), {
      target: { value: "Hola" },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "error",
        text: "Tu mensaje es demasiado corto",
      })
    );
  });

  it("muestra mensaje de éxito si el formulario es válido", () => {
    render(<Contacto />);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Carlos" },
    });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "test@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Mensaje"), {
      target: { value: "Este es un mensaje de prueba válido" },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: "success",
        title: "Mensaje enviado",
        text: "Nos pondremos en contacto contigo pronto.",
      })
    );
  });
});
