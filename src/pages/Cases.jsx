import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { productos } from "../data/productos";

function Cases() {
  const cases = productos.filter((p) => p.categoria === "Cases");

  return (
    <Container className="productos">
      <h1 className="text-center mb-4">Cases</h1>
      {cases.length === 0 ? (
        <p className="text-center">No hay cases disponibles.</p>
      ) : (
        <ProductGrid productos={cases} />
      )}
    </Container>
  );
}

export default Cases;