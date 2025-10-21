import { Container, Row, Col } from '../ui/Layout';
import { Card, CardHeader, CardBody, CardTitle, CardText, CardFooter, CardImg } from '../ui/Card';
import Button from '../ui/Button';

function TestCard() {
  return (
    <div style={{ paddingTop: '80px', paddingBottom: '40px' }}>
      <Container>
        <h1 className="mb-4">Test Card Components</h1>

        {/* Card Simple */}
        <h2 className="mt-4 mb-3">1. Card Simple</h2>
        <Row>
          <Col md={4}>
            <Card>
              <CardBody>
                <CardTitle>Card Simple</CardTitle>
                <CardText>
                  Esta es una card básica sin sombra ni elementos extras.
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card shadow>
              <CardBody>
                <CardTitle>Card con Sombra</CardTitle>
                <CardText>
                  Esta card tiene la prop shadow=true para agregar profundidad.
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-primary">
              <CardBody>
                <CardTitle>Card con Clase Custom</CardTitle>
                <CardText>
                  Esta card tiene className adicional para borde azul.
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Card con Imagen */}
        <h2 className="mt-5 mb-3">2. Card con Imagen</h2>
        <Row>
          <Col md={4}>
            <Card shadow>
              <CardImg 
                variant="top" 
                src="/assets/img/teclado1.jpg" 
                alt="Teclado mecánico"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <CardBody>
                <CardTitle>Teclado Mecánico</CardTitle>
                <CardText>
                  Teclado profesional con switches Cherry MX Blue.
                </CardText>
                <Button variant="primary" size="sm">Ver detalles</Button>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card shadow>
              <CardImg 
                variant="top" 
                src="/assets/img/teclado2.jpg" 
                alt="Keycaps personalizadas"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <CardBody>
                <CardTitle>Keycaps RGB</CardTitle>
                <CardText>
                  Set completo de keycaps con iluminación RGB.
                </CardText>
                <Button variant="success" size="sm">Agregar al carrito</Button>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card shadow>
              <CardImg 
                variant="top" 
                src="/assets/img/teclado3.jpg" 
                alt="Switches mecánicos"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <CardBody>
                <CardTitle>Switches Premium</CardTitle>
                <CardText>
                  Pack de 100 switches mecánicos de alta calidad.
                </CardText>
                <Button variant="warning" size="sm">Comprar ahora</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Card Completa (Header + Body + Footer) */}
        <h2 className="mt-5 mb-3">3. Card Completa con Header y Footer</h2>
        <Row>
          <Col md={6}>
            <Card shadow>
              <CardHeader>
                <strong>Información del Producto</strong>
              </CardHeader>
              <CardBody>
                <CardTitle>Teclado Custom Build</CardTitle>
                <CardText>
                  Construye tu teclado ideal eligiendo cada componente:
                </CardText>
                <ul>
                  <li>Case de aluminio anodizado</li>
                  <li>PCB hot-swappable</li>
                  <li>Switches a elección</li>
                  <li>Keycaps PBT</li>
                </ul>
                <Button variant="primary">Personalizar</Button>
              </CardBody>
              <CardFooter className="text-muted">
                Envío gratis en compras sobre $50.000
              </CardFooter>
            </Card>
          </Col>

          <Col md={6}>
            <Card shadow>
              <CardHeader className="bg-primary text-white">
                <strong>Oferta Especial</strong>
              </CardHeader>
              <CardBody>
                <CardTitle>Pack Completo Gamer</CardTitle>
                <CardText>
                  Incluye todo lo que necesitas para tu setup:
                </CardText>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-decoration-line-through text-muted">$150.000</span>
                  <span className="h4 text-success mb-0">$99.990</span>
                </div>
                <Button variant="success" block>Aprovechar oferta</Button>
              </CardBody>
              <CardFooter className="bg-warning">
                <small>⏰ Oferta válida por 24 horas</small>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        {/* Card para Formularios */}
        <h2 className="mt-5 mb-3">4. Card para Formularios (estilo Login)</h2>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card shadow>
              <CardBody className="p-4">
                <CardTitle as="h3" className="text-center mb-4">
                  Iniciar Sesión
                </CardTitle>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" placeholder="ejemplo@correo.com" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" placeholder="••••••••" />
                  </div>
                  <Button variant="primary" block type="submit">
                    Entrar
                  </Button>
                  <div className="text-center mt-3">
                    <a href="#" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Card Horizontal */}
        <h2 className="mt-5 mb-3">5. Card con Layout Horizontal</h2>
        <Row>
          <Col md={8}>
            <Card shadow>
              <Row className="g-0">
                <Col md={4}>
                  <CardImg 
                    src="/assets/img/teclado1.jpg" 
                    alt="Producto destacado"
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                </Col>
                <Col md={8}>
                  <CardBody>
                    <CardTitle as="h4">Teclado TKL Premium</CardTitle>
                    <CardText>
                      Diseño compacto TKL (Tenkeyless) sin numpad, perfecto para gamers 
                      que necesitan más espacio para el mouse. Switches lineales ultra 
                      suaves y silenciosos.
                    </CardText>
                    <CardText>
                      <small className="text-muted">Última actualización: hace 3 minutos</small>
                    </CardText>
                    <div className="d-flex gap-2">
                      <Button variant="primary" size="sm">Ver más</Button>
                      <Button variant="outline" size="sm">Comparar</Button>
                    </div>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Cards en Grid de Productos */}
        <h2 className="mt-5 mb-3">6. Grid de Productos (3 columnas)</h2>
        <Row>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Col key={num} xs={12} sm={6} md={4} className="mb-4">
              <Card shadow className="h-100">
                <CardImg 
                  variant="top" 
                  src={`/assets/img/teclado${(num % 3) + 1}.jpg`}
                  alt={`Producto ${num}`}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <CardBody className="d-flex flex-column">
                  <CardTitle as="h6">Producto #{num}</CardTitle>
                  <CardText className="flex-grow-1">
                    Descripción breve del producto que se ajusta al espacio.
                  </CardText>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 mb-0 text-primary">${19990 + (num * 10000)}</span>
                    <Button variant="success" size="sm">
                      <i className="bi bi-cart-plus"></i> Agregar
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Card con diferentes títulos */}
        <h2 className="mt-5 mb-3">7. Títulos con diferentes tamaños (as prop)</h2>
        <Row>
          <Col md={4}>
            <Card>
              <CardBody>
                <CardTitle as="h3">Título H3</CardTitle>
                <CardText>Card con título grande (h3)</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <CardTitle as="h5">Título H5 (default)</CardTitle>
                <CardText>Card con título mediano (h5 - default)</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <CardTitle as="h6">Título H6</CardTitle>
                <CardText>Card con título pequeño (h6)</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default TestCard;
