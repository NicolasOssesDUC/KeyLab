import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import * as TableNS from '../ui/Table';
const Table = TableNS.default ?? TableNS.Table;

import { getProducts, addProduct, deleteProduct } from '../utils/productsApi';

export default function AdminProductos() {
  const [form, setForm] = useState({ nombre: '', categoria: '', precio: '', stock: '' });
  const [list, setList] = useState([]);

  const load = () => setList(getProducts());

  useEffect(() => {
    load();
    const onStorage = (e) => { if (e.key === 'productos') load(); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onAdd = (e) => {
    e.preventDefault();
    const nombre = form.nombre.trim();
    const categoria = form.categoria.trim();
    const precio = Number(form.precio);
    const stock = Number(form.stock || 0);

    if (!nombre) return Swal.fire('Validación','El nombre es requerido','warning');
    if (!categoria) return Swal.fire('Validación','La categoría es requerida','warning');
    if (!Number.isFinite(precio) || precio <= 0) return Swal.fire('Validación','Precio inválido','warning');

    addProduct({ nombre, categoria, precio, stock });
    setForm({ nombre: '', categoria: '', precio: '', stock: '' });
    load();
    Swal.fire('OK','Producto agregado','success');
  };

  const onDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then(res => {
      if (res.isConfirmed) {
        deleteProduct(id);
        load();
        Swal.fire('Eliminado','El producto fue eliminado','success');
      }
    });
  };

  return (
    <section className="mt-5">
      <h2 className="mb-3">Gestión de Productos</h2>

      <form onSubmit={onAdd} className="row g-3">
        <div className="col-md-4">
          <FormField id="nombre" name="nombre" label="Nombre" value={form.nombre} onChange={onChange} required />
        </div>
        <div className="col-md-3">
          <FormField id="categoria" name="categoria" label="Categoría" value={form.categoria} onChange={onChange} required />
        </div>
        <div className="col-md-2">
          <FormField id="precio" name="precio" type="number" label="Precio" value={form.precio} onChange={onChange} required />
        </div>
        <div className="col-md-2">
          <FormField id="stock" name="stock" type="number" label="Stock" value={form.stock} onChange={onChange} />
        </div>
        <div className="col-md-1 d-grid">
          <Button type="submit">Agregar</Button>
        </div>
      </form>

      <Table striped hover responsive className="mt-3">
        <thead>
          <tr>
            <th>#</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th></th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr><td colSpan={6} className="text-center text-muted">Sin productos</td></tr>
          ) : list.map((p, i) => (
            <tr key={p.id}>
              <td>{i+1}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>${Number(p.precio||0).toLocaleString('es-CL')}</td>
              <td>{p.stock ?? 0}</td>
              <td className="text-end">
                <Button type="button" variant="danger" onClick={() => onDelete(p.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}