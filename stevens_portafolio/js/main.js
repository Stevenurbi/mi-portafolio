/**
 * NAVEGACIÓN Y EFECTOS PRINCIPALES
 */
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Crea el indicador dinámico
    const indicator = document.createElement('div');
    indicator.className = 'nav-indicator';
    navLinks.appendChild(indicator);

    // Estado del menú
    let menuOpen = false;

    // Función para actualizar el indicador
    const updateIndicator = (element) => {
        indicator.style.width = `${element.offsetWidth}px`;
        indicator.style.left = `${element.offsetLeft}px`;
        navItems.forEach(item => item.classList.remove('active'));
        element.classList.add('active');
    };

    // Función para alternar menú móvil
    const toggleMenu = () => {
        menuOpen = !menuOpen;
        navLinks.classList.toggle('active');
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        toggle.setAttribute('aria-expanded', menuOpen);
    };

    // Scroll Spy
    const handleScroll = () => {
        if (menuOpen) return;
        
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            if (item.getAttribute('href') === `#${currentSection}`) {
                updateIndicator(item);
            }
        });
    };

    // Event Listeners
    toggle.addEventListener('click', toggleMenu);
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            updateIndicator(e.target);
            if (menuOpen) toggleMenu();
            
            document.querySelector(e.target.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
        const activeItem = document.querySelector('.nav-link.active');
        if (activeItem) updateIndicator(activeItem);
    });

    // Inicialización
    updateIndicator(document.querySelector('.nav-link.active') || navItems[0]);
});

/**
 * EFECTO MÁQUINA DE ESCRIBIR
 */
const typeWriter = () => {
    const phrases = [
        "Estudiante de Desarrollo Web", 
        "Backend Developer", 
        "Apasionado por la tecnología"
    ];
    let currentPhrase = 0;
    let charIndex = 0;
    let isDeleting = false;
    const element = document.querySelector('.typing-effect');
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