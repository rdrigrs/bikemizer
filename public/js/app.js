// Funcionalidades adicionais da aplicação
class BikeMizerApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupMobileMenu();
        this.loadSampleGallery();
    }

    setupSmoothScrolling() {
        // Navegação suave para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupAnimations() {
        // Animações de entrada para elementos
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        document.querySelectorAll('.feature, .gallery-item, .panel-section').forEach(el => {
            observer.observe(el);
        });
    }

    setupMobileMenu() {
        // Menu mobile responsivo
        const nav = document.querySelector('.nav');
        const header = document.querySelector('.header');
        
        // Adicionar botão de menu mobile
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;

        header.querySelector('.container').appendChild(mobileMenuBtn);

        // Toggle do menu mobile
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
        });

        // Fechar menu ao clicar em um link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-open');
            });
        });

        // Media query para mobile
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        function handleMobileChange(e) {
            if (e.matches) {
                mobileMenuBtn.style.display = 'block';
                nav.style.cssText = `
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: #667eea;
                    flex-direction: column;
                    padding: 1rem;
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    pointer-events: none;
                `;
            } else {
                mobileMenuBtn.style.display = 'none';
                nav.style.cssText = '';
                nav.classList.remove('mobile-open');
            }
        }

        mediaQuery.addListener(handleMobileChange);
        handleMobileChange(mediaQuery);

        // Adicionar classe para menu mobile aberto
        mobileMenuBtn.addEventListener('click', () => {
            if (nav.classList.contains('mobile-open')) {
                nav.style.transform = 'translateY(0)';
                nav.style.opacity = '1';
                nav.style.pointerEvents = 'auto';
            } else {
                nav.style.transform = 'translateY(-100%)';
                nav.style.opacity = '0';
                nav.style.pointerEvents = 'none';
            }
        });
    }

    loadSampleGallery() {
        // Carregar exemplos na galeria
        const sampleBikes = [
            {
                name: 'Bicicleta Road Vermelha',
                color: '#ff0000',
                stickers: 2,
                type: 'road'
            },
            {
                name: 'Bicicleta Mountain Azul',
                color: '#0000ff',
                stickers: 1,
                type: 'mountain'
            },
            {
                name: 'Bicicleta City Verde',
                color: '#00ff00',
                stickers: 3,
                type: 'city'
            }
        ];

        const galleryGrid = document.getElementById('galleryGrid');
        
        sampleBikes.forEach(bike => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            // Criar canvas para preview
            const canvas = document.createElement('canvas');
            canvas.width = 300;
            canvas.height = 200;
            const ctx = canvas.getContext('2d');
            
            // Desenhar preview simples
            this.drawSampleBike(ctx, bike, 300, 200);
            
            const img = document.createElement('img');
            img.src = canvas.toDataURL();
            img.alt = bike.name;
            
            const content = document.createElement('div');
            content.className = 'gallery-item-content';
            content.innerHTML = `
                <h4>${bike.name}</h4>
                <p>Cor: ${bike.color}</p>
                <p>Adesivos: ${bike.stickers}</p>
            `;
            
            galleryItem.appendChild(img);
            galleryItem.appendChild(content);
            galleryGrid.appendChild(galleryItem);
        });
    }

    drawSampleBike(ctx, bike, width, height) {
        // Background
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, width, height);
        
        // Bicicleta simplificada
        ctx.fillStyle = bike.color;
        ctx.fillRect(width/2 - 40, height/2 - 20, 80, 40);
        
        // Adesivos
        for (let i = 0; i < bike.stickers; i++) {
            ctx.fillStyle = '#ffd700';
            ctx.fillText('★', width/2 + (i - bike.stickers/2) * 20, height/2);
        }
    }
}

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
    new BikeMizerApp();
});

// Adicionar estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .feature, .gallery-item, .panel-section {
        opacity: 0;
        transform: translateY(30px);
    }

    .mobile-menu-btn {
        display: none;
    }

    @media (max-width: 768px) {
        .nav.mobile-open {
            transform: translateY(0) !important;
            opacity: 1 !important;
            pointer-events: auto !important;
        }
    }
`;
document.head.appendChild(style); 