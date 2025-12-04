import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { useEffect, useState } from "react";
import ListaCategoricaDinamica from "../components/ListaCategoricaDinamica";

// Importar servicio centralizado
import { getProducts } from "../utils/productsApi";

function Switches() {
  const [switches, setSwitches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSwitches() {
      try {
        const data = await getProducts(); // obtiene todos los productos
        const filtrados = data.filter((p) => p.categoria === "Switches");
        setSwitches(filtrados);
      } catch (error) {
        console.error("Error cargando switches:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSwitches();
  }, []);

  return (
    <Container className="productos">
      <h1 className="text-center mb-4">Switches</h1>

      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : switches.length === 0 ? (
        <p className="text-center">No hay switches disponibles.</p>
      ) : (
        <ProductGrid productos={switches} />
      )}

      <ListaCategoricaDinamica categoria="Switches" />
    </Container>
  );
}

export default Switches;
