import { useState } from 'react';
import { Container, Button, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, FormField } from '../ui';

function TestModal() {
  // Estados para diferentes modales
  const [showBasic, setShowBasic] = useState(false);
  const [showSizes, setShowSizes] = useState({ sm: false, md: false, lg: false, xl: false });
  const [showCentered, setShowCentered] = useState(false);
  const [showStatic, setShowStatic] = useState(false);
  const [showNoKeyboard, setShowNoKeyboard] = useState(false);
  const [showScrollable, setShowScrollable] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Pruebas de Modal</h1>

      {/* Ejemplo 1: Modal básico */}
      <section className="mb-5">
        <h2>1. Modal Básico</h2>
        <Button variant="primary" onClick={() => setShowBasic(true)}>
          Abrir Modal Básico
        </Button>

        <Modal show={showBasic} onHide={() => setShowBasic(false)}>
          <ModalHeader closeButton>
            <ModalTitle>Modal Básico</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Este es un modal básico con contenido simple.</p>
            <p>Puedes cerrarlo haciendo click en:</p>
            <ul>
              <li>El botón X</li>
              <li>El fondo oscuro (backdrop)</li>
              <li>Presionando ESC</li>
              <li>El botón Cerrar del footer</li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setShowBasic(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={() => setShowBasic(false)}>
              Guardar cambios
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      <hr />

      {/* Ejemplo 2: Diferentes tamaños */}
      <section className="mb-5">
        <h2>2. Diferentes Tamaños</h2>
        <div className="d-flex gap-2 flex-wrap">
          <Button variant="primary" onClick={() => setShowSizes({ ...showSizes, sm: true })}>
            Pequeño (sm)
          </Button>
          <Button variant="primary" onClick={() => setShowSizes({ ...showSizes, md: true })}>
            Normal (md)
          </Button>
          <Button variant="primary" onClick={() => setShowSizes({ ...showSizes, lg: true })}>
            Grande (lg)
          </Button>
          <Button variant="primary" onClick={() => setShowSizes({ ...showSizes, xl: true })}>
            Extra Grande (xl)
          </Button>
        </div>

        {/* Modal sm */}
        <Modal show={showSizes.sm} onHide={() => setShowSizes({ ...showSizes, sm: false })} size="sm">
          <ModalHeader closeButton>
            <ModalTitle>Modal Pequeño</ModalTitle>
          </ModalHeader>
          <ModalBody>
            Este es un modal pequeño (sm)
          </ModalBody>
        </Modal>

        {/* Modal md */}
        <Modal show={showSizes.md} onHide={() => setShowSizes({ ...showSizes, md: false })} size="md">
          <ModalHeader closeButton>
            <ModalTitle>Modal Normal</ModalTitle>
          </ModalHeader>
          <ModalBody>
            Este es un modal de tamaño normal (md)
          </ModalBody>
        </Modal>

        {/* Modal lg */}
        <Modal show={showSizes.lg} onHide={() => setShowSizes({ ...showSizes, lg: false })} size="lg">
          <ModalHeader closeButton>
            <ModalTitle>Modal Grande</ModalTitle>
          </ModalHeader>
          <ModalBody>
            Este es un modal grande (lg), ideal para formularios más complejos o contenido extenso.
          </ModalBody>
        </Modal>

        {/* Modal xl */}
        <Modal show={showSizes.xl} onHide={() => setShowSizes({ ...showSizes, xl: false })} size="xl">
          <ModalHeader closeButton>
            <ModalTitle>Modal Extra Grande</ModalTitle>
          </ModalHeader>
          <ModalBody>
            Este es un modal extra grande (xl), perfecto para dashboards o vistas detalladas.
          </ModalBody>
        </Modal>
      </section>

      <hr />

      {/* Ejemplo 3: Modal centrado */}
      <section className="mb-5">
        <h2>3. Modal Centrado Verticalmente</h2>
        <Button variant="primary" onClick={() => setShowCentered(true)}>
          Abrir Modal Centrado
        </Button>

        <Modal show={showCentered} onHide={() => setShowCentered(false)} centered>
          <ModalHeader closeButton>
            <ModalTitle>Modal Centrado</ModalTitle>
          </ModalHeader>
          <ModalBody>
            Este modal está centrado verticalmente en la pantalla.
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={() => setShowCentered(false)}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      <hr />

      {/* Ejemplo 4: Backdrop static */}
      <section className="mb-5">
        <h2>4. Backdrop Static (No cierra al hacer click fuera)</h2>
        <Button variant="warning" onClick={() => setShowStatic(true)}>
          Abrir Modal Static
        </Button>

        <Modal show={showStatic} onHide={() => setShowStatic(false)} backdrop="static">
          <ModalHeader closeButton>
            <ModalTitle>Modal con Backdrop Static</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Este modal NO se cierra al hacer click en el fondo oscuro.</p>
            <p>Solo puedes cerrarlo con:</p>
            <ul>
              <li>El botón X</li>
              <li>La tecla ESC</li>
              <li>Los botones del footer</li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setShowStatic(false)}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      <hr />

      {/* Ejemplo 5: Sin teclado (ESC no cierra) */}
      <section className="mb-5">
        <h2>5. Sin Teclado (ESC no cierra)</h2>
        <Button variant="warning" onClick={() => setShowNoKeyboard(true)}>
          Abrir Modal sin ESC
        </Button>

        <Modal show={showNoKeyboard} onHide={() => setShowNoKeyboard(false)} keyboard={false}>
          <ModalHeader closeButton>
            <ModalTitle>Modal sin Teclado</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>La tecla ESC NO cierra este modal.</p>
            <p>Útil para procesos críticos donde no quieres que el usuario cierre accidentalmente.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={() => setShowNoKeyboard(false)}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      <hr />

      {/* Ejemplo 6: Modal scrollable */}
      <section className="mb-5">
        <h2>6. Modal con Scroll Interno</h2>
        <Button variant="primary" onClick={() => setShowScrollable(true)}>
          Abrir Modal Scrollable
        </Button>

        <Modal show={showScrollable} onHide={() => setShowScrollable(false)} scrollable>
          <ModalHeader closeButton>
            <ModalTitle>Modal con Scroll</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Este modal tiene scroll interno cuando el contenido es muy largo.</p>
            {Array.from({ length: 30 }, (_, i) => (
              <p key={i}>Línea {i + 1} de contenido largo para demostrar el scroll.</p>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={() => setShowScrollable(false)}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      <hr />

      {/* Ejemplo 7: Modal fullscreen */}
      <section className="mb-5">
        <h2>7. Modal Fullscreen</h2>
        <Button variant="primary" onClick={() => setShowFullscreen(true)}>
          Abrir Modal Fullscreen
        </Button>

        <Modal show={showFullscreen} onHide={() => setShowFullscreen(false)} fullscreen>
          <ModalHeader closeButton>
            <ModalTitle>Modal Fullscreen</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Este modal ocupa toda la pantalla.</p>
            <p>Ideal para vistas complejas o editores.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={() => setShowFullscreen(false)}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      <hr />

      {/* Ejemplo 8: Formulario en modal */}
      <section className="mb-5">
        <h2>8. Formulario en Modal</h2>
        <Button variant="success" onClick={() => setShowForm(true)}>
          Agregar Producto
        </Button>

        <FormModal show={showForm} onHide={() => setShowForm(false)} />
      </section>

      <hr />

      {/* Ejemplo 9: Confirmación */}
      <section className="mb-5">
        <h2>9. Modal de Confirmación</h2>
        <Button variant="danger" onClick={() => setShowConfirm(true)}>
          Eliminar Producto
        </Button>

        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
          <ModalHeader closeButton>
            <ModalTitle>Confirmar Eliminación</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>¿Estás seguro de que quieres eliminar este producto?</p>
            <p className="text-danger mb-0">Esta acción no se puede deshacer.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancelar
            </Button>
            <Button 
              variant="danger" 
              onClick={() => {
                alert('Producto eliminado');
                setShowConfirm(false);
              }}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </Modal>
      </section>
    </Container>
  );
}

// Componente auxiliar: Modal con formulario
function FormModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Guardando:', formData);
    alert('Producto guardado: ' + formData.nombre);
    onHide();
    setFormData({ nombre: '', precio: '', stock: '' });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <ModalHeader closeButton>
        <ModalTitle>Agregar Nuevo Producto</ModalTitle>
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <FormField
            label="Nombre del Producto"
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
          <FormField
            label="Precio"
            type="number"
            value={formData.precio}
            onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
            required
          />
          <FormField
            label="Stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            required
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar Producto
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default TestModal;
