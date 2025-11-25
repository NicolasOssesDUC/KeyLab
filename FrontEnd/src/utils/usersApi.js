const KEY = 'usuarios';

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
  window.dispatchEvent(new StorageEvent('storage', { key: KEY }));
}

export function getUsers() {
  return read();
}

export function addUser(u) {
  const users = read();
  const exists = users.some(x => String(x.email).trim().toLowerCase() === String(u.email).trim().toLowerCase());
  if (exists) throw new Error('El correo ya está registrado.');
  users.push(u);
  write(users);
  return u;
}

export function deleteUserByEmail(email) {
  const users = read();
  const filtered = users.filter(u => String(u.email).trim().toLowerCase() !== String(email).trim().toLowerCase());
  write(filtered);
}
