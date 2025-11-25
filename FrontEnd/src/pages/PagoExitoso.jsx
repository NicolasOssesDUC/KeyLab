import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Container, Button } from '../ui';

function PagoExitoso() {
  const location = useLocation();
  const navigate = useNavigate();
  const { numeroOrden, total, email, productos } = location.state || {};

  // Si no hay datos de la orden, redirigir al carrito
  useEffect(() => {
    if (!numeroOrden) {
      navigate('/carrito');
    }
  }, [numeroOrden, navigate]);

  if (!numeroOrden) return null;

  return (
    <Container className="py-5 text-center" style={{ marginTop: '80px', maxWidth: '600px' }}>
      {/* Animación de éxito */}
      <div className="mb-4">
        <div 
          style={{ 
            width: '120px', 
            height: '120px', 
            margin: '0 auto',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '60px',
            animation: 'scaleIn 0.5s ease-out'
          }}
        >
          ✓
        </div>
      </div>

      <h1 className="text-success mb-3">¡Pago Exitoso!</h1>
      <p className="lead text-muted mb-4">
        Tu compra ha sido procesada correctamente
      </p>

      {/* Detalles de la orden */}
      <div className="card shadow-sm mb-4">
        <div className="card-body text-start">
          <h5 className="card-title text-center mb-4">Detalles de la Orden</h5>
          
          <div className="row mb-3">
            <div className="col-6 text-muted">Número de Orden:</div>
            <div className="col-6 text-end">
              <strong className="text-primary">#{numeroOrden}</strong>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6 text-muted">Total Pagado:</div>
            <div className="col-6 text-end">
              <strong className="text-success">${total.toLocaleString('es-CL')}</strong>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6 text-muted">Productos:</div>
            <div className="col-6 text-end">{productos}</div>
          </div>

          <div className="row mb-3">
            <div className="col-6 text-muted">Email:</div>
            <div className="col-6 text-end text-truncate">{email}</div>
          </div>

          <hr />

          <div className="alert alert-info mb-0">
            <small>
              <strong>📧 Confirmación enviada</strong>
              <br />
              Hemos enviado un comprobante de compra a tu correo electrónico.
            </small>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h6 className="card-title">¿Qué sigue?</h6>
          <ul className="list-unstyled text-start small text-muted mb-0">
            <li className="mb-2">✓ Recibirás un email de confirmación</li>
            <li className="mb-2">✓ Tu pedido será preparado en 24-48 horas</li>
            <li className="mb-2">✓ El envío llegará en 3-5 días hábiles</li>
            <li>✓ Puedes rastrear tu pedido con el número de orden</li>
          </ul>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="d-grid gap-2">
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => navigate('/')}
        >
          Volver al Inicio
        </Button>
        
        <Link to="/productos" className="btn btn-outline-primary">
          Seguir Comprando
        </Link>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Container>
  );
}

export default PagoExitoso;
