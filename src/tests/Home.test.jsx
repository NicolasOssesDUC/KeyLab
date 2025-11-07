// src/tests/Home.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home'; // Ajusta la ruta según tu proyecto

describe('Home Component', () => {
  test('se renderiza el título y subtítulo correctamente', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Bienvenido a KeyLab')).toBeInTheDocument();
    expect(screen.getByText('Todo para tu próximo teclado')).toBeInTheDocument();
  });

  test('se renderiza la primera imagen del carousel', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const firstImage = screen.getByAltText('Teclado 1');
    expect(firstImage).toBeInTheDocument();
    expect(firstImage).toHaveAttribute('src', '/assets/img/TecladoRedragon1.png');
  });

  test('existen los botones de navegación del carousel', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const prevButton = screen.getByText('←');
    const nextButton = screen.getByText('→');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Opcional: probar que al clickear cambian la imagen
    fireEvent.click(nextButton);
    const secondImage = screen.getByAltText('Teclado 2');
    expect(secondImage).toBeInTheDocument();
  });
});
