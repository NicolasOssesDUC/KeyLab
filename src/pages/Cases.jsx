import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { productos } from "../data/productos";
import ListaCategoricaDinamica from "../components/ListaCategoricaDinamica";

function Cases() {
  const items = productos.filter((p) => p.categoria === "Cases");

  return (
    <Container className="productos">
      <h1 className="text-center mb-4">Cases</h1>

      {items.length === 0 ? (
        <p className="text-center">No hay cases disponibles.</p>
      ) : (
        <ProductGrid productos={items} />
      )}

      <ListaCategoricaDinamica categoria="Cases" />
    </Container>
  );
}

export default Cases;