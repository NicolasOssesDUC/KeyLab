import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Alert from '../ui/Alert';
import { Card, CardBody, CardTitle, CardText } from '../ui/Card';
import * as TableNS from '../ui/Table';
import AdminProductos from './AdminProductos';
import AdminUsuarios from './AdminUsuarios';
import { getUsers } from '../utils/usersApi';
import { getProducts } from '../utils/productsApi';
import { getOrders } from '../utils/ordersApi'; // Nuevo import

const TableComp = TableNS.default ?? TableNS.Table;

export default function Admin() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });
  const [recentOrders, setRecentOrders] = useState([]); // Estado para la tabla

  const recompute = async () => {
    try {
        const [usuariosReal, productosReal, ordenesReal] = await Promise.all([
            getUsers(),
            getProducts(),
            getOrders()
        ]);
        
        setStats({
          users: usuariosReal.length,
          products: productosReal.length,
          orders: ordenesReal.length,
        });

        setRecentOrders(ordenesReal); // Actualizar tabla de órdenes
    } catch (error) {
        console.error("Error cargando estadísticas:", error);
    }
  };

  useEffect(() => {
    recompute();
  }, []);

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
    { title: 'Órdenes',   value: stats.orders,   desc: 'Totales' },
  ];

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
            <th>#</th><th>Total</th><th>Estado</th><th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.length === 0 ? (
            <tr><td colSpan={4} className="text-center text-muted">Sin órdenes</td></tr>
          ) : (
            recentOrders.slice(0, 5).map(o => ( // Mostrar solo las últimas 5
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>${(o.total ?? 0).toLocaleString('es-CL')}</td>
                <td><span className="badge bg-info text-dark">{o.estado ?? 'PENDIENTE'}</span></td>
                <td>{new Date(o.fecha).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </TableComp>

      <AdminProductos />
      <AdminUsuarios />
    </main>
  );
}
