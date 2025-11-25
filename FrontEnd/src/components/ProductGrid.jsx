import { Card, CardBody, CardImg, CardTitle, CardText, CardFooter } from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';
import '../assets/css/ProductGrid.css';

export default function ProductGrid({ productos }) {
  const { addToCart, getItemQuantity } = useCart();

  const handleAddToCart = (producto) => {
    addToCart(producto);
  };
  const items = Array.isArray(productos) ? productos : [];

  if (!items.length) {
    return <p>No hay productos para mostrar.</p>;
  }

  return (
    <div className="productos-grid">
      {items.map((producto) => {
        const cantidadEnCarrito = getItemQuantity(producto.id);
        
        return (
          <Card key={producto.id} className="ficha">
            {/* Imagen en un wrapper */}
            <div className="card-img-wrapper">
              <Link to={`/producto/${producto.id}`}>
                <CardImg src={producto.imagen} alt={producto.nombre} />
              </Link>
            </div>

            {/* Contenido */}
            <CardBody className="card-content">
              <CardTitle>{producto.nombre}</CardTitle>
              <CardText>${producto.precio.toLocaleString('es-CL')}</CardText>
              
              {cantidadEnCarrito > 0 && (
                <div className="mt-2">
                  <Badge bg="success">
                    {cantidadEnCarrito} en el carrito
                  </Badge>
                </div>
              )}
            </CardBody>

            {/* Botones en footer */}
            <CardFooter className="card-buttons">
              <Button
                className="btn btn-primary w-100"
                onClick={() => handleAddToCart(producto)}
              >
                {cantidadEnCarrito > 0 ? 'Añadir más' : 'Añadir al Carrito'}
              </Button>
              <Link to={`/producto/${producto.id}`}>
                <Button
                  variant="secondary"
                  className="btn btn-secondary w-100 mt-2"
                >
                  Ver Detalle
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}