document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initHoverEffects();
});

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.class-card, .criterion, .step');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('scroll-animate');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

function initHoverEffects() {
    const cards = document.querySelectorAll('.class-card, .criterion');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (card.classList.contains('class-card')) {
                this.style.transform = 'translateY(-8px)';
            } else if (card.classList.contains('criterion')) {
                this.style.transform = 'translateX(5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (card.classList.contains('class-card')) {
                this.style.transform = 'translateY(0)';
            } else if (card.classList.contains('criterion')) {
                this.style.transform = 'translateX(0)';
            }
        });
    });
}

function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            console.log('Image loaded successfully:', this.src);
        });
        
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            const fallback = document.createElement('div');
            fallback.innerHTML = 'JOIN UNION\'S AIRFORCE';
            fallback.style.cssText = `
                width: 460px;
                height: 230px;
                background: rgba(42, 42, 42, 0.8);
                border: 2px solid #3b82f6;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                color: #3b82f6;
                font-size: 2rem;
                margin: 0 auto;
                text-transform: uppercase;
                letter-spacing: 2px;
            `;
            this.parentNode.replaceChild(fallback, this);
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});



const airforceFacts = [
    "The name of the airbase is Airbase Injected, named after the former 1IC Injected (Dlmoroc).",
    "The Airforce is the current smallest TGRA division and is considered the hardest division to get into, as they have a low acceptance rate during tryouts, and ATC applications are considered incredibly difficult.",
    "During the early existence of the Union's Airforce, it was known to be one of the most elite divisions next to Spedsnaz in TGRA.",
    "The first-ever 1IC of the UAF was Areg considering he created this division.",
    "During patrols and supervised flights, any members of the UAF holding the rank of Officer Cadet or above may toggle a free plane spawn switch, which allows Junior Pilot and above to freely spawn planes. (There is also another button that destroys all planes, which is used when an Airforce event ends.)"
];

function showAirforceFact() {
    const randomIndex = Math.floor(Math.random() * airforceFacts.length);
    const fact = airforceFacts[randomIndex];
    
    const factNotification = document.createElement('div');
    factNotification.className = 'fact-notification';
    factNotification.innerHTML = `
        <div class="fact-header">Flight Intel</div>
        <div class="fact-content">${fact}</div>
        <div class="fact-close" onclick="this.parentElement.remove()">×</div>
    `;
    
    Object.assign(factNotification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(42, 42, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '300px',
        zIndex: '10000',
        fontSize: '0.9rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        transform: 'translateX(350px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif"
    });
    
    document.body.appendChild(factNotification);
    
    setTimeout(() => {
        factNotification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        factNotification.style.transform = 'translateX(350px)';
        setTimeout(() => {
            if (factNotification.parentElement) {
                factNotification.remove();
            }
        }, 400);
    }, 10000);
}

setInterval(showAirforceFact, 35000);

setTimeout(showAirforceFact, 20000);

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 120);
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
        
        setTimeout(() => {
            if (heroSubtitle) {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }
        }, 2200);
        
        setTimeout(() => {
            if (heroDescription) {
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }
        }, 2700);
    }
});

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#dc3545';
            
            setTimeout(() => {
                input.style.borderColor = '';
            }, 3000);
        }
    });
    
    return isValid;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const expensiveAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-viewport');
        } else {
            entry.target.classList.remove('in-viewport');
        }
    });
}, {
    rootMargin: '100px'
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        expensiveAnimationObserver.observe(section);
    });
});

console.log('Union\'s Airforce website loaded successfully');

window.UnionsAirforce = {
    smoothScrollTo,
    typeWriter,
    validateForm
};
