import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '../ui/Modal';

describe('Modal Components', () => {
  // Limpiar DOM antes de cada prueba
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Modal', () => {
    // Visibilidad
    it('no renderiza cuando show es false', () => {
      render(
        <Modal show={false} onHide={vi.fn()}>
          <ModalBody>Content</ModalBody>
        </Modal>
      );
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('renderiza cuando show es true', () => {
      render(
        <Modal show={true} onHide={vi.fn()}>
          <ModalBody>Modal Content</ModalBody>
        </Modal>
      );
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    // Backdrop
    it('renderiza backdrop por defecto', () => {
      render(
        <Modal show={true} onHide={vi.fn()}>
          <ModalBody>Content</ModalBody>
        </Modal>
      );
      const backdrop = document.querySelector('.modal-backdrop');
      expect(backdrop).toBeInTheDocument();
    });

    // Click en backdrop cierra modal
    it('llama onHide cuando se hace clic en el backdrop', () => {
      const handleHide = vi.fn();
      render(
        <Modal show={true} onHide={handleHide}>
          <ModalBody>Content</ModalBody>
        </Modal>
      );
      
      const modal = document.querySelector('.modal');
      fireEvent.click(modal);
      expect(handleHide).toHaveBeenCalledTimes(1);
    });

    // Tecla ESC
    it('llama onHide cuando se presiona ESC', () => {
      const handleHide = vi.fn();
      render(
        <Modal show={true} onHide={handleHide} keyboard={true}>
          <ModalBody>Content</ModalBody>
        </Modal>
      );
      
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleHide).toHaveBeenCalledTimes(1);
    });

    it('no cierra con ESC cuando keyboard es false', () => {
      const handleHide = vi.fn();
      render(
        <Modal show={true} onHide={handleHide} keyboard={false}>
          <ModalBody>Content</ModalBody>
        </Modal>
      );
      
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleHide).not.toHaveBeenCalled();
    });

    // Tamaños
    it('aplica tamaño correctamente', () => {
      render(
        <Modal show={true} onHide={vi.fn()} size="lg">
          <ModalBody>Content</ModalBody>
        </Modal>
      );
      
      const dialog = document.querySelector('.modal-dialog');
      expect(dialog).toHaveClass('modal-lg');
    });

    // Centrado
    it('centra el modal cuando centered es true', () => {
      render(
        <Modal show={true} onHide={vi.fn()} centered>
          <ModalBody>Content</ModalBody>
        </Modal>
      );
      
      const dialog = document.querySelector('.modal-dialog');
      expect(dialog).toHaveClass('modal-dialog-centered');
    });

    // Clase modal-open en body
    it('agrega clase modal-open al body cuando se abre', () => {
      render(
        <Modal show={true} onHide={vi.fn()}>
          <ModalBody>Content</ModalBody>
        </Modal>
      );
      
      expect(document.body).toHaveClass('modal-open');
    });
  });

  describe('ModalHeader', () => {
    it('renderiza correctamente con children', () => {
      render(
        <Modal show={true} onHide={vi.fn()}>
          <ModalHeader>Header Content</ModalHeader>
        </Modal>
      );
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    // Botón de cerrar
    it('renderiza botón de cerrar por defecto', () => {
      render(
        <Modal show={true} onHide={vi.fn()}>
          <ModalHeader>Header</ModalHeader>
        </Modal>
      );
      const closeButton = document.querySelector('.btn-close');
      expect(closeButton).toBeInTheDocument();
    });

    it('no renderiza botón de cerrar cuando closeButton es false', () => {
      render(
        <Modal show={true} onHide={vi.fn()}>
          <ModalHeader closeButton={false}>Header</ModalHeader>
        </Modal>
      );
      const closeButton = document.querySelector('.btn-close');
      expect(closeButton).not.toBeInTheDocument();
    });

    // Click en botón de cerrar
    it('cierra el modal al hacer clic en el botón de cerrar', () => {
      const handleHide = vi.fn();
      render(
        <Modal show={true} onHide={handleHide}>
          <ModalHeader>Header</ModalHeader>
        </Modal>
      );
      
      const closeButton = document.querySelector('.btn-close');
      fireEvent.click(closeButton);
      expect(handleHide).toHaveBeenCalledTimes(1);
    });
  });

  describe('ModalTitle', () => {
    // Elemento por defecto
    it('renderiza como h5 por defecto', () => {
      render(
        <Modal show={true} onHide={vi.fn()}>
          <ModalTitle>Title</ModalTitle>
        </Modal>
      );
      const title = screen.getByText('Title');
      expect(title.tagName).toBe('H5');
      expect(title).toHaveClass('modal-title');
    });

    // Elemento personalizado
    it('renderiza con elemento personalizado', () => {
      render(
        <Modal show={true} onHide={vi.fn()}>
          <ModalTitle as="h3">Custom Title</ModalTitle>
        </Modal>
      );
      const title = screen.getByText('Custom Title');
      expect(title.tagName).toBe('H3');
    });
  });

  describe('ModalBody', () => {
    it('renderiza contenido correctamente', () => {
      render(
        <Modal show={true} onHide={vi.fn()}>
          <ModalBody>Body content here</ModalBody>
        </Modal>
      );
      expect(screen.getByText('Body content here')).toBeInTheDocument();
    });
  });

  describe('ModalFooter', () => {
    it('renderiza contenido correctamente', () => {
      render(
        <Modal show={true} onHide={vi.fn()}>
          <ModalFooter>Footer content</ModalFooter>
        </Modal>
      );
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });
  });

  // Integración - Modal completo
  describe('Modal Integration', () => {
    it('renderiza un modal completo correctamente', () => {
      const handleHide = vi.fn();
      render(
        <Modal show={true} onHide={handleHide}>
          <ModalHeader closeButton>
            <ModalTitle>Test Modal</ModalTitle>
          </ModalHeader>
          <ModalBody>Modal body content</ModalBody>
          <ModalFooter>Footer buttons</ModalFooter>
        </Modal>
      );

      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal body content')).toBeInTheDocument();
      expect(screen.getByText('Footer buttons')).toBeInTheDocument();
    });
  });
});
