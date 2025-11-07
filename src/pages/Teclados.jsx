import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { productos } from "../data/productos";
import ListaCategoricaDinamica from "../components/ListaCategoricaDinamica";

function Teclados() {
  const teclados = productos.filter((p) => p.categoria === "Teclados");

  return (
    <Container className="productos">
      <h1 className="text-center mb-4">Teclados</h1>

      {teclados.length === 0 ? (
        <p className="text-center">No hay teclados disponibles.</p>
      ) : (
        <ProductGrid productos={teclados} />
      )}

      {/* 👇 siempre renderiza los nuevos agregados desde Admin */}
      <ListaCategoricaDinamica categoria="Teclados" />
    </Container>
  );
}

export default Teclados;