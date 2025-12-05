import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import FormField from '../ui/FormField';
import Button from '../ui/Button';
import * as TableNS from '../ui/Table';
const Table = TableNS.default ?? TableNS.Table;

import { getUsers, addUser, deleteUserById } from '../utils/usersApi';
import { useAuth } from '../context/AuthContext';

export default function AdminUsuarios() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ run:'', nombre:'', apellidos:'', email:'', password:'', rol:'CLIENTE' });
  const [list, setList] = useState([]);

  const load = async () => {
    const data = await getUsers();
    setList(data);
  };

  useEffect(() => {
    load();
  }, []);

  const adminCount = useMemo(() => list.filter(u => u.rol === 'ADMIN' || u.rol === 'Administrador').length, [list]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onAdd = async (e) => {
    e.preventDefault();
    const payload = {
      nombre: form.nombre.trim(),
      apellido: form.apellidos.trim(), // Frontend plural -> Backend singular
      email: form.email.trim().toLowerCase(),
      password: form.password,
      telefono: "00000000", // Placeholder
      fechaNacimiento: "2000-01-01", // Placeholder
      rol: form.rol // 'ADMIN' o 'CLIENTE'
    };

    if (!payload.email || !payload.password || !payload.nombre) {
      return Swal.fire('Validación', 'Nombre, correo y contraseña son requeridos', 'warning');
    }

    try {
      await addUser(payload);
      setForm({ run:'', nombre:'', apellidos:'', email:'', password:'', rol:'CLIENTE' });
      await load();
      Swal.fire('OK','Usuario agregado','success');
    } catch (err) {
      Swal.fire('Error', 'No se pudo agregar. Tal vez el correo ya existe.', 'error');
    }
  };

  const onDelete = (u) => {
    if (u.email === user?.email) {
      return Swal.fire('No permitido','No puedes eliminar tu propia cuenta mientras estás logueado','info');
    }
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
        try {
            await deleteUserById(u.id);
            if (u.email === user?.email) logout();
            await load();
            Swal.fire('Eliminado','Usuario eliminado','success');
        } catch (error) {
            Swal.fire('Error','No se pudo eliminar','error');
        }
      }
    });
  };

  return (
    <section className="mt-5">
      <h2 className="mb-3">Gestión de Usuarios</h2>

      <form onSubmit={onAdd} className="row g-3">
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
            <option value="CLIENTE">Cliente</option>
            <option value="ADMIN">Administrador</option>
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
            <tr key={u.id}>
              <td>{i+1}</td>
              <td>{u.nombre} {u.apellido}</td> 
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td className="text-end">
                <Button type="button" variant="danger" onClick={() => onDelete(u)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
