import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { useEffect, useState } from "react";
import ListaCategoricaDinamica from "../components/ListaCategoricaDinamica";

// Importar servicio de productos
import { getProducts } from "../utils/productsApi";

function Keycaps() {
  const [keycaps, setKeycaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadKeycaps() {
      try {
        const data = await getProducts(); // obtiene todos los productos
        const filtrados = data.filter((p) => p.categoria === "Keycaps");
        setKeycaps(filtrados);
      } catch (error) {
        console.error("Error cargando keycaps:", error);
      } finally {
        setLoading(false);
      }
    }

    loadKeycaps();
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
