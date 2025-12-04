import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { useEffect, useState } from "react";
import ListaCategoricaDinamica from "../components/ListaCategoricaDinamica";

function Cases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/productos")
      .then((res) => res.json())
      .then((data) => {
        // Filtrar por categoría en el frontend
        setCases(data.filter((p) => p.categoria === "Cases"));
      })
      .finally(() => setLoading(false));
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
