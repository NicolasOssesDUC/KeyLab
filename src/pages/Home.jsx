import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, CardImg, Button } from '../ui';



function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  const carouselImages = [
    { src: '/assets/img/TecladoRedragon1.png', alt: 'Teclado 1' },
    { src: '/assets/img/TecladoDuckyOne2MiniFrozenLama.jpg', alt: 'Teclado 2' },
    { src: '/assets/img/TecladoAjjazAK820pro.webp', alt: 'Teclado 3' },
    { src: '/assets/img/bluehiragana1.webp', alt: 'Teclado 4' },
    { src: '/assets/img/Razer-BlackWidow-V4-Pro-Wired-Mechanical-PC-Gaming-Keyboard-Wrist-Rest-Chroma-RGB-Black_2a924a0f-da63-423e-acec-90b20cbbda78.b4de0d4d6e9d254aed7b22c21d5d562d.webp', alt: 'Teclado 5' },
    { src: '/assets/img/Razer-BlackWidow-V4-75-Hot-Swappable-Mechanical-Gaming-Keyboard-RGB-Chroma-Black_effe0aa5-8503-4285-9de7-e5bf74665895.5a5ae658a4ebf40dc56b3fa1c756aa72.webp', alt: 'Teclado 6' },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [carouselImages.length]);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };

  return (
  <>
    {/* Intro */}
    <section className="intro text-center py-5 mb-5">
      <h1>Bienvenido a KeyLab</h1>
      <p>Todo para tu próximo teclado</p>
    </section>

    {/* Carousel / Productos recientes */}
    <Container className="text-center py-5">
      <h2 className="mb-3">Productos recién llegados</h2>
      <div className="carousel d-flex align-items-center">
        <Button variant="primary" size="sm" onClick={handlePrev}>&#8592;</Button>

        <div className="carousel-inner mx-3">
          <Link to="/teclados">
            <Card>
              <CardImg src={carouselImages[currentImage].src} alt={carouselImages[currentImage].alt} className="carousel-img.active"/>
            </Card>
          </Link>
        </div>

        <Button variant="primary" size="sm" onClick={handleNext}>&#8594;</Button>
      </div>
    </Container>
  </>
);
}

export default Home;

