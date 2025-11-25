import { useEffect, useState } from 'react';
import { getProducts } from '../utils/productsApi.js';

export default function useProductsByCategory(categoria) {
  const [items, setItems] = useState([]);

  const load = () => {
    const all = getProducts();
    setItems(all.filter(p =>
      String(p.categoria || '').toLowerCase() === String(categoria).toLowerCase()
    ));
  };

  useEffect(() => {
    load();
    // Actualiza automáticamente si el admin agrega o elimina productos
    const onStorage = (e) => {
      if (e.key === 'productos') load();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [categoria]);

  return items;
}