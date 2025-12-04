import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { useEffect, useState } from "react";
import ListaCategoricaDinamica from "../components/ListaCategoricaDinamica";

function Teclados() {
  const [teclados, setTeclados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/productos")
      .then((res) => res.json())
      .then((data) => {
        // Filtrar en el frontend
        setTeclados(data.filter((p) => p.categoria === "Teclados"));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="productos">
      <h1 className="text-center mb-4">Teclados</h1>

      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : teclados.length === 0 ? (
        <p className="text-center">No hay teclados disponibles.</p>
      ) : (
        <ProductGrid productos={teclados} />
      )}

      {/* Si usas esta lista dinámica creada por ti, aquí puede seguir igual */}
      <ListaCategoricaDinamica categoria="Teclados" />
    </Container>
  );
}

export default Teclados;