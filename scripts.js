document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

let currentIndex = 0; // Declaração única da variável
const images = document.querySelectorAll('.thumb-container img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const container = document.querySelector('.thumb-container');

// Atualiza a classe "active" para destacar a imagem no centro
function updateCarousel() {
    images.forEach((img, index) => {
        img.classList.remove('active');
        if (index === currentIndex) {
            img.classList.add('active');
        }
    });

    // Move o container suavemente
    const offset = -currentIndex * (images[0].offsetWidth + 20);
    container.style.transform = `translateX(${offset}px)`;
}

// Navegar para a esquerda
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateCarousel();
});

// Navegar para a direita
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

// Autoplay (desligado ao passar o mouse)
let autoplay = setInterval(() => {
    nextButton.click();
}, 3000);

container.addEventListener('mouseover', () => clearInterval(autoplay));
container.addEventListener('mouseout', () => {
    autoplay = setInterval(() => {
        nextButton.click();
    }, 3000);
});

// Inicializa o carrossel
updateCarousel();

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;

    document.body.setAttribute('data-parallax', true);
    document.body.style.backgroundPosition = `${x}% ${y}%`;
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');

document.querySelectorAll('.thumb-container img').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        captionText.innerHTML = img.alt || "Imagem do projeto";
    });
});

document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
});

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    document.querySelector('.carousel').style.transform = `translateX(-${currentIndex * 100}%)`;
}

window.onscroll = function() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progress-bar').style.width = scrollPercent + '%';
};

document.querySelectorAll('h1, h2').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.transition = 'transform 0.3s, color 0.3s';
        el.style.transform = 'scale(1.1)';
        el.style.color = '#4caf50';
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.color = 'inherit';
    });
});

// Detectar a rolagem e adicionar a classe "visible" aos elementos
const elements = document.querySelectorAll('.scroll-animate');

const handleScroll = () => {
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', handleScroll);
handleScroll(); // Verifica a posição inicial

// Mostrar a animação de carregamento até a página carregar
window.addEventListener('load', () => {
    document.getElementById('loading').style.visibility = 'hidden';
});

// Alterna entre modo claro e escuro dependendo do horário
const hour = new Date().getHours();
const body = document.body;

if (hour >= 18 || hour < 6) {
    body.classList.add('dark-mode');
} else {
    body.classList.remove('dark-mode');
}

// Permite ao usuário alternar manualmente
document.querySelector('.toggle-theme').addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});