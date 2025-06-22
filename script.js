// Loading Animation
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles');
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
        this.container.appendChild(particle);
        this.particles.push(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
            }
        }, 8000);
    }

    animate() {
        setInterval(() => {
            if (this.particles.length < 50) {
                this.createParticle();
            }
        }, 300);
    }
}

// Initialize particle system
const particleSystem = new ParticleSystem();

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Scroll reveal animation
function revealElements() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealElements);

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced hover effects for service items
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Gallery image lightbox effect
document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', function() {
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const img_clone = this.cloneNode();
        img_clone.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        `;
        
        lightbox.appendChild(img_clone);
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', function() {
            document.body.removeChild(lightbox);
        });
        
        // Fade in effect
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.transition = 'opacity 0.3s ease';
            lightbox.style.opacity = '1';
        }, 10);
    });
});

// Interactive background elements
function createFloatingElement() {
    const element = document.createElement('div');
    element.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: linear-gradient(45deg, #a87e6f, #8c6a5d);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.3;
        animation: float 12s infinite linear;
    `;
    
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 12 + 's';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, 12000);
}

// Create floating elements periodically
setInterval(createFloatingElement, 2000);

// Form enhancement with better validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(168, 126, 111, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state to button
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = '送信中...';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #a87e6f, #8c6a5d);
                color: white;
                padding: 20px 40px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10000;
                text-align: center;
                font-size: 1.1em;
            `;
            successMessage.textContent = 'お問い合わせありがとうございます！';
            
            document.body.appendChild(successMessage);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 3000);
            
            // Reset form
            this.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    });
}

// Initialize reveal animation on page load
document.addEventListener('DOMContentLoaded', function() {
    revealElements();
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Apply typing effect to hero subtitle after loading
setTimeout(() => {
    const heroP = document.querySelector('.hero p');
    if (heroP) {
        const originalText = heroP.textContent;
        typeWriter(heroP, originalText, 30);
    }
}, 2000);