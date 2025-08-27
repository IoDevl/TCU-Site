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

    const animatedElements = document.querySelectorAll('.rank-category, .weapon-card, .benefit-item, .rank-item, .fm-item');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('scroll-animate');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

function initHoverEffects() {
    const cards = document.querySelectorAll('.weapon-card, .rank-category, .benefit-item, .field-marshals-section');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
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
            fallback.innerHTML = 'JOIN TGRA';
            fallback.style.cssText = `
                width: 520px;
                height: 260px;
                background: rgba(47, 47, 47, 0.9);
                border: 2px solid #78887a;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                color: #78887a;
                font-size: 2rem;
                margin: 0 auto;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-family: 'JetBrains Mono', monospace;
            `;
            this.parentNode.replaceChild(fallback, this);
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
        
        setTimeout(() => {
            if (heroSubtitle) {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }
        }, 2000);
        
        setTimeout(() => {
            if (heroDescription) {
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }
        }, 2500);
    }
});

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

const tgraFacts = [
    "Unlike Ranks 1 and 6, Ranks 2-5 are designated in Russian. Their English translations, in order, are: Corporal, Sergeant, Senior Sergeant, Sergeant First Class.",
    "Rank 1 Troops may be viewed as incompetent due to their limited experience and tendency towards disobedience.",
    "An invisible barrier prevents individuals of Ranks 1-5 from entering the village. This barrier does not affect Rank 6 and higher, who can enter the village without restriction.",
    "It is recommended to follow advice from officers and division soldiers (like the Pot Brigade, Bulldog Brigade, and Union Guards).",
    "It is recommended to join a server with higher-ups if passing the border is a need, as Rank 1 Troops will usually kill people for no apparent reason.",
    "Join a division for being a higher rank and commanding troops, and kill them if they break border rules and laws.",
    "If someone is killed multiple times by a soldier without reason, the guard violation must be reported at CGB or to the officers (in Papers Pls server, division soldiers can be asked to watch the RKers and division officers to kick RKers)."
];

function showTGRAFact() {
    const randomIndex = Math.floor(Math.random() * tgraFacts.length);
    const fact = tgraFacts[randomIndex];
    
    const factNotification = document.createElement('div');
    factNotification.className = 'fact-notification';
    factNotification.innerHTML = `
        <div class="fact-header">TGRA Intel</div>
        <div class="fact-content">${fact}</div>
        <div class="fact-close" onclick="this.parentElement.remove()">×</div>
    `;
    
    Object.assign(factNotification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(47, 47, 47, 0.95)',
        backdropFilter: 'blur(20px)',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '320px',
        zIndex: '10000',
        fontSize: '0.9rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(120, 136, 122, 0.4)',
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
    }, 12000);
}

setInterval(showTGRAFact, 35000);
setTimeout(showTGRAFact, 20000);

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

document.addEventListener('DOMContentLoaded', function() {
    const rankItems = document.querySelectorAll('.rank-item');
    
    rankItems.forEach(item => {
        item.addEventListener('click', function() {
            rankItems.forEach(i => i.classList.remove('active'));
            
            this.classList.add('active');
            
            const originalBorder = this.style.borderLeftColor;
            this.style.borderLeftColor = '#78887a';
            this.style.boxShadow = '0 0 15px rgba(120, 136, 122, 0.5)';
            
            setTimeout(() => {
                this.style.borderLeftColor = originalBorder;
                this.style.boxShadow = '';
                this.classList.remove('active');
            }, 2000);
        });
    });
});

console.log('The Glorious Robot Army website loaded successfully - готов к службе!');

window.TGRA = {
    smoothScrollTo,
    typeWriter,
    validateForm,
    showTGRAFact
};
