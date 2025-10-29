import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { productos } from "../data/productos";

function Switches() {
  const switches = productos.filter((p) => p.categoria === "Switches");

  return (
    <Container className="productos">
      <h1 className="text-center mb-4">Switches</h1>
      {switches.length === 0 ? (
        <p className="text-center">No hay cases disponibles.</p>
      ) : (
        <ProductGrid productos={switches} />
      )}
    </Container>
  );
}

export default Switches;