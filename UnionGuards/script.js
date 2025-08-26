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

    const animatedElements = document.querySelectorAll('.company-card, .division-card, .req-item, .application-info');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('scroll-animate');
        element.style.animationDelay = `${index * 0.15}s`;
        observer.observe(element);
    });
}

function initHoverEffects() {
    const cards = document.querySelectorAll('.company-card, .division-card, .application-info');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
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
    const reqItems = document.querySelectorAll('.req-item');
    
    reqItems.forEach(item => {
        item.addEventListener('click', function() {
            reqItems.forEach(i => i.classList.remove('active'));
            
            this.classList.add('active');
            
            const originalBorder = this.style.borderColor;
            this.style.borderColor = '#FFD700';
            this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
            
            setTimeout(() => {
                this.style.borderColor = originalBorder;
                this.style.boxShadow = '';
                this.classList.remove('active');
            }, 2500);
        });
    });
});

const guardFacts = [
    "Union Guards have authority over all non-whitelisted divisional and ministerial members when bodyguarding a VIP.",
    "The Volunteer Brigade was a thing already way back when the Union Guards division first started; however, it was disbanded on the 30th of April, 2024. It was brought back on the 10th of December, 2024, originally with the purpose of housing all those migrating from SCAR after it was disbanded.",
    "The first Union Guards skirmish happened on the 3rd of February, 2024, against the Bulldog Brigade. It resulted in the UG winning.",
    "Before the application system to join the Union Guards was implemented on the 6th of May, 2024, all those who wanted to join the Union Guards had to first go through a tryout, and then an interview.",
    "The Union Guards have 3 tests that you are able to take throughout your career: the Guardsman Certification Test (GCT) to become a Lance Corporal able to deploy, the Sergeant Aptitude Test (SAT) to become an NCO, and the Leadership Aptitude Test (LAT) to become an Officer.",
    "The State Security role within the Union Guards Communications Server is ████████████ and ████████████.",
    "Unlike in other divisions, Officers within the Union Guard do logistics themselves. Currently, there is no logistics team.",
    "UG CO+ (or 1 year+) receive the rank of Veteran upon their retirement. This allows them to continue interacting with the UG community even after they have left the division.",
    "Union Guards have gained authority in the border, being able to enforce its rules and command TGRA soldiers.",
    "Grand Duke Commander Co-President of B1 Sergeant Infantryman Armored Corp Member JzP Junior Maizel Guard Adjudant of the Garde Impériale Human Body Shield Guardsman Command Sergeant Lord of the Deep Kentucky resident Private Pioneer Emperor Napoleon Captain Engineer Commander of the Blood Raven 3rd Company Commander of the Astra Militarum Saul Goodmanus III of Switzerland is the full name of the current commander of the Union Guards."
];

function showGuardFact() {
    const randomIndex = Math.floor(Math.random() * guardFacts.length);
    const fact = guardFacts[randomIndex];
    
    const factNotification = document.createElement('div');
    factNotification.className = 'fact-notification';
    factNotification.innerHTML = `
        <div class="fact-header">Elite Intel</div>
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
        borderRadius: '12px',
        maxWidth: '320px',
        zIndex: '10000',
        fontSize: '0.9rem',
        boxShadow: '0 15px 40px rgba(139, 0, 0, 0.4)',
        border: '2px solid rgba(255, 215, 0, 0.3)',
        transform: 'translateX(370px)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif"
    });
    
    document.body.appendChild(factNotification);
    
    setTimeout(() => {
        factNotification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        factNotification.style.transform = 'translateX(370px)';
        setTimeout(() => {
            if (factNotification.parentElement) {
                factNotification.remove();
            }
        }, 500);
    }, 12000);
}

const factStyles = document.createElement('style');
factStyles.textContent = `
    .fact-notification {
        font-family: 'Inter', sans-serif;
    }

    .fact-header {
        font-weight: 700;
        margin-bottom: 1rem;
        font-size: 1rem;
        color: #FFD700;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-family: 'Playfair Display', serif;
    }

    .fact-content {
        line-height: 1.6;
        color: #e8e8e8;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }

    .fact-close {
        position: absolute;
        top: 8px;
        right: 12px;
        cursor: pointer;
        font-size: 1.4rem;
        line-height: 1;
        color: #b8b8b8;
        transition: color 0.3s ease;
    }

    .fact-close:hover {
        color: #FFD700;
    }
`;
document.head.appendChild(factStyles);

setInterval(showGuardFact, 35000);
setTimeout(showGuardFact, 20000);

function typeWriter(element, text, speed = 80) {
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
            typeWriter(heroTitle, originalText, 100);
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 800);
        
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
        }, 2800);
    }
});

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#DC143C';
            
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

console.log('Union Guards website loaded successfully - Elite forces ready for duty');

window.UnionGuards = {
    smoothScrollTo,
    typeWriter,
    validateForm
};
