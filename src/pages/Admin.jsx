import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Alert from '../ui/Alert';
import { Card, CardBody, CardTitle, CardText } from '../ui/Card';
import * as TableNS from '../ui/Table';
const TableComp = TableNS.default ?? TableNS.Table;

// helpers seguros para leer localStorage
function readArray(key) {
  try {
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export default function Admin() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });

  // carga y recalcula contadores (usuarios reales en localStorage)
  const recompute = () => {
    const usuarios = readArray('usuarios');     // ✅ ya existe en tu proyecto
    const productos = readArray('productos');   // si aún no existe, quedará en 0
    const ordenes   = readArray('ordenes');     // si aún no existe, quedará en 0
    setStats({
      users: usuarios.length,
      products: productos.length,
      orders: ordenes.length,
    });
  };

  useEffect(() => {
    recompute();

    // si cambia localStorage desde otra pestaña, nos actualizamos
    const onStorage = (e) => {
      if (['usuarios', 'productos', 'ordenes'].includes(e.key)) {
        recompute();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!user || user.rol !== 'Administrador') {
    return (
      <main className="container py-5">
        <Alert variant="danger">Acceso restringido. Debes ser Administrador.</Alert>
      </main>
    );
  }

  const widgets = [
    { title: 'Usuarios',  value: stats.users,    desc: 'Registrados en el sistema' },
    { title: 'Productos', value: stats.products, desc: 'Activos' },
    { title: 'Órdenes',   value: stats.orders,   desc: 'Hoy' },
  ];

  const orders = readArray('ordenes'); // usa tus datos si los guardas; si no, quedará vacío

  return (
    <main className="container py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="mb-0">Panel de Administración</h1>
        <button className="btn btn-outline-secondary btn-sm" onClick={recompute}>
          Actualizar
        </button>
      </div>

      <div className="row g-3">
        {widgets.map((w, idx) => (
          <div className="col-md-4" key={idx}>
            <Card shadow>
              <CardBody>
                <CardTitle>{w.title}</CardTitle>
                <div className="display-6">{w.value}</div>
                <CardText>{w.desc}</CardText>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      <h2 className="mt-5">Órdenes recientes</h2>
      <TableComp striped hover responsive className="mt-2">
        <thead>
          <tr>
            <th>#</th><th>Cliente</th><th>Total</th><th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan={4} className="text-center text-muted">Sin órdenes</td></tr>
          ) : (
            orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.cliente}</td>
                <td>${(o.total ?? 0).toLocaleString('es-CL')}</td>
                <td>{o.estado ?? '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </TableComp>
    </main>
  );
}