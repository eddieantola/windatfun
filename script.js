document.addEventListener('DOMContentLoaded', function() {

    // --- 1. GESTIONE CAROSELLO HERO CON LOOP INFINITO ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const images = carouselContainer.querySelectorAll('img');
        const numImages = images.length;
        let currentIndex = 0;

        if (numImages > 1) {
            const firstImageClone = images[0].cloneNode(true);
            carouselContainer.appendChild(firstImageClone);
            carouselContainer.style.width = `${(numImages + 1) * 100}vw`;

            function slide() {
                currentIndex++;
                carouselContainer.style.transition = 'transform 0.5s ease-in-out';
                const translateX = -currentIndex * 100;
                carouselContainer.style.transform = `translateX(${translateX}vw)`;
            }

            let slideInterval = setInterval(slide, 5000);

            carouselContainer.addEventListener('transitionend', () => {
                if (currentIndex >= numImages) {
                    carouselContainer.style.transition = 'none';
                    currentIndex = 0;
                    carouselContainer.style.transform = 'translateX(0)';
                }
            });
        }
    }


    // --- 2. PREPARAZIONE PER LO SCORRIMENTO INFINITO DELLE RIGHE DI IMMAGINI ---
    const scrollingRows = document.querySelectorAll('.scrolling-row');
    scrollingRows.forEach(row => {
        // Duplica tutto il contenuto della riga per creare un loop senza interruzioni
        const content = row.innerHTML;
        row.innerHTML += content;
    });


    // --- 3. GESTIONE ANIMAZIONI FADE-IN ALLO SCORRIMENTO DELLE SEZIONI ---
    const animatedElements = document.querySelectorAll('.scroll-animation');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});