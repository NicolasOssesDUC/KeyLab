import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Teclados from './pages/Teclados';
import Keycaps from './pages/Keycaps';
import Switches from './pages/Switches';
import Cases from './pages/Cases';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Ubicacion from './pages/Ubicacion';
import Login from './pages/Login';
import Carrito from './pages/Carrito';
import PerfilUsuario from './pages/PerfilUsuario';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/teclados" element={<Teclados />} />
        <Route path="/keycaps" element={<Keycaps />} />
        <Route path="/switches" element={<Switches />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/perfil/:nombreUsuario" element={<PerfilUsuario />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
