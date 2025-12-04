import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { useEffect, useState } from "react";
import ListaCategoricaDinamica from "../components/ListaCategoricaDinamica";

function Keycaps() {
  const [keycaps, setKeycaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/productos")
      .then((res) => res.json())
      .then((data) => {
        // Filtrar en el frontend igual que en las demás categorías
        setKeycaps(data.filter((p) => p.categoria === "Keycaps"));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="productos">
      <h1 className="text-center mb-4">Keycaps</h1>

      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : keycaps.length === 0 ? (
        <p className="text-center">No hay keycaps disponibles.</p>
      ) : (
        <ProductGrid productos={keycaps} />
      )}

      <ListaCategoricaDinamica categoria="Keycaps" />
    </Container>
  );
}

export default Keycaps;
