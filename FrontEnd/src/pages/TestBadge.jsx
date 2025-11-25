import { Container, Row, Col, Badge } from '../ui';

function TestBadge() {
  return (
    <Container className="py-5">
      <h1 className="mb-4">Pruebas del Componente Badge</h1>

      {/* Variantes básicas */}
      <Row className="mb-4">
        <Col>
          <h3>Variantes (colores)</h3>
          <div className="d-flex gap-2 flex-wrap">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="light">Light</Badge>
            <Badge variant="dark">Dark</Badge>
          </div>
        </Col>
      </Row>

      {/* Badge tipo pill (redondeado) */}
      <Row className="mb-4">
        <Col>
          <h3>Badge Pill (redondeado)</h3>
          <div className="d-flex gap-2 flex-wrap">
            <Badge variant="primary" pill>1</Badge>
            <Badge variant="secondary" pill>2</Badge>
            <Badge variant="success" pill>3</Badge>
            <Badge variant="danger" pill>99+</Badge>
          </div>
        </Col>
      </Row>

      {/* Uso práctico en títulos */}
      <Row className="mb-4">
        <Col>
          <h3>Uso en títulos y encabezados</h3>
          <h4>
            Productos <Badge variant="secondary" pill>14</Badge>
          </h4>
          <h5>
            Notificaciones <Badge variant="danger" pill>5</Badge>
          </h5>
        </Col>
      </Row>

      {/* Casos de uso reales */}
      <Row className="mb-4">
        <Col>
          <h3>Casos de uso en e-commerce</h3>
          <div className="d-flex gap-2 flex-wrap align-items-center">
            <span>Producto:</span>
            <Badge variant="success">Disponible</Badge>
            <Badge variant="info">Nuevo</Badge>
            <Badge variant="warning">Última unidad</Badge>
            <Badge variant="danger">Agotado</Badge>
            <Badge variant="primary">Oferta</Badge>
          </div>
        </Col>
      </Row>

      {/* Props personalizadas bg y text */}
      <Row className="mb-4">
        <Col>
          <h3>Colores personalizados (bg y text)</h3>
          <div className="d-flex gap-2 flex-wrap">
            <Badge bg="success" text="white">bg=success text=white</Badge>
            <Badge bg="warning" text="dark">bg=warning text=dark</Badge>
            <Badge bg="danger" text="white">bg=danger text=white</Badge>
          </div>
        </Col>
      </Row>

      {/* En botones y otros componentes */}
      <Row className="mb-4">
        <Col>
          <h3>Badges en contexto</h3>
          <button className="btn btn-primary me-2">
            Mensajes <Badge bg="light" text="dark" pill>4</Badge>
          </button>
          <button className="btn btn-secondary me-2">
            Alertas <Badge bg="danger" pill>12</Badge>
          </button>
          <button className="btn btn-success">
            Carritos <Badge bg="light" text="dark" pill>2</Badge>
          </button>
        </Col>
      </Row>

      {/* Tamaños de texto */}
      <Row className="mb-4">
        <Col>
          <h3>Con diferentes tamaños de texto</h3>
          <div className="d-flex flex-column gap-3">
            <div>
              <span className="fs-1">Título grande</span>{' '}
              <Badge variant="primary" className="fs-6">Badge</Badge>
            </div>
            <div>
              <span className="fs-3">Subtítulo</span>{' '}
              <Badge variant="success" className="fs-6">Badge</Badge>
            </div>
            <div>
              <span>Texto normal</span>{' '}
              <Badge variant="danger">Badge</Badge>
            </div>
          </div>
        </Col>
      </Row>

    </Container>
  );
}

export default TestBadge;
