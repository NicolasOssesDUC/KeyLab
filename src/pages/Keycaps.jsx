import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { productos } from "../data/productos";

function Keycaps() {
  const keycaps = productos.filter((p) => p.categoria === "Keycaps");

  return (
    <Container className="productos">
      <h1 className="text-center mb-4">Keycaps</h1>
      {keycaps.length === 0 ? (
        <p className="text-center">No hay cases disponibles.</p>
      ) : (
        <ProductGrid productos={keycaps} />
      )}
    </Container>
  );
}

export default Keycaps;