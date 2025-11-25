import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { productos } from "../data/productos";
import ListaCategoricaDinamica from "../components/ListaCategoricaDinamica";

function Keycaps() {
  const items = productos.filter((p) => p.categoria === "Keycaps");

  return (
    <Container className="productos">
      <h1 className="text-center mb-4">Keycaps</h1>

      {items.length === 0 ? (
        <p className="text-center">No hay keycaps disponibles.</p>
      ) : (
        <ProductGrid productos={items} />
      )}

      <ListaCategoricaDinamica categoria="Keycaps" />
    </Container>
  );
}

export default Keycaps;