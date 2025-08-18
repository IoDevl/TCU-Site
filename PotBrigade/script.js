document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initHoverEffects();
    initClickEffects();
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

    const animatedElements = document.querySelectorAll('.info-card, .class-card, .loadout-item, .req-item, .class-req-item');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('scroll-animate');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

function initHoverEffects() {
    const cards = document.querySelectorAll('.class-card, .info-card, .loadout-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
}

function initClickEffects() {
    const clickableItems = document.querySelectorAll('.loadout-item, .info-card');
    
    clickableItems.forEach(item => {
        item.addEventListener('click', function() {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(74, 124, 89, 0.3)';
            ripple.style.pointerEvents = 'none';
            ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            
            const originalPosition = this.style.position;
            if (getComputedStyle(this).position === 'static') {
                this.style.position = 'relative';
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.transform = 'translate(-50%, -50%) scale(2)';
                ripple.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                ripple.remove();
                if (originalPosition) {
                    this.style.position = originalPosition;
                } else if (this.style.position === 'relative') {
                    this.style.position = '';
                }
            }, 600);
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
            fallback.innerHTML = 'JOIN POT BRIGADE';
            fallback.style.cssText = `
                width: 520px;
                height: 260px;
                background: rgba(42, 42, 42, 0.8);
                border: 2px solid #6b8e23;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                color: #6b8e23;
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

document.addEventListener('DOMContentLoaded', function() {
    const classReqItems = document.querySelectorAll('.class-req-item');
    
    classReqItems.forEach(item => {
        item.addEventListener('click', function() {
            classReqItems.forEach(i => i.classList.remove('active'));
            
            this.classList.add('active');
            
            const originalBorder = this.style.borderColor;
            this.style.borderColor = '#6b8e23';
            this.style.boxShadow = '0 0 15px rgba(107, 142, 35, 0.5)';
            
            setTimeout(() => {
                this.style.borderColor = originalBorder;
                this.style.boxShadow = '';
                this.classList.remove('active');
            }, 2000);
        });
    });
});

const brigadeFacts = [
    "Pot Brigade members can target any division except themselves, resulting in accidental RK.",
    "Pot Brigade is the '𝓯𝓻𝓮𝓪𝓴𝓲𝓮𝓼𝓽' division in The Computer Union (which usually results in being annoying to everyone and extremely immature but also very cool.)",
    "Pots were supposed to be enemies of the former Spetsnaz, but since they were disbanded, everyone has been left with a gap that's been trying to be filled with the Pot Brigade, although it has many flaws in doing so.",
    "Probably one of the most controversial divisions due to its big history (not now, but if you gather up all the things that happened, it's quite a big pile). They're okay now.)", 
    "Unknown why they have pots on their heads! Although they're not glued. With the recent city update, they can take the pot off their head and hit you with it, resulting in the same effect the fish has, although playing a loud metal-clank noise and taking 40% (approximate) of the player's health.",
    "The second biggest division, the first one being TGRA.",
    "The second Biggest rkilling division, the first one being TGRA."
];

function showBrigadeFact() {
    const randomIndex = Math.floor(Math.random() * brigadeFacts.length);
    const fact = brigadeFacts[randomIndex];
    
    const factNotification = document.createElement('div');
    factNotification.className = 'fact-notification';
    factNotification.innerHTML = `
        <div class="fact-header">Trivia</div>
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
        border: '1px solid rgba(107, 142, 35, 0.3)',
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

setInterval(showBrigadeFact, 30000);

setTimeout(showBrigadeFact, 15000);

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
        }, 1800);
        
        setTimeout(() => {
            if (heroDescription) {
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }
        }, 2300);
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

console.log('Pot Brigade website loaded successfully');

window.PotBrigade = {
    smoothScrollTo,
    typeWriter,
    validateForm
};