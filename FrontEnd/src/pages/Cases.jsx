import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { useEffect, useState } from "react";
import ListaCategoricaDinamica from "../components/ListaCategoricaDinamica";

// importar funciones del servicio
import { getProducts } from "../utils/productsApi";

function Cases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCases() {
      try {
        const data = await getProducts(); // obtiene TODOS los productos
        const filtrados = data.filter((p) => p.categoria === "Cases"); // filtra por categoría
        setCases(filtrados);
      } catch (e) {
        console.error("Error cargando cases:", e);
      } finally {
        setLoading(false);
      }
    }

    loadCases();
  }, []);

  return (
    <Container className="productos">
      <h1 className="text-center mb-4">Cases</h1>

      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : cases.length === 0 ? (
        <p className="text-center">No hay cases disponibles.</p>
      ) : (
        <ProductGrid productos={cases} />
      )}

      <ListaCategoricaDinamica categoria="Cases" />
    </Container>
  );
}

export default Cases;
