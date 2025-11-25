document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');

    // Si el carrusel existe en la página actual, inicializarlo.
    if (carousel) {
        const images = carousel.querySelectorAll('.carousel-img');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        
        let current = 0;
        let intervalId = null;

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        }

        function nextImage() {
            current = (current + 1) % images.length;
            showImage(current);
        }

        prevBtn.addEventListener('click', () => {
            current = (current - 1 + images.length) % images.length;
            showImage(current);
        });

        nextBtn.addEventListener('click', () => {
            nextImage();
        });

        function startAutoplay() {
            intervalId = setInterval(nextImage, 3000);
        }

        function stopAutoplay() {
            clearInterval(intervalId);
        }

        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Iniciar todo
        if (images.length > 0) {
            showImage(current);
            startAutoplay();
        }
    }
});
