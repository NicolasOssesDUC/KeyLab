import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Navbar from '../components/Navbar';

// Mock de useAuth
const mockLogout = vi.fn();
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser,
    logout: mockLogout
  }),
}));

// Mock de useCart
vi.mock('../context/CartContext', () => ({
  useCart: () => ({
    getTotalItems: () => mockCartCount
  }),
}));

// Helper para renderizar con router
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

let mockUser = null;
let mockCartCount = 0;

describe('Navbar Component', () => {
  beforeEach(() => {
    mockLogout.mockClear();
    mockUser = null;
    mockCartCount = 0;
  });

  test('muestra links principales', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
    expect(screen.getByText(/Sobre Nosotros/i)).toBeInTheDocument();
    expect(screen.getByText(/Ubicación/i)).toBeInTheDocument();
  });

  test('muestra login si no hay usuario', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('muestra saludo y logout si hay usuario', () => {
    mockUser = { nombre: 'Royel', rol: 'Cliente' };
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/Hola, Royel/i)).toBeInTheDocument();
    const logoutBtn = screen.getByText(/Cerrar sesión/i);
    fireEvent.click(logoutBtn);
    expect(mockLogout).toHaveBeenCalled();
  });

  test('muestra link a admin si usuario es administrador', () => {
    mockUser = { nombre: 'Admin', rol: 'Administrador' };
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/Panel de control/i)).toBeInTheDocument();
  });

  test('muestra el contador del carrito', () => {
    mockCartCount = 5;
    renderWithRouter(<Navbar />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
