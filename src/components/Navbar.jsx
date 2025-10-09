import { Link } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Cargar contador del carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    setCartCount(carrito.length);

    // Listener para actualizar el contador cuando cambie el carrito
    const updateCartCount = () => {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      setCartCount(carrito.length);
    };

    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <BsNavbar expand="lg" className="navbar-light bg-light" fixed="top">
      <Container fluid>
        <BsNavbar.Brand as={Link} to="/">
          <img src="/assets/img/logokb.png" alt="logo" className="navbar-logo" />
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="navbarNav" />
        <BsNavbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
              Inicio
            </Nav.Link>
            <NavDropdown title="Productos" id="navbarDropdown" className="nav-item">
              <NavDropdown.Item as={Link} to="/teclados">Teclados</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/keycaps">Key Caps</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/switches">Switches</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cases">Cases</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/contacto" className="nav-link">
              Contacto
            </Nav.Link>
            <Nav.Link as={Link} to="/nosotros" className="nav-link">
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/ubicacion" className="nav-link">
              Ubicacion
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-link">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/carrito" className="nav-link position-relative me-3">
              <img src="/assets/img/carrito.jpg" alt="carrito" style={{ width: '24px' }} />
              <span 
                id="contador" 
                className="position-absolute top-50 start-100 translate-middle-y"
              >
                {cartCount}
              </span>
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
