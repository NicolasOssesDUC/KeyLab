import { useParams, useNavigate } from "react-router-dom";
import { Container } from "../ui";
import Button from "../ui/Button";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getItemQuantity } = useCart();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/productos")
      .then((res) => res.json())
      .then((data) => {
        const prod = data.find((p) => p.id === Number(id)); // encontrar por ID
        setProducto(prod || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center" style={{ marginTop: '80px' }}>
        <h2>Cargando producto...</h2>
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container className="py-5 text-center" style={{ marginTop: '80px' }}>
        <h2>Producto no encontrado</h2>
        <Button variant="primary" onClick={() => navigate('/productos')}>
          Volver a Productos
        </Button>
      </Container>
    );
  }

  const cantidadEnCarrito = getItemQuantity(producto.id);

  const handleAgregarAlCarrito = () => {
    addToCart(producto);
  };

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <div className="ficha-detalle">
        <div className="detalle-superior">
          <div className="detalle-imagen">
            <img
              src={producto.imagenUrl}
              alt={producto.nombre}
              className="producto-imagen"
            />
          </div>

          <div className="detalle-info">
            <h2 className="producto-nombre">{producto.nombre}</h2>

            <strong className="producto-precio">
              ${producto.precio.toLocaleString("es-CL")}
            </strong>

            <p className="text-muted mt-2">
              <small>Stock disponible: {producto.stock} unidades</small>
            </p>

            <Button
              variant="primary"
              size="lg"
              className="mt-3"
              onClick={handleAgregarAlCarrito}
              disabled={producto.stock === 0}
            >
              🛒 {cantidadEnCarrito > 0
                ? `Agregar más (${cantidadEnCarrito} en carrito)`
                : 'Agregar al Carrito'}
            </Button>

            {producto.stock === 0 && (
              <p className="text-danger mt-2">
                <small>Producto agotado</small>
              </p>
            )}

            <div className="mt-3">
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/productos')}
              >
                ← Volver a Productos
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4>Descripción</h4>
          <p className="producto-descripcion">{producto.descripcion}</p>
        </div>
      </div>
    </Container>
  );
}
