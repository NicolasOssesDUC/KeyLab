import { useEffect, useState } from 'react';
import { getProducts } from '../utils/productsApi.js';
import { useCart } from '../context/CartContext';

export default function ListaCategoricaDinamica({ categoria }) {
  const { addToCart } = useCart();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      const all = await getProducts(); 
      const filtered = all.filter(
        p => String(p.categoria || '').toLowerCase() === categoria.toLowerCase()
      );
      setItems(filtered);
    }

    load();
  }, [categoria]);

  if (!items.length) return null;

  return (
    <section className="container my-4">
      <h2 className="mb-3">Nuevos {categoria}</h2>
      <div className="row g-3">
        {items.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100">
              <img
                src={p.imagen || '/assets/img/placeholder.png'}
                className="card-img-top"
                alt={p.nombre}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text mb-1">{p.categoria}</p>
                <strong className="mb-2">
                  ${Number(p.precio || 0).toLocaleString('es-CL')}
                </strong>
                <button
                  type="button"
                  className="btn btn-primary mt-auto"
                  onClick={() =>
                    addToCart({
                      id: p.id,
                      nombre: p.nombre,
                      precio: Number(p.precio || 0),
                      imagen: p.imagen || '/assets/img/placeholder.png',
                      categoria: p.categoria,
                    })
                  }
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
