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
        const content = row.innerHTML;
        // MODIFICA: Duplica il contenuto 2 volte invece di 1
        row.innerHTML += content + content;
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

//gestione header dinamico per disp mobile

const header = document.querySelector('header');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
    // Aggiunge la classe .header-scrolled quando si scorre oltre la sezione hero
    if (window.scrollY > heroSection.offsetHeight) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});