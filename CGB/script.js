document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initHoverEffects();
    initClickEffects();
    initTerminalAnimation();
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

    const animatedElements = document.querySelectorAll('.operation-card, .warning-box, .recruitment-info, .step');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('scroll-animate');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

function initHoverEffects() {
    const cards = document.querySelectorAll('.operation-card, .warning-box, .recruitment-info');
    
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
    const clickableItems = document.querySelectorAll('.operation-card, .warning-box');
    
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
            ripple.style.background = 'rgba(45, 90, 45, 0.3)';
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

function initTerminalAnimation() {
    const commands = [
        'access cgb_mainframe',
        'authenticate --user=RealCGB',
        'request clearance',
        'access program_chi',
        'scan personnel_records',
        'clear'
    ];
    
    const responses = [
        'You must authenticate to access the CGB mainframe.',
        'Authentication failed. Access denied.',
        'Request denied: not authenticated.',
        'Access denied: not authenticated.',
        'Access denied: not authenticated.'
    ];
    
    let currentCommandIndex = 0;
    let currentCharIndex = 0;
    let isTyping = false;
    
    const commandElement = document.getElementById('terminal-command');
    const outputElement = document.getElementById('terminal-output');
    const cursorElement = document.getElementById('terminal-cursor');
    
    function typeCommand() {
        if (currentCommandIndex >= commands.length) {
            setTimeout(() => {
                currentCommandIndex = 0;
                currentCharIndex = 0;
                outputElement.innerHTML = '';
                typeCommand();
            }, 5000);
            return;
        }
        
        if (!isTyping) {
            isTyping = true;
            currentCharIndex = 0;
            commandElement.textContent = '';
        }
        
        const currentCommand = commands[currentCommandIndex];
        
        if (currentCharIndex < currentCommand.length) {
            commandElement.textContent += currentCommand[currentCharIndex];
            currentCharIndex++;
            setTimeout(typeCommand, 100 + Math.random() * 50);
        } else {
            if (currentCommand === 'clear') {
                setTimeout(() => {
                    const responseDiv = document.createElement('div');
                    responseDiv.style.marginBottom = '0.5rem';
                    
                    const promptSpan = document.createElement('span');
                    promptSpan.className = 'prompt';
                    promptSpan.textContent = 'root@cgb-mainframe:~$ ';
                    
                    const commandSpan = document.createElement('span');
                    commandSpan.className = 'command';
                    commandSpan.textContent = currentCommand;
                    
                    responseDiv.appendChild(promptSpan);
                    responseDiv.appendChild(commandSpan);
                    outputElement.appendChild(responseDiv);
                    
                    setTimeout(() => {
                        outputElement.innerHTML = '';
                        commandElement.textContent = '';
                        currentCommandIndex = 0;
                        currentCharIndex = 0;
                        isTyping = false;
                        setTimeout(typeCommand, 500);
                    }, 800);
                }, 500);
                return;
            }
            
            setTimeout(() => {
                const responseDiv = document.createElement('div');
                responseDiv.style.marginBottom = '0.5rem';
                
                const promptSpan = document.createElement('span');
                promptSpan.className = 'prompt';
                promptSpan.textContent = 'root@cgb-mainframe:~$ ';
                
                const commandSpan = document.createElement('span');
                commandSpan.className = 'command';
                commandSpan.textContent = currentCommand;
                
                responseDiv.appendChild(promptSpan);
                responseDiv.appendChild(commandSpan);
                outputElement.appendChild(responseDiv);
                
                setTimeout(() => {
                    const outputDiv = document.createElement('div');
                    const response = responses[currentCommandIndex];
                    
                    if (response.includes('denied') || response.includes('failed') || response.includes('insufficient')) {
                        outputDiv.className = 'access-denied';
                    } else if (response.includes('CLASSIFIED') || response.includes('EXPUNGED')) {
                        outputDiv.style.color = '#ffaa00';
                    } else {
                        outputDiv.style.color = '#b0b0b0';
                    }
                    
                    outputDiv.textContent = response;
                    outputElement.appendChild(outputDiv);
                    
                    outputElement.scrollTop = outputElement.scrollHeight;
                    
                    currentCommandIndex++;
                    isTyping = false;
                    commandElement.textContent = '';
                    
                    setTimeout(typeCommand, 1500);
                }, 500);
            }, 1000);
        }
    }
    
    setTimeout(() => {
        typeCommand();
    }, 2000);
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
            typeWriter(heroTitle, originalText, 150);
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

document.addEventListener('DOMContentLoaded', function() {
    const redactedElements = document.querySelectorAll('.redacted');
    
    redactedElements.forEach(element => {
        let originalText = element.textContent;
        let isRevealed = false;
        
        element.addEventListener('click', function() {
            if (!isRevealed) {
                this.style.background = 'transparent';
                this.style.color = '#ff4444';
                this.style.animation = 'blink 0.5s ease-in-out 3';
                isRevealed = true;
                
                setTimeout(() => {
                    this.style.background = '#000000';
                    this.style.color = '#000000';
                    this.style.animation = '';
                    isRevealed = false;
                }, 3000);
            }
        });
    });
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

document.addEventListener('DOMContentLoaded', function() {
    let unauthorizedAttempts = 0;
    const maxAttempts = 5;
    
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
            (e.key === 'F12')) {
            unauthorizedAttempts++;
            
            if (unauthorizedAttempts >= maxAttempts) {
                showSecurityWarning();
                unauthorizedAttempts = 0;
            }
        }
    });
    
    function showSecurityWarning() {
        const warningDiv = document.createElement('div');
        warningDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            color: #ff4444;
            padding: 2rem;
            border: 2px solid #ff4444;
            border-radius: 8px;
            z-index: 10000;
            font-family: 'JetBrains Mono', monospace;
            text-align: center;
            box-shadow: 0 0 30px rgba(255, 68, 68, 0.5);
        `;
        warningDiv.innerHTML = `
            <h3>⚠ SECURITY ALERT ⚠</h3>
            <p>Unauthorized access attempt detected.</p>
            <p>Your activities are being monitored.</p>
            <button onclick="this.parentElement.remove()" style="
                background: #ff4444;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                margin-top: 1rem;
                border-radius: 4px;
                cursor: pointer;
                font-family: 'JetBrains Mono', monospace;
            ">ACKNOWLEDGE</button>
        `;
        
        document.body.appendChild(warningDiv);
        
        setTimeout(() => {
            if (warningDiv.parentElement) {
                warningDiv.remove();
            }
        }, 10000);
    }
});

console.log('CGB Security System initialized');
console.log('All activities are monitored and logged');

window.CGB = {
    smoothScrollTo,
    typeWriter,
    validateForm,
    initTerminalAnimation
};
