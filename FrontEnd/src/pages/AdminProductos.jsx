import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import * as TableNS from '../ui/Table';
const Table = TableNS.default ?? TableNS.Table;

import { getProducts, addProduct, updateProduct, deleteProduct } from '../utils/productsApi';
import { supabase } from '../utils/supabaseClient';

export default function AdminProductos() {
  const [form, setForm] = useState({ nombre: '', categoria: '', precio: '', stock: '', descripcion: '', imagenUrl: '' });
  const [list, setList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = creando, number = editando

  const load = async () => {
    const data = await getProducts();
    setList(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Subida de imagen
  const onFileChange = async (e) => {
    try {
        const categoria = form.categoria;
        if (!categoria) {
            Swal.fire('Atención', 'Selecciona una categoría antes de subir la imagen', 'info');
            e.target.value = null;
            return;
        }

        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const fileName = `${categoria}/${Date.now()}_${file.name}`;
        
        const { data, error } = await supabase.storage
            .from('Productos-images')
            .upload(fileName, file);

        if (error) throw error;

        const { data: urlData } = supabase.storage
            .from('Productos-images')
            .getPublicUrl(fileName);

        setForm(prev => ({ ...prev, imagenUrl: urlData.publicUrl }));
        Swal.fire('OK', 'Imagen subida correctamente', 'success');

    } catch (error) {
        console.error("Error subiendo imagen:", error);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    } finally {
        setUploading(false);
    }
  };

  // Cargar datos en el formulario para editar
  const onEdit = (p) => {
    setForm({
        nombre: p.nombre,
        categoria: p.categoria,
        precio: p.precio,
        stock: p.stock,
        descripcion: p.descripcion || '',
        imagenUrl: p.imagenUrl || ''
    });
    setEditingId(p.id);
    // Scroll suave hacia arriba para ver el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onCancelEdit = () => {
    setForm({ nombre: '', categoria: '', precio: '', stock: '', descripcion: '', imagenUrl: '' });
    setEditingId(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nombre = form.nombre.trim();
    const categoria = form.categoria;
    const precio = Number(form.precio);
    const stock = Number(form.stock || 0);
    const descripcion = form.descripcion.trim();
    const imagenUrl = form.imagenUrl;

    if (!nombre) return Swal.fire('Validación','El nombre es requerido','warning');
    if (!categoria) return Swal.fire('Validación','La categoría es requerida','warning');
    if (!Number.isFinite(precio) || precio <= 0) return Swal.fire('Validación','Precio inválido','warning');
    if (!imagenUrl && !editingId) return Swal.fire('Validación','Debes subir una imagen','warning');

    try {
      const payload = { nombre, categoria, precio, stock, descripcion, imagenUrl };
      
      if (editingId) {
          // MODO EDICIÓN
          await updateProduct(editingId, payload);
          Swal.fire('Actualizado', 'Producto modificado correctamente', 'success');
      } else {
          // MODO CREACIÓN
          await addProduct(payload);
          Swal.fire('Creado', 'Producto agregado correctamente', 'success');
      }

      onCancelEdit(); // Limpiar form
      await load();   // Recargar tabla
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar el producto', 'error');
    }
  };

  const onDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then(async res => {
      if (res.isConfirmed) {
        try {
          await deleteProduct(id);
          await load();
          Swal.fire('Eliminado','El producto fue eliminado','success');
        } catch (error) {
          Swal.fire('Error','No se pudo eliminar','error');
        }
      }
    });
  };

  return (
    <section className="mt-5">
      <h2 className="mb-3">Gestión de Productos</h2>

      <div className="card p-4 shadow-sm mb-4">
          <h5 className="mb-3">{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h5>
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-4">
              <FormField id="nombre" name="nombre" label="Nombre" value={form.nombre} onChange={onChange} required />
            </div>
            <div className="col-md-3">
              <label htmlFor="categoria" className="form-label">Categoría</label>
              <select 
                id="categoria" 
                name="categoria" 
                className="form-select" 
                value={form.categoria} 
                onChange={onChange} 
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Teclados">Teclados</option>
                <option value="Keycaps">Keycaps</option>
                <option value="Switches">Switches</option>
                <option value="Cases">Cases</option>
              </select>
            </div>
            <div className="col-md-2">
              <FormField id="precio" name="precio" type="number" label="Precio" value={form.precio} onChange={onChange} required />
            </div>
            <div className="col-md-3">
              <FormField id="stock" name="stock" type="number" label="Stock" value={form.stock} onChange={onChange} />
            </div>
            
            <div className="col-md-12">
                <label className="form-label">Descripción</label>
                <textarea 
                    className="form-control" 
                    name="descripcion" 
                    rows="2" 
                    value={form.descripcion} 
                    onChange={onChange}
                    placeholder="Detalles del producto..."
                ></textarea>
            </div>

            <div className="col-md-6">
                <label className="form-label">Imagen</label>
                <input type="file" className="form-control" onChange={onFileChange} disabled={uploading} accept="image/*" />
                {uploading && <small className="text-muted">Subiendo...</small>}
                {form.imagenUrl && (
                    <div className="mt-2">
                        <small className="text-success d-block text-truncate mb-1">URL Actual: {form.imagenUrl}</small>
                        <img src={form.imagenUrl} alt="Preview" style={{height: 60, objectFit:'contain'}} />
                    </div>
                )}
            </div>

            <div className="col-12 d-flex gap-2 justify-content-end">
              {editingId && (
                  <Button type="button" variant="secondary" onClick={onCancelEdit}>Cancelar</Button>
              )}
              <Button type="submit" disabled={uploading}>
                  {editingId ? 'Guardar Cambios' : 'Agregar Producto'}
              </Button>
            </div>
          </form>
      </div>

      <Table striped hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Img</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr><td colSpan={6} className="text-center text-muted">Sin productos</td></tr>
          ) : list.map((p) => (
            <tr key={p.id}>
              <td>
                  {p.imagenUrl ? <img src={p.imagenUrl} alt="p" style={{width:40, height:40, objectFit:'cover', borderRadius:4}} /> : '-'}
              </td>
              <td>
                  <div className="fw-bold">{p.nombre}</div>
                  <small className="text-muted text-truncate d-block" style={{maxWidth: 200}}>{p.descripcion}</small>
              </td>
              <td><span className="badge bg-light text-dark border">{p.categoria}</span></td>
              <td>${Number(p.precio||0).toLocaleString('es-CL')}</td>
              <td>{p.stock ?? 0}</td>
              <td className="text-end">
                <div className="btn-group">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(p)} title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.378.378-.106 6-6-.293-.293-6 6z"/>
                        </svg>
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(p.id)} title="Eliminar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
