import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../ui/Button';

describe('Button Component', () => {
  // Renderizado básico
  it('renderiza correctamente con texto', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  // Variantes
  it('aplica la variante primary por defecto', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-primary');
  });

  it('aplica diferentes variantes correctamente', () => {
    const { rerender } = render(<Button variant="success">Success</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-success');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-danger');

    rerender(<Button variant="warning">Warning</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-warning');
  });

  // Outline
  it('aplica outline cuando se especifica', () => {
    render(<Button variant="primary" outline>Outline</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-outline-primary');
    expect(button).not.toHaveClass('btn-primary');
  });

  // Tamaños
  it('aplica diferentes tamaños', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-sm');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-lg');
  });

  // Block
  it('aplica clase block cuando se especifica', () => {
    render(<Button block>Block Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-100');
  });

  // Estado deshabilitado
  it('puede estar deshabilitado', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  // Interacción
  it('maneja eventos onClick', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('no ejecuta onClick cuando está deshabilitado', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Props adicionales
  it('aplica type submit cuando se especifica', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('aplica clases personalizadas', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('btn');
  });
});
