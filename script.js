// Navegación suave y efectos de scroll
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.getElementById('contactForm');

    // Toggle menu mobile
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menu mobile al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Efecto de scroll en la navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Navegación activa basada en scroll
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Animaciones de scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .demo-card, .tech-category, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animación de las estadísticas
    function animateStats() {
        const stats = document.querySelectorAll('.stat h3');
        
        stats.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            const duration = 2000; // 2 segundos
            const increment = finalValue / (duration / 16); // 60fps
            let currentValue = 0;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue) + '+';
                }
            }, 16);
        });
    }

    // Observer para las estadísticas
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }

    // Efecto de escritura para el título principal
    function typewriterEffect() {
        const titleElement = document.querySelector('.hero-title .highlight');
        if (!titleElement) return;
        
        const text = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.borderRight = '2px solid #FFD700';
        
        let i = 0;
        const timer = setInterval(() => {
            titleElement.textContent += text[i];
            i++;
            
            if (i === text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    titleElement.style.borderRight = 'none';
                }, 500);
            }
        }, 100);
    }

    // Iniciar efecto de escritura después de un breve delay
    setTimeout(typewriterEffect, 1000);

    // Manejo del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Simulación de envío
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = '¡Mensaje Enviado!';
                submitBtn.style.background = '#10B981';
                
                // Resetear formulario
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }

    // Efecto parallax para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Smooth scroll para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto hover para las cards de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
        });
    });

    // Efecto de partículas en el background del hero (opcional)
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }

    // CSS para la animación de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: white;
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                padding: 2rem 0;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Crear partículas (comentado por defecto para mejor rendimiento)
    // createParticles();

    // Funcionalidad para los filtros de tecnologías (opcional)
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Lazy loading para imágenes (si hay más imágenes)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Efecto de scroll suave para toda la página
    if (CSS.supports('scroll-behavior', 'smooth')) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    // Mostrar un mensaje de bienvenida en la consola
    console.log(`
    🚀 ¡Bienvenido a mi portafolio!
    
    Desarrollado con:
    • HTML5 semántico
    • CSS3 moderno con variables y grid
    • JavaScript vanilla para interactividad
    • Diseño responsivo y accesible
    
    ¿Te interesa colaborar? ¡Contáctame!
    `);
});

// Función para actualizar el año en el footer automáticamente
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-content p');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} Jonathan Pierre Reyna Rossel. Todos los derechos reservados.`;
    }
}

// Llamar la función al cargar la página
document.addEventListener('DOMContentLoaded', updateCopyrightYear);