import { Link } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';


function Navbar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

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
              Ubicación
            </Nav.Link>

            {user?.rol === 'Administrador' && (
                <Nav.Link as={Link} to="/admin" className="nav-link">
                  Panel de control
                  </Nav.Link>
                  )}
                  {user ? (
              <>
                <Nav.Link
                  disabled
                  className="nav-link "
                  style={{ color: '#000', cursor: 'default' }}
                >
                  Hola, {user.nombre || 'Usuario'}
                </Nav.Link>
                <Nav.Link
                  onClick={logout}
                  className="nav-link text-danger "
                  style={{ cursor: 'pointer' }}
                >
                  Cerrar sesión
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-link">
                Login
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/carrito" className="nav-link position-relative me-3">
              <img src="/assets/img/carrito.jpg" alt="carrito" style={{ width: '24px' }} />
              <span
                id="contador" 
                className="position-absolute top-50 start-100 translate-middle-y"
              >
                {getTotalItems()}
              </span>
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
