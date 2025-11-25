import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardBody, CardTitle, CardText, CardFooter, CardImg } from '../ui/Card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renderiza correctamente con children', () => {
      render(<Card>Card Content</Card>);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('aplica clase shadow cuando se especifica', () => {
      const { container } = render(<Card shadow>Content</Card>);
      expect(container.firstChild).toHaveClass('shadow-sm');
    });

    it('aplica clases personalizadas', () => {
      const { container } = render(<Card className="custom-card">Content</Card>);
      expect(container.firstChild).toHaveClass('card');
      expect(container.firstChild).toHaveClass('custom-card');
    });
  });

  describe('CardHeader', () => {
    it('renderiza correctamente', () => {
      render(<CardHeader>Header Content</CardHeader>);
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('aplica la clase card-header', () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      expect(container.firstChild).toHaveClass('card-header');
    });
  });

  describe('CardBody', () => {
    it('renderiza correctamente', () => {
      render(<CardBody>Body Content</CardBody>);
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });

    it('aplica la clase card-body', () => {
      const { container } = render(<CardBody>Body</CardBody>);
      expect(container.firstChild).toHaveClass('card-body');
    });
  });

  describe('CardTitle', () => {
    it('renderiza como h5 por defecto', () => {
      render(<CardTitle>Title</CardTitle>);
      const title = screen.getByText('Title');
      expect(title.tagName).toBe('H5');
      expect(title).toHaveClass('card-title');
    });

    it('renderiza con elemento personalizado', () => {
      render(<CardTitle as="h3">Custom Title</CardTitle>);
      const title = screen.getByText('Custom Title');
      expect(title.tagName).toBe('H3');
    });
  });

  describe('CardText', () => {
    it('renderiza como párrafo', () => {
      render(<CardText>Text content</CardText>);
      const text = screen.getByText('Text content');
      expect(text.tagName).toBe('P');
      expect(text).toHaveClass('card-text');
    });
  });

  describe('CardFooter', () => {
    it('renderiza correctamente', () => {
      render(<CardFooter>Footer Content</CardFooter>);
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('aplica la clase card-footer', () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);
      expect(container.firstChild).toHaveClass('card-footer');
    });
  });

  describe('CardImg', () => {
    it('renderiza imagen correctamente', () => {
      render(<CardImg src="/test.jpg" alt="Test image" />);
      const img = screen.getByAltText('Test image');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/test.jpg');
    });

    it('aplica variante top por defecto', () => {
      render(<CardImg src="/test.jpg" />);
      const img = screen.getByRole('img', { hidden: true }) || screen.getByRole('presentation');
      expect(img).toHaveClass('card-img-top');
    });

    it('aplica diferentes variantes', () => {
      const { rerender } = render(<CardImg src="/test.jpg" variant="bottom" />);
      expect(screen.getByRole('img')).toHaveClass('card-img-bottom');

      rerender(<CardImg src="/test.jpg" variant="overlay" />);
      expect(screen.getByRole('img')).toHaveClass('card-img-overlay');
    });
  });

  describe('Card Integration', () => {
    it('renderiza una card completa correctamente', () => {
      render(
        <Card shadow>
          <CardHeader>Header</CardHeader>
          <CardBody>
            <CardTitle>Title</CardTitle>
            <CardText>Description</CardText>
          </CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });
});
