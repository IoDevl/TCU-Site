document.addEventListener('DOMContentLoaded', function() {
    initializeEffects();

    createBackgroundEffects();
    
    initializeInteractivity();
    
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
        document.body.classList.add('fully-loaded');
    }, 200);
});

function initializeEffects() {
    const sections = document.querySelectorAll('section, header');
    sections.forEach((section) => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.style.visibility = 'visible';
    });
    
    typewriterEffect();
    
    typewriterEffectProclamation();
}

function typewriterEffect() {
    const titleElement = document.querySelector('.union-title');
    if (!titleElement) return;
    
    if (titleElement.dataset.typed === 'true') return;
    titleElement.dataset.typed = 'true';
    
    const originalText = titleElement.textContent;
    
    titleElement.style.opacity = '1';
    titleElement.style.visibility = 'visible';
    
    if (document.readyState === 'complete' && performance.navigation.type === 1) {
        return;
    }
    
    titleElement.textContent = '';
    titleElement.style.position = 'relative';
    titleElement.style.overflow = 'visible';

    const textSpan = document.createElement('span');
    const caretSpan = document.createElement('span');
    caretSpan.className = 'typing-caret';
    caretSpan.style.cssText = 'display:inline-block;width:3px;height:1em;background:#cc0000;margin-left:6px;vertical-align:-0.12em;animation:blink 1s steps(1,end) infinite;';

    if (!document.querySelector('#typing-caret-styles')) {
        const blinkStyle = document.createElement('style');
        blinkStyle.id = 'typing-caret-styles';
        blinkStyle.textContent = `@keyframes blink { 0%,50%{opacity:1;} 51%,100%{opacity:0;} }`;
        document.head.appendChild(blinkStyle);
    }

    titleElement.appendChild(textSpan);
    titleElement.appendChild(caretSpan);

    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            textSpan.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 60);
        } else {
            setTimeout(() => {
                caretSpan.remove();
            }, 600);
        }
    }
    
    setTimeout(typeWriter, 10);
}

function typewriterEffectProclamation() {
    const proclamationElement = document.querySelector('.proclamation-title');
    if (!proclamationElement) return;
    
    if (proclamationElement.dataset.typed === 'true') return;
    proclamationElement.dataset.typed = 'true';
    
    const originalText = proclamationElement.textContent;
    
    proclamationElement.style.opacity = '1';
    proclamationElement.style.visibility = 'visible';
    
    if (document.readyState === 'complete' && performance.navigation.type === 1) {
        return;
    }
    
    proclamationElement.textContent = '';
    proclamationElement.style.position = 'relative';
    proclamationElement.style.overflow = 'visible';

    const pTextSpan = document.createElement('span');
    const pCaretSpan = document.createElement('span');
    pCaretSpan.className = 'typing-caret';
    pCaretSpan.style.cssText = 'display:inline-block;width:3px;height:1em;background:#cc0000;margin-left:6px;vertical-align:-0.12em;animation:blink 1s steps(1,end) infinite;';

    proclamationElement.appendChild(pTextSpan);
    proclamationElement.appendChild(pCaretSpan);

    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            pTextSpan.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        } else {
            setTimeout(() => {
                pCaretSpan.remove();
            }, 600);
        }
    }
    
    setTimeout(typeWriter, 800);
}

function createBackgroundEffects() {
    addAnimatedElements();
}



function addAnimatedElements() {
    const redStripe = document.querySelector('.red-stripe');
    if (redStripe) {
        redStripe.addEventListener('animationend', function() {
            this.style.animation = 'pulseRed 2s ease-in-out infinite';
        });
    }
    
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeInteractivity() {
    const buttons = document.querySelectorAll('.cta-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createClickEffect(e);
        });
    });
    
    observeElements();
}

function createClickEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function observeElements() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -150px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                entry.target.classList.add('animate-in');
                
                if (entry.target.classList.contains('leader-card')) {
                    animateLeaderCard(entry.target);
                } else if (entry.target.classList.contains('info-card')) {
                    animateInfoCard(entry.target);
                } else if (entry.target.classList.contains('stat-item')) {
                    animateStatItem(entry.target);
                } else if (entry.target.classList.contains('member-card')) {
                    animateMemberCard(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const elementsToObserve = document.querySelectorAll('.leader-card, .stat-item, .member-card');
    elementsToObserve.forEach(el => {
        if (!el.dataset.animated) {
            observer.observe(el);
        }
    });
}

function animateLeaderCard(card) {
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, 100);
}

function animateStatItem(item) {
    setTimeout(() => {
        item.style.transform = 'scale(1)';
        item.style.opacity = '1';
    }, 200);
}

function animateMemberCard(card) {
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, 150);
}

function showPatriotism() {
    const messages = [
        "GLORY TO THE COMPUTER UNION!",
        "FOR THE MOTHERLAND!",
        "LONG LIVE DICTATOR!",
        "GLORY TO THE UNION!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(randomMessage, 'success');
}

let currentAudio = null;
let isAudioPlaying = false;

function showAnthem() {
    const anthemButton = document.querySelector('.cta-btn.secondary');
    
    if (isAudioPlaying && currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
        isAudioPlaying = false;
        
        if (anthemButton) {
            anthemButton.textContent = 'PLAY ANTHEM';
        }
        
        showNotification("Anthem stopped", 'info');
        return;
    }
    
    currentAudio = new Audio('Anthem.mp3');
    
    if (anthemButton) {
        anthemButton.textContent = 'STOP ANTHEM';
    }
    
    currentAudio.play().then(() => {
        isAudioPlaying = true;
        showNotification("Playing TCU Anthem...", 'info');
        createMusicVisualization();
    }).catch((error) => {
        console.log('Could not play anthem:', error);
        showNotification("Anthem file not found.. what?", 'info');
        createMusicVisualization();
        isAudioPlaying = true;
    });
    
    currentAudio.addEventListener('ended', () => {
        isAudioPlaying = false;
        currentAudio = null;
        if (anthemButton) {
            anthemButton.textContent = 'PLAY ANTHEM';
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#cc0000' : '#333333'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        border: 2px solid ${type === 'success' ? '#ff3333' : '#cc0000'};
        font-family: 'Orbitron', monospace;
        font-weight: 700;
        z-index: 1000;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function createMusicVisualization() {
    const visualizer = document.createElement('div');
    visualizer.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 4px;
        z-index: 1000;
        padding: 20px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 12px;
        border: 2px solid #cc0000;
    `;
    
    for (let i = 0; i < 12; i++) {
        const bar = document.createElement('div');
        bar.style.cssText = `
            width: 6px;
            background: #cc0000;
            border-radius: 3px;
            animation: musicBar ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate;
        `;
        visualizer.appendChild(bar);
    }
    
    if (!document.querySelector('#music-styles')) {
        const style = document.createElement('style');
        style.id = 'music-styles';
        style.textContent = `
            @keyframes musicBar {
                0% { height: 10px; }
                100% { height: 40px; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(visualizer);
    
    setTimeout(() => {
        visualizer.remove();
    }, 5000);
}

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'U') {
        e.preventDefault();
        showPatriotism();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        showAnthem();
    }
});
