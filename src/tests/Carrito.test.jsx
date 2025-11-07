import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import Carrito from "../pages/Carrito";
import { MemoryRouter } from "react-router-dom"; // <- importante

// Mock del context
const mockRemoveFromCart = vi.fn();
const mockUpdateQuantity = vi.fn();
const mockGetTotalPrice = vi.fn();
const mockClearCart = vi.fn();

vi.mock("../context/CartContext", () => ({
  useCart: () => ({
    cart: mockCart,
    removeFromCart: mockRemoveFromCart,
    updateQuantity: mockUpdateQuantity,
    getTotalPrice: mockGetTotalPrice,
    clearCart: mockClearCart,
  }),
}));

let mockCart = [];

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("Carrito Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra mensaje cuando el carrito está vacío", () => {
    mockCart = [];
    renderWithRouter(<Carrito />);
    expect(screen.getByText("🛒 Tu Carrito")).toBeInTheDocument();
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
    expect(screen.getByText("¡Agrega productos para empezar a comprar!")).toBeInTheDocument();
    expect(screen.getByText("Ver Productos")).toBeInTheDocument();
  });

  it("renderiza productos en el carrito y muestra total", () => {
    mockCart = [
        { id: 1, nombre: "Teclado RGB", precio: 50000, cantidad: 2, stock: 5, imagen: "img1.png" },
        { id: 2, nombre: "Switch Azul", precio: 3000, cantidad: 3, stock: 10, imagen: "img2.png" }
    ];
    mockGetTotalPrice.mockReturnValue(106000);
    renderWithRouter(<Carrito />);

    expect(screen.getByText("Teclado RGB")).toBeInTheDocument();
    expect(screen.getByText("Switch Azul")).toBeInTheDocument();

    // Arreglo del fallo
    const totalElements = screen.getAllByText("$106.000");
    expect(totalElements[0]).toBeInTheDocument(); // Total de la tarjeta de resumen
 });


  it("llama a updateQuantity al hacer click en + y -", () => {
    mockCart = [
      { id: 1, nombre: "Teclado RGB", precio: 50000, cantidad: 2, stock: 5, imagen: "img1.png" }
    ];
    mockGetTotalPrice.mockReturnValue(100000);
    renderWithRouter(<Carrito />);
    
    const btnSumar = screen.getByText("+");
    const btnRestar = screen.getByText("−");

    fireEvent.click(btnSumar);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);

    fireEvent.click(btnRestar);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it("llama a removeFromCart al eliminar un producto", () => {
    mockCart = [
      { id: 1, nombre: "Teclado RGB", precio: 50000, cantidad: 2, stock: 5, imagen: "img1.png" }
    ];
    renderWithRouter(<Carrito />);
    const btnEliminar = screen.getByText("🗑️ Eliminar");
    fireEvent.click(btnEliminar);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it("abre modal y llama a clearCart al vaciar todo", () => {
    mockCart = [
      { id: 1, nombre: "Teclado RGB", precio: 50000, cantidad: 2, stock: 5, imagen: "img1.png" }
    ];
    renderWithRouter(<Carrito />);
    
    const btnVaciar = screen.getByText("🗑️ Vaciar Carrito");
    fireEvent.click(btnVaciar);

    expect(screen.getByText("¿Vaciar Carrito?")).toBeInTheDocument();

    const btnConfirmar = screen.getByText("Sí, Vaciar Carrito");
    fireEvent.click(btnConfirmar);
    expect(mockClearCart).toHaveBeenCalled();
  });
});
