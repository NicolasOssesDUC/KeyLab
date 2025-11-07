const KEY = 'productos';

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function write(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
  // evento opcional para que otras vistas se enteren
  window.dispatchEvent(new StorageEvent('storage', { key: KEY }));
}

export function getProducts() {
  return read();
}

export function addProduct(prod) {
  const arr = read();
  const id = prod.id ?? Date.now(); // id simple
  arr.push({ ...prod, id });
  write(arr);
  return id;
}

export function deleteProduct(id) {
  const arr = read().filter(p => String(p.id) !== String(id));
  write(arr);
}