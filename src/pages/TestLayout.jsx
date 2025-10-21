import { Container, Row, Col } from '../ui/Layout';

function TestLayout() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <Container>
        <h1>Test Layout Components</h1>
        
        <h2 className="mt-4">Container Normal</h2>
        <Row>
          <Col md={4}>
            <div className="bg-primary text-white p-3">Col 1 (md=4)</div>
          </Col>
          <Col md={4}>
            <div className="bg-success text-white p-3">Col 2 (md=4)</div>
          </Col>
          <Col md={4}>
            <div className="bg-danger text-white p-3">Col 3 (md=4)</div>
          </Col>
        </Row>

        <h2 className="mt-4">Columnas Responsivas</h2>
        <Row>
          <Col xs={12} md={6} lg={3}>
            <div className="bg-info text-white p-3 mb-2">xs=12 md=6 lg=3</div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="bg-warning text-white p-3 mb-2">xs=12 md=6 lg=3</div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="bg-secondary text-white p-3 mb-2">xs=12 md=6 lg=3</div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="bg-dark text-white p-3 mb-2">xs=12 md=6 lg=3</div>
          </Col>
        </Row>
      </Container>

      <h2 className="mt-4 text-center">Container Fluid</h2>
      <Container fluid>
        <Row>
          <Col>
            <div className="bg-primary text-white p-3">Container Fluid - Full Width</div>
          </Col>
        </Row>
      </Container>

      <Container>
        <h2 className="mt-4">Columnas Automáticas</h2>
        <Row>
          <Col>
            <div className="bg-success text-white p-3">Auto Col 1</div>
          </Col>
          <Col>
            <div className="bg-danger text-white p-3">Auto Col 2</div>
          </Col>
          <Col>
            <div className="bg-warning text-white p-3">Auto Col 3</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TestLayout;
