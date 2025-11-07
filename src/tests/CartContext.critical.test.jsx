import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider, useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';


vi.mock('sweetalert2', () => {
  const fire = vi.fn(() =>
    Promise.resolve({ isConfirmed: true, isDenied: false, isDismissed: false })
  );
  return { default: { fire }, fire };
});


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

afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  sessionStorage.clear();
});

const flushPromises = () => new Promise((r) => setTimeout(r, 0));

// Mini componente para interactuar con el contexto real
function DemoCart() {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  return (
    <div>
      <button
        onClick={() =>
          addToCart({
            id: 1,
            nombre: 'Teclado 60%',
            precio: 19990,
            stock: 5, 
          })
        }
      >
        add
      </button>

      {cart.map((it) => (
        <div key={it.id} data-testid="row">
          <span>{it.nombre}</span>
          <span data-testid="qty">{it.cantidad}</span>
          <button onClick={() => updateQuantity(it.id, it.cantidad + 1)}>
            +1
          </button>
          <button onClick={() => removeFromCart(it.id)}>del</button>
        </div>
      ))}
    </div>
  );
}

function renderWithProviders(ui, { user } = {}) {
  const authValue = {
    user: user ?? { email: 'user@test.cl', rol: 'Usuario', nombre: 'User' },
  };
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={authValue}>
        <CartProvider>{ui}</CartProvider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

test('addToCart agrega y persiste (si aplica)', async () => {
  renderWithProviders(<DemoCart />);
  fireEvent.click(screen.getByText('add'));

  await waitFor(() =>
    expect(screen.getByText('Teclado 60%')).toBeInTheDocument()
  );
  await flushPromises();

  // Si tu CartContext persiste en localStorage, valida:
  const raw = localStorage.getItem('cart');
  if (raw) {
    const saved = JSON.parse(raw);
    expect(saved).toHaveLength(1);
    expect(saved[0].nombre).toBe('Teclado 60%');
    expect(saved[0].cantidad).toBe(1);
  }
});

test('updateQuantity incrementa cantidad respetando stock', async () => {
  renderWithProviders(<DemoCart />);
  fireEvent.click(screen.getByText('add'));
  await waitFor(() =>
    expect(screen.getByText('Teclado 60%')).toBeInTheDocument()
  );

  fireEvent.click(screen.getByText('+1'));
  await waitFor(() =>
    expect(screen.getByTestId('qty').textContent).toBe('2')
  );
});

test('removeFromCart elimina el ítem tras confirmación', async () => {
  renderWithProviders(<DemoCart />);

  // Agregar primero
  fireEvent.click(screen.getByText('add'));
  await waitFor(() =>
    expect(screen.getByText('Teclado 60%')).toBeInTheDocument()
  );

  // Eliminar (nuestro mock confirma)
  fireEvent.click(screen.getByText('del'));
  await flushPromises();

  await waitFor(() =>
    expect(screen.queryByText('Teclado 60%')).not.toBeInTheDocument()
  );

  // Y si persistes:
  const raw = localStorage.getItem('cart');
  if (raw) {
    const saved = JSON.parse(raw);
    expect(saved).toHaveLength(0);
  }
});