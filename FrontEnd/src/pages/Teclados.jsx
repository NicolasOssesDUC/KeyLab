import { Container } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";
import { useEffect, useState } from "react";
import ListaCategoricaDinamica from "../components/ListaCategoricaDinamica";

// Importar el servicio centralizado
import { getProducts } from "../utils/productsApi";

function Teclados() {
  const [teclados, setTeclados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeclados() {
      try {
        const data = await getProducts(); // obtiene todo desde el backend
        const filtrados = data.filter((p) => p.categoria === "Teclados");
        setTeclados(filtrados);
      } catch (error) {
        console.error("Error cargando teclados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTeclados();
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

      <ListaCategoricaDinamica categoria="Teclados" />
    </Container>
  );
}

export default Teclados;
