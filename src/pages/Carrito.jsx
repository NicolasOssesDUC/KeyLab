import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  Button,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter
} from '../ui';
import { useCart } from '../context/CartContext';

function Carrito() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    clearCart 
  } = useCart();
  
  const [showClearModal, setShowClearModal] = useState(false);

  // Si el carrito está vacío
  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center" style={{ marginTop: '80px' }}>
        <h1 className="mb-4">🛒 Tu Carrito</h1>
        <div className="alert alert-info">
          <h4>Tu carrito está vacío</h4>
          <p>¡Agrega productos para empezar a comprar!</p>
          <Link to="/productos" className="btn btn-primary mt-3">
            Ver Productos
          </Link>
        </div>
      </Container>
    );
  }

  const total = getTotalPrice();

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <h1 className="mb-4">🛒 Mi Carrito</h1>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="table-responsive">
            <Table striped hover>
              <TableHead>
                <TableRow>
                  <TableCell as="th">Producto</TableCell>
                  <TableCell as="th">Precio</TableCell>
                  <TableCell as="th" className="text-center">Cantidad</TableCell>
                  <TableCell as="th">Subtotal</TableCell>
                  <TableCell as="th" className="text-center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <img 
                          src={item.imagen} 
                          alt={item.nombre}
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          className="me-3 rounded"
                        />
                        <div>
                          <Link 
                            to={`/producto/${item.id}`}
                            className="text-decoration-none fw-bold"
                          >
                            {item.nombre}
                          </Link>
                          <br />
                          <small className="text-muted">Stock: {item.stock}</small>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      ${item.precio.toLocaleString('es-CL')}
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline-secondary"
                          onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                          disabled={item.cantidad <= 1}
                        >
                          −
                        </Button>
                        <span className="fw-bold mx-2" style={{ minWidth: '30px', textAlign: 'center' }}>
                          {item.cantidad}
                        </span>
                        <Button 
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                          disabled={item.cantidad >= item.stock}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="fw-bold">
                      ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️ Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Resumen de la compra */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resumen de la Compra</h5>
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Productos ({cart.length}):</span>
                <span className="fw-bold">${total.toLocaleString('es-CL')}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span className="text-success">Gratis</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3">
                <h5>Total:</h5>
                <h5 className="text-primary">${total.toLocaleString('es-CL')}</h5>
              </div>
              
              <Button 
                variant="success" 
                className="w-100 mb-2"
                size="lg"
              >
                💳 Proceder al Pago
              </Button>
              
              <Link to="/productos" className="btn btn-outline-primary w-100 mb-2">
                ← Seguir Comprando
              </Link>
              
              <Button 
                variant="outline-danger" 
                className="w-100"
                onClick={() => setShowClearModal(true)}
              >
                🗑️ Vaciar Carrito
              </Button>
            </div>
          </div>

          {/* Información adicional */}
          <div className="card mt-3">
            <div className="card-body">
              <h6 className="card-title">Información de Envío</h6>
              <ul className="small text-muted mb-0">
                <li>Envío gratis en compras sobre $50.000</li>
                <li>Tiempo de entrega: 3-5 días hábiles</li>
                <li>Retiro en tienda disponible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación para vaciar carrito */}
      <Modal 
        show={showClearModal} 
        onHide={() => setShowClearModal(false)}
        centered
      >
        <ModalHeader closeButton>
          <ModalTitle>¿Vaciar Carrito?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>¿Estás seguro de que quieres eliminar todos los productos del carrito?</p>
          <p className="text-danger mb-0">Esta acción no se puede deshacer.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowClearModal(false)}>
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            onClick={() => {
              clearCart();
              setShowClearModal(false);
            }}
          >
            Sí, Vaciar Carrito
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default Carrito;
