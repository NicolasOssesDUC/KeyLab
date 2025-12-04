import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { useEffect, useState } from "react";
import ListaCategoricaDinamica from "../components/ListaCategoricaDinamica";

function Switches() {
  const [switches, setSwitches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/productos")
      .then((res) => res.json())
      .then((data) => {
        // Filtrar en el frontend igual que en Teclados
        setSwitches(data.filter((p) => p.categoria === "Switches"));
      })
      .finally(() => setLoading(false));
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
