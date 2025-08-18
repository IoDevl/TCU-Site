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

    const animatedElements = document.querySelectorAll('.equipment-card, .rank-card, .req-item, .step');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('scroll-animate');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

function initHoverEffects() {
    const cards = document.querySelectorAll('.equipment-card, .rank-card, .equipment-item');
    
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
    // Click effects removed as requested
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
            fallback.innerHTML = 'JOIN INSPECTOR CORPS';
            fallback.style.cssText = `
                width: 520px;
                height: 260px;
                background: rgba(42, 42, 42, 0.8);
                border: 2px solid #CD853F;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                color: #CD853F;
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
    const rankCards = document.querySelectorAll('.rank-card');
    
    rankCards.forEach(card => {
        card.addEventListener('click', function() {
            rankCards.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            
            const originalBorder = this.style.borderColor;
            this.style.borderColor = '#CD853F';
            this.style.boxShadow = '0 0 15px rgba(205, 133, 63, 0.5)';
            
            setTimeout(() => {
                this.style.borderColor = originalBorder;
                this.style.boxShadow = '';
                this.classList.remove('active');
            }, 2000);
        });
    });
});

const inspectorFacts = [
    "Inspectors receive Rublex payment while they're actively inspecting at their booth.",
    "The Pokey Stick is exclusively available inside the inspection booth and can eliminate any personnel except fellow inspectors.",
    "Inspectors can use the !stopwatch command to track their quota progress and efficiency.",
    "The Inspector Corps was previously known as the 'Glorious Admission' before its current formation.",
    "Inspector tryouts are not scheduled regularly - they happen randomly, so stay alert for announcements!",
    "Advanced Inspectors and above can access areas behind border barriers that regular personnel cannot enter.",
    "Senior Inspectors have the authority to host their own small-scale tryouts with board supervision.",
    "The Inspector Key only opens booth doors and cannot be used for doors outside the border checkpoint.",
    "Experienced Inspectors receive a Tokarev weapon specifically for dealing with raiders.",
    "The free drink provided to inspectors heals exactly 1 HP per sip - a small but vital boost during long shifts."
];

function showInspectorFact() {
    const randomIndex = Math.floor(Math.random() * inspectorFacts.length);
    const fact = inspectorFacts[randomIndex];
    
    const factNotification = document.createElement('div');
    factNotification.className = 'fact-notification';
    factNotification.innerHTML = `
        <div class="fact-header">INSPECTOR INTEL</div>
        <div class="fact-content">${fact}</div>
        <div class="fact-close" onclick="this.parentElement.remove()">×</div>
    `;
    
    Object.assign(factNotification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(26, 26, 26, 0.95)',
        backdropFilter: 'blur(20px)',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '320px',
        zIndex: '10000',
        fontSize: '0.9rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(139, 69, 19, 0.4)',
        transform: 'translateX(350px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Roboto Mono', monospace"
    });
    
    // Style the header
    const header = factNotification.querySelector('.fact-header');
    Object.assign(header.style, {
        fontSize: '1.1rem',
        fontWeight: '700',
        color: '#DAA520',
        marginBottom: '10px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        textAlign: 'left'
    });
    
    // Style the content
    const content = factNotification.querySelector('.fact-content');
    Object.assign(content.style, {
        fontSize: '0.85rem',
        lineHeight: '1.4',
        color: '#e8e8e8',
        marginBottom: '5px'
    });
    
    // Style the close button
    const closeBtn = factNotification.querySelector('.fact-close');
    Object.assign(closeBtn.style, {
        position: 'absolute',
        top: '8px',
        right: '12px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#888',
        cursor: 'pointer',
        lineHeight: '1',
        transition: 'color 0.2s ease'
    });
    
    // Add hover effect for close button
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.color = '#DAA520';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.color = '#888';
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

setInterval(showInspectorFact, 30000);

setTimeout(showInspectorFact, 15000);

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

console.log('Inspector Corps website loaded successfully');

window.InspectorCorps = {
    smoothScrollTo,
    typeWriter,
    validateForm
};
