// src/tests/Admin.access.test.jsx
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Admin from '../pages/Admin.jsx';
import { AuthContext } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

beforeAll(() => {
  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  }
});

function renderWithProviders(ui, { user = null, route = '/' } = {}) {
  const authValue = { user, login: vi.fn(), register: vi.fn(), logout: vi.fn() };
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthContext.Provider value={authValue}>
        <CartProvider>{ui}</CartProvider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

test('bloquea acceso si no eres administrador', () => {
  renderWithProviders(<Admin />, { user: { email: 'x@x.cl', rol: 'Usuario' } });
  expect(screen.getByText(/Acceso restringido/i)).toBeInTheDocument();
});

test('muestra panel y contadores si eres administrador', () => {
  localStorage.setItem('usuarios', JSON.stringify([{ email: 'a@a.cl' }, { email: 'b@b.cl' }]));
  localStorage.setItem('productos', JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }]));
  localStorage.setItem('ordenes', JSON.stringify([{ id: 10 }]));

  renderWithProviders(<Admin />, { user: { email: 'admin@x.cl', rol: 'Administrador' } });

  // Título principal del panel
  expect(screen.getByRole('heading', { name: /Panel de Administración/i })).toBeInTheDocument();

  // Usa level para diferenciar: las tarjetas usan <h5>, las secciones usan <h2>
  const usuariosH5  = screen.getByRole('heading', { name: /Usuarios/i,   level: 5 });
  const productosH5 = screen.getByRole('heading', { name: /Productos/i,  level: 5 });
  const ordenesH5   = screen.getByRole('heading', { name: /Órdenes/i,    level: 5 });

  const usuariosCard  = usuariosH5.closest('.card-body')  ?? usuariosH5.parentElement;
  const productosCard = productosH5.closest('.card-body') ?? productosH5.parentElement;
  const ordenesCard   = ordenesH5.closest('.card-body')   ?? ordenesH5.parentElement;

  expect(within(usuariosCard).getByText('2')).toBeInTheDocument();
  expect(within(productosCard).getByText('3')).toBeInTheDocument();
  expect(within(ordenesCard).getByText('1')).toBeInTheDocument();
});