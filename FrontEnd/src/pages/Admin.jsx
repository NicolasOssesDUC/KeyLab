import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Alert from '../ui/Alert';
import { Card, CardBody, CardTitle, CardText } from '../ui/Card';
import * as TableNS from '../ui/Table';
import AdminProductos from './AdminProductos';
import AdminUsuarios from './AdminUsuarios';
import { getUsers } from '../utils/usersApi';
import { getProducts } from '../utils/productsApi';

const TableComp = TableNS.default ?? TableNS.Table;

// Helper para leer órdenes (sigue usando localStorage por ahora)
function readOrders() {
  try {
    const raw = localStorage.getItem('ordenes');
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export default function Admin() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });

  // Carga asíncrona desde Backend
  const recompute = async () => {
    try {
        // Ejecutamos las peticiones en paralelo
        const [usuariosReal, productosReal] = await Promise.all([
            getUsers(),
            getProducts()
        ]);
        
        const ordenes = readOrders(); // Mock por ahora

        setStats({
          users: usuariosReal.length,
          products: productosReal.length,
          orders: ordenes.length,
        });
    } catch (error) {
        console.error("Error cargando estadísticas:", error);
    }
  };

  useEffect(() => {
    recompute();
  }, []);

  // Validación de Rol (Acepta 'Administrador' legacy o 'ADMIN' backend)
  if (!user || (user.rol !== 'Administrador' && user.rol !== 'ADMIN')) {
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

  const orders = readOrders();

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

      {/* Componentes CRUD de Productos y Usuarios */}
      <AdminProductos />
      <AdminUsuarios />
    </main>
  );
}
