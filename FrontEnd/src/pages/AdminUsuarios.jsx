import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import * as TableNS from '../ui/Table';
const Table = TableNS.default ?? TableNS.Table;

import { getUsers, addUser, deleteUserByEmail } from '../utils/usersApi';
import { useAuth } from '../context/AuthContext';

export default function AdminUsuarios() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ run:'', nombre:'', apellidos:'', email:'', password:'', rol:'Usuario' });
  const [list, setList] = useState([]);

  // Carga asíncrona
  const load = async () => {
    const data = await getUsers();
    setList(data);
  };

  useEffect(() => {
    load();
    const onStorage = (e) => { if (e.key === 'usuarios') load(); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const adminCount = useMemo(() => list.filter(u => u.rol === 'ADMIN' || u.rol === 'Administrador').length, [list]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onAdd = async (e) => {
    e.preventDefault();
    const payload = {
      run: form.run.trim(),
      nombre: form.nombre.trim(),
      apellidos: form.apellidos.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      rol: form.rol === 'Administrador' ? 'ADMIN' : 'CLIENTE' // Traducir rol
    };
    if (!payload.email || !payload.password || !payload.nombre) {
      return Swal.fire('Validación', 'Nombre, correo y contraseña son requeridos', 'warning');
    }
    try {
      await addUser(payload);
      setForm({ run:'', nombre:'', apellidos:'', email:'', password:'', rol:'Usuario' });
      await load();
      Swal.fire('OK','Usuario agregado (Simulado)','success');
    } catch (err) {
      Swal.fire('Error', err.message || 'No se pudo agregar', 'error');
    }
  };

  const onDelete = (u) => {
    if (u.email === user?.email) {
      return Swal.fire('No permitido','No puedes eliminar tu propia cuenta mientras estás logueado','info');
    }
    // Ajuste para contar ADMINs correctamente
    if ((u.rol === 'ADMIN' || u.rol === 'Administrador') && adminCount <= 1) {
      return Swal.fire('No permitido','Debe existir al menos un Administrador en el sistema','info');
    }
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: `${u.nombre} (${u.email})`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then(async res => {
      if (res.isConfirmed) {
        await deleteUserByEmail(u.email);
        // Si por algún motivo eliminan al logueado (en otra pestaña), cerramos sesión
        if (u.email === user?.email) logout();
        await load();
        Swal.fire('Eliminado','Usuario eliminado (Simulado)','success');
      }
    });
  };

  return (
    <section className="mt-5">
      <h2 className="mb-3">Gestión de Usuarios</h2>

      <form onSubmit={onAdd} className="row g-3">
        <div className="col-md-2">
          <FormField id="run" name="run" label="RUN" value={form.run} onChange={onChange} />
        </div>
        <div className="col-md-3">
          <FormField id="nombre" name="nombre" label="Nombre" value={form.nombre} onChange={onChange} required />
        </div>
        <div className="col-md-3">
          <FormField id="apellidos" name="apellidos" label="Apellidos" value={form.apellidos} onChange={onChange} />
        </div>
        <div className="col-md-3">
          <FormField id="email" name="email" type="email" label="Correo" value={form.email} onChange={onChange} required />
        </div>
        <div className="col-md-2">
          <FormField id="password" name="password" type="password" label="Contraseña" value={form.password} onChange={onChange} required />
        </div>
        <div className="col-md-2">
          <label htmlFor="rol" className="form-label">Rol</label>
          <select id="rol" name="rol" className="form-select" value={form.rol} onChange={onChange}>
            <option>Usuario</option>
            <option>Administrador</option>
          </select>
        </div>
        <div className="col-md-2 d-grid">
          <Button type="submit">Agregar</Button>
        </div>
      </form>

      <Table striped hover responsive className="mt-3">
        <thead>
          <tr>
            <th>#</th><th>Nombre</th><th>Correo</th><th>Rol</th><th></th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr><td colSpan={5} className="text-center text-muted">Sin usuarios</td></tr>
          ) : list.map((u, i) => (
            <tr key={u.email}>
              <td>{i+1}</td>
              <td>{u.nombre} {u.apellidos}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td className="text-end">
                <Button type="button" variant="danger" onClick={() => onDelete(u)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}