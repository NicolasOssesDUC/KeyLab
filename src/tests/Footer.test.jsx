// src/tests/Footer.test.jsx
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  test('se renderiza sin errores', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo'); // 'footer' es un landmark con role="contentinfo"
    expect(footerElement).toBeInTheDocument();
  });

  test('muestra el texto de copyright correctamente', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/© 2025 KeyLab\. Todos los derechos reservados\./i);
    expect(copyrightText).toBeInTheDocument();
  });
});
