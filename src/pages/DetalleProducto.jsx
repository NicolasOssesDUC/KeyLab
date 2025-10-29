import { useParams } from "react-router-dom";
import { productos } from "../data/productos"; // tu data estática
import Button from "../ui/Button";


export default function DetalleProducto() {
  const { id } = useParams(); // obtiene el id de la URL
  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  const agregarAlCarrito = () => {
    if (window.agregarAlCarrito) {
      window.agregarAlCarrito(producto.id);
    }
  };

  return (
    <div className="ficha-detalle">
      <div className="detalle-superior">
        <div className="detalle-imagen">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="producto-imagen"
          />
        </div>
        <div className="detalle-info">
          <h2 className="producto-nombre">{producto.nombre}</h2>
          <strong className="producto-precio">
            ${producto.precio.toLocaleString("es-CL")}
          </strong>
          <Button className="btn btn-primary mt-3" onClick={agregarAlCarrito}>
            Agregar al Carrito
          </Button>
        </div>
      </div>
      <p className="producto-descripcion">{producto.descripcion}</p>
    </div>
  );
}