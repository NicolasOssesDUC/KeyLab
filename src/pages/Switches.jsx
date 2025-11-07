import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { productos } from "../data/productos";
import ListaCategoricaDinamica from "../components/ListaCategoricaDinamica";

function Switches() {
  const items = productos.filter((p) => p.categoria === "Switches");

  return (
    <Container className="productos">
      <h1 className="text-center mb-4">Switches</h1>

      {items.length === 0 ? (
        <p className="text-center">No hay switches disponibles.</p>
      ) : (
        <ProductGrid productos={items} />
      )}

      <ListaCategoricaDinamica categoria="Switches" />
    </Container>
  );
}

export default Switches;