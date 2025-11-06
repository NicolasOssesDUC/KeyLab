import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Table, TableHead, TableBody, TableFoot, TableRow, TableCell } from '../ui/Table';

describe('Table Components', () => {
  // Table - Renderizado básico
  describe('Table', () => {
    it('renderiza correctamente con children', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByText('Cell')).toBeInTheDocument();
    });

    // Clases de estilo
    it('aplica clase striped cuando se especifica', () => {
      const { container } = render(<Table striped><tbody></tbody></Table>);
      const table = container.querySelector('table');
      expect(table).toHaveClass('table-striped');
    });

    it('aplica clase hover cuando se especifica', () => {
      const { container } = render(<Table hover><tbody></tbody></Table>);
      const table = container.querySelector('table');
      expect(table).toHaveClass('table-hover');
    });

    it('aplica clase bordered cuando se especifica', () => {
      const { container } = render(<Table bordered><tbody></tbody></Table>);
      const table = container.querySelector('table');
      expect(table).toHaveClass('table-bordered');
    });

    // Tamaño
    it('aplica tamaño sm correctamente', () => {
      const { container } = render(<Table size="sm"><tbody></tbody></Table>);
      const table = container.querySelector('table');
      expect(table).toHaveClass('table-sm');
    });

    // Variante de color
    it('aplica variante correctamente', () => {
      const { container } = render(<Table variant="dark"><tbody></tbody></Table>);
      const table = container.querySelector('table');
      expect(table).toHaveClass('table-dark');
    });

    // Responsive
    it('envuelve en div responsive cuando se especifica', () => {
      const { container } = render(<Table responsive><tbody></tbody></Table>);
      const wrapper = container.querySelector('.table-responsive');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper.querySelector('table')).toBeInTheDocument();
    });

    // Múltiples clases combinadas
    it('combina múltiples clases correctamente', () => {
      const { container } = render(
        <Table striped hover bordered size="sm" variant="dark">
          <tbody></tbody>
        </Table>
      );
      const table = container.querySelector('table');
      expect(table).toHaveClass('table-striped');
      expect(table).toHaveClass('table-hover');
      expect(table).toHaveClass('table-bordered');
      expect(table).toHaveClass('table-sm');
      expect(table).toHaveClass('table-dark');
    });
  });

  // Sub-componentes
  describe('TableHead', () => {
    it('renderiza correctamente', () => {
      render(
        <table>
          <TableHead>
            <TableRow>
              <TableCell as="th">Header</TableCell>
            </TableRow>
          </TableHead>
        </table>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
    });
  });

  describe('TableBody', () => {
    it('renderiza correctamente', () => {
      render(
        <table>
          <TableBody>
            <TableRow>
              <TableCell>Body Cell</TableCell>
            </TableRow>
          </TableBody>
        </table>
      );
      expect(screen.getByText('Body Cell')).toBeInTheDocument();
    });
  });

  describe('TableFoot', () => {
    it('renderiza correctamente', () => {
      render(
        <table>
          <TableFoot>
            <TableRow>
              <TableCell>Footer Cell</TableCell>
            </TableRow>
          </TableFoot>
        </table>
      );
      expect(screen.getByText('Footer Cell')).toBeInTheDocument();
    });
  });

  describe('TableRow', () => {
    it('renderiza correctamente', () => {
      render(
        <table>
          <tbody>
            <TableRow>
              <TableCell>Row Cell</TableCell>
            </TableRow>
          </tbody>
        </table>
      );
      expect(screen.getByText('Row Cell')).toBeInTheDocument();
    });
  });

  describe('TableCell', () => {
    // Renderiza como td por defecto
    it('renderiza como td por defecto', () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell>Cell Content</TableCell>
            </tr>
          </tbody>
        </table>
      );
      const cell = screen.getByText('Cell Content');
      expect(cell.tagName).toBe('TD');
    });

    // Renderiza como th cuando se especifica
    it('renderiza como th cuando se especifica', () => {
      render(
        <table>
          <thead>
            <tr>
              <TableCell as="th">Header Cell</TableCell>
            </tr>
          </thead>
        </table>
      );
      const cell = screen.getByText('Header Cell');
      expect(cell.tagName).toBe('TH');
    });

    // Aplica scope
    it('aplica scope correctamente', () => {
      render(
        <table>
          <thead>
            <tr>
              <TableCell as="th" scope="col">Column Header</TableCell>
            </tr>
          </thead>
        </table>
      );
      const cell = screen.getByText('Column Header');
      expect(cell).toHaveAttribute('scope', 'col');
    });
  });

  // Integración - Tabla completa
  describe('Table Integration', () => {
    it('renderiza una tabla completa correctamente', () => {
      render(
        <Table striped hover>
          <TableHead>
            <TableRow>
              <TableCell as="th">Header 1</TableCell>
              <TableCell as="th">Header 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Data 1</TableCell>
              <TableCell>Data 2</TableCell>
            </TableRow>
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableCell>Footer 1</TableCell>
              <TableCell>Footer 2</TableCell>
            </TableRow>
          </TableFoot>
        </Table>
      );

      expect(screen.getByText('Header 1')).toBeInTheDocument();
      expect(screen.getByText('Header 2')).toBeInTheDocument();
      expect(screen.getByText('Data 1')).toBeInTheDocument();
      expect(screen.getByText('Data 2')).toBeInTheDocument();
      expect(screen.getByText('Footer 1')).toBeInTheDocument();
      expect(screen.getByText('Footer 2')).toBeInTheDocument();
    });
  });
});
