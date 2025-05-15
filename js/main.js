/**
 * NAVEGACIÓN Y EFECTOS PRINCIPALES
 */
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Estado del menú
    let menuOpen = false;

    // Función para alternar menú móvil
    const toggleMenu = () => {
        menuOpen = !menuOpen;
        navLinks.classList.toggle('active');
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        toggle.setAttribute('aria-expanded', menuOpen);
    };

    // Event Listeners
    toggle.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) toggleMenu();
        });
    });
});

/**
 * EFECTO MÁQUINA DE ESCRIBIR
 */
const typeWriter = () => {
    const element = document.querySelector('.typing-effect');
    if (!element) return;

    const phrases = [
        "Estudiante de Desarrollo Web", 
        "Backend Developer", 
        "Apasionado por la tecnología"
    ];
    let currentPhrase = 0;
    let charIndex = 0;
    let isDeleting = false;
    const cursor = '<span class="cursor">|</span>';

    const type = () => {
        const fullTxt = phrases[currentPhrase];
        
        if (isDeleting) {
            element.innerHTML = fullTxt.substring(0, charIndex - 1) + cursor;
            charIndex--;
        } else {
            element.innerHTML = fullTxt.substring(0, charIndex + 1) + cursor;
            charIndex++;
        }

        if (!isDeleting && charIndex === fullTxt.length) {
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    };

    setTimeout(type, 1000);
};

// Iniciar efectos
document.addEventListener('DOMContentLoaded', typeWriter);