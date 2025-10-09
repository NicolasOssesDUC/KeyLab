import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <main>
      <div className="intro">
        <h1>Bienvenido a KeyLab</h1>
        <p>Todo para tu proximo teclado</p>
      </div>

      <section className="productos-recientes">
        <h2>Productos recien llegados</h2>
        <div className="carousel">
          <button className="carousel-btn prev" onClick={handlePrev}>
            &#8592;
          </button>
          <div className="carousel-items">
            {carouselImages.map((img, index) => (
              <Link to="/teclados" key={index}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`carousel-img ${index === currentImage ? 'active' : ''}`}
                />
              </Link>
            ))}
          </div>
          <button className="carousel-btn next" onClick={handleNext}>
            &#8594;
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
