import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Alert } from '../ui';

function PagoRechazado() {
  const location = useLocation();
  const navigate = useNavigate();
  const { motivo, total, numeroTarjeta } = location.state || {};

  // Si no hay datos, redirigir al carrito
  useEffect(() => {
    if (!motivo) {
      navigate('/carrito');
    }
  }, [motivo, navigate]);

  if (!motivo) return null;

  return (
    <Container className="py-5 text-center" style={{ marginTop: '80px', maxWidth: '600px' }}>
      {/* Icono de error */}
      <div className="mb-4">
        <div 
          style={{ 
            width: '120px', 
            height: '120px', 
            margin: '0 auto',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '60px',
            color: 'white',
            animation: 'shake 0.5s ease-out'
          }}
        >
          ✕
        </div>
      </div>

      <h1 className="text-danger mb-3">Pago Rechazado</h1>
      <p className="lead text-muted mb-4">
        No se pudo procesar tu pago
      </p>

      {/* Detalles del rechazo */}
      <Alert variant="danger" className="text-start mb-4">
        <h6 className="alert-heading">
          <strong>Motivo del Rechazo:</strong>
        </h6>
        <p className="mb-2">{motivo}</p>
        <hr />
        <small className="mb-0">
          <strong>Tarjeta:</strong> **** **** **** {numeroTarjeta}
        </small>
      </Alert>

      {/* Información del intento */}
      <div className="card shadow-sm mb-4">
        <div className="card-body text-start">
          <h5 className="card-title text-center mb-4">Detalles del Intento</h5>
          
          <div className="row mb-3">
            <div className="col-6 text-muted">Monto:</div>
            <div className="col-6 text-end">
              <strong>${total.toLocaleString('es-CL')}</strong>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6 text-muted">Estado:</div>
            <div className="col-6 text-end">
              <span className="badge bg-danger">Rechazado</span>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6 text-muted">Tarjeta:</div>
            <div className="col-6 text-end">**** {numeroTarjeta}</div>
          </div>
        </div>
      </div>

      {/* Posibles soluciones */}
      <div className="card shadow-sm mb-4">
        <div className="card-body text-start">
          <h6 className="card-title">¿Qué puedo hacer?</h6>
          <ul className="small text-muted mb-0">
            <li className="mb-2">Verifica que tu tarjeta tenga fondos suficientes</li>
            <li className="mb-2">Confirma que los datos de la tarjeta sean correctos</li>
            <li className="mb-2">Intenta con otra tarjeta de crédito o débito</li>
            <li className="mb-2">Contacta a tu banco si el problema persiste</li>
            <li>Prueba con otro método de pago</li>
          </ul>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="d-grid gap-2">
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => navigate('/simulador-pago')}
        >
          🔄 Intentar Nuevamente
        </Button>
        
        <Button 
          variant="outline-secondary"
          onClick={() => navigate('/carrito')}
        >
          ← Volver al Carrito
        </Button>

        <Button 
          variant="outline-danger"
          onClick={() => navigate('/')}
        >
          Cancelar Compra
        </Button>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </Container>
  );
}

export default PagoRechazado;
