import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, FormField, Button, Alert } from '../ui';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

function SimuladorPago() {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCartSilent } = useCart();
  
  const [formData, setFormData] = useState({
    nombreTitular: '',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Si no hay productos en el carrito, redirigir
  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center" style={{ marginTop: '80px' }}>
        <Alert variant="warning" heading="Carrito Vacío">
          No tienes productos en el carrito. Agrega productos para continuar con la compra.
        </Alert>
        <Button variant="primary" onClick={() => navigate('/productos')}>
          Ver Productos
        </Button>
      </Container>
    );
  }

  const total = getTotalPrice();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando se modifica
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Nombre del titular (mínimo 3 caracteres)
    if (!formData.nombreTitular.trim() || formData.nombreTitular.trim().length < 3) {
      newErrors.nombreTitular = 'El nombre debe tener al menos 3 caracteres';
    }

    // Número de tarjeta (16 dígitos)
    const numeroLimpio = formData.numeroTarjeta.replace(/\s/g, '');
    if (!/^\d{16}$/.test(numeroLimpio)) {
      newErrors.numeroTarjeta = 'El número de tarjeta debe tener 16 dígitos';
    }

    // Fecha de expiración (formato MM/YY)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.fechaExpiracion)) {
      newErrors.fechaExpiracion = 'Formato inválido. Use MM/YY';
    } else {
      // Validar que no esté vencida
      const [mes, anio] = formData.fechaExpiracion.split('/');
      const fechaTarjeta = new Date(2000 + parseInt(anio), parseInt(mes) - 1);
      const fechaActual = new Date();
      if (fechaTarjeta < fechaActual) {
        newErrors.fechaExpiracion = 'La tarjeta está vencida';
      }
    }

    // CVV (3 dígitos)
    if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = 'El CVV debe tener 3 dígitos';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const procesarPago = () => {
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Datos Incompletos',
        text: 'Por favor, completa correctamente todos los campos'
      });
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago (2 segundos)
    setTimeout(() => {
      // Lógica simple: último dígito de tarjeta
      // Par → Aceptada, Impar → Rechazada
      const numeroLimpio = formData.numeroTarjeta.replace(/\s/g, '');
      const ultimoDigito = parseInt(numeroLimpio.slice(-1));
      const pagoAceptado = ultimoDigito % 2 === 0;

      if (pagoAceptado) {
        // Generar número de orden aleatorio
        const numeroOrden = Math.floor(Math.random() * 900000) + 100000;
        
        // Limpiar el carrito SIN confirmación
        clearCartSilent();
        
        // Redirigir a página de éxito
        navigate('/pago-exitoso', { 
          state: { 
            numeroOrden,
            total,
            email: formData.email,
            productos: cart.length
          } 
        });
      } else {
        // Redirigir a página de rechazo
        navigate('/pago-rechazado', {
          state: {
            motivo: 'Fondos insuficientes',
            total,
            numeroTarjeta: formData.numeroTarjeta.slice(-4)
          }
        });
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  // Formatear número de tarjeta mientras se escribe
  const formatearTarjeta = (valor) => {
    const limpio = valor.replace(/\s/g, '');
    const grupos = limpio.match(/.{1,4}/g) || [];
    return grupos.join(' ').slice(0, 19); // 16 dígitos + 3 espacios
  };

  const handleTarjetaChange = (e) => {
    const formateado = formatearTarjeta(e.target.value);
    setFormData(prev => ({ ...prev, numeroTarjeta: formateado }));
    if (errors.numeroTarjeta) {
      setErrors(prev => ({ ...prev, numeroTarjeta: '' }));
    }
  };

  return (
    <Container className="py-5" style={{ marginTop: '80px', maxWidth: '800px' }}>
      <h1 className="mb-4 text-center">💳 Pago Seguro</h1>

      <div className="row">
        {/* Formulario de pago */}
        <div className="col-md-7">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Datos de la Tarjeta</h5>
              
              <FormField
                id="nombreTitular"
                name="nombreTitular"
                label="Nombre del Titular"
                type="text"
                value={formData.nombreTitular}
                onChange={handleChange}
                error={errors.nombreTitular}
                isInvalid={!!errors.nombreTitular}
                placeholder="Como aparece en la tarjeta"
                required
              />

              <FormField
                id="numeroTarjeta"
                name="numeroTarjeta"
                label="Número de Tarjeta"
                type="text"
                value={formData.numeroTarjeta}
                onChange={handleTarjetaChange}
                error={errors.numeroTarjeta}
                isInvalid={!!errors.numeroTarjeta}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />

              <div className="row">
                <div className="col-md-6">
                  <FormField
                    id="fechaExpiracion"
                    name="fechaExpiracion"
                    label="Fecha de Expiración"
                    type="text"
                    value={formData.fechaExpiracion}
                    onChange={handleChange}
                    error={errors.fechaExpiracion}
                    isInvalid={!!errors.fechaExpiracion}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <FormField
                    id="cvv"
                    name="cvv"
                    label="CVV"
                    type="text"
                    value={formData.cvv}
                    onChange={handleChange}
                    error={errors.cvv}
                    isInvalid={!!errors.cvv}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              <FormField
                id="email"
                name="email"
                label="Email de Confirmación"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                isInvalid={!!errors.email}
                placeholder="tu@email.com"
                helperText="Enviaremos el comprobante a este correo"
                required
              />
            </div>
          </div>
        </div>

        {/* Resumen de la compra */}
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Resumen de Compra</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Productos:</span>
                <span>{cart.length}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal:</span>
                <span>${total.toLocaleString('es-CL')}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Envío:</span>
                <span className="text-success">Gratis</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3">
                <h5>Total a Pagar:</h5>
                <h5 className="text-primary">${total.toLocaleString('es-CL')}</h5>
              </div>

              <Button
                variant="success"
                className="w-100 mb-2"
                size="lg"
                onClick={procesarPago}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Procesando...
                  </>
                ) : (
                  '🔒 Confirmar Pago'
                )}
              </Button>

              <Button
                variant="outline-secondary"
                className="w-100"
                onClick={() => navigate('/carrito')}
                disabled={isProcessing}
              >
                ← Volver al Carrito
              </Button>

              <div className="mt-3 small text-muted text-center">
                <i className="bi bi-shield-check"></i> Pago seguro y encriptado
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SimuladorPago;
