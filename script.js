const letterClosed = document.getElementById('letterClosed');
const letterOpen = document.getElementById('letterOpen');
const closeBtn = document.getElementById('closeBtn');
const particlesContainer = document.getElementById('particles');

function createParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particlesContainer.appendChild(particle);
    }
}

letterClosed.addEventListener('click', () => {
    const envelopeFlap = letterClosed.querySelector('.envelope-flap');
    if (envelopeFlap) {
        envelopeFlap.style.transform = 'rotateX(-180deg)';
        envelopeFlap.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }
    
    setTimeout(() => {
        letterClosed.style.display = 'none';
        letterOpen.classList.add('active');
        
        createGentleConfetti();
    }, 600);
});

closeBtn.addEventListener('click', () => {
    letterOpen.classList.remove('active');
    
    setTimeout(() => {
        letterClosed.style.display = 'block';
        const envelopeFlap = letterClosed.querySelector('.envelope-flap');
        if (envelopeFlap) {
            envelopeFlap.style.transform = 'rotateX(0deg)';
            envelopeFlap.style.transition = 'transform 0.6s ease';
        }
    }, 500);
});

function createGentleConfetti() {
    const colors = ['#ffb6c1', '#ffc0cb', '#ffd1dc', '#ffe4e1', '#f0e6ff', '#e6e6fa'];
    const confettiCount = 40;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 8 + 4 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.opacity = '0.7';
            
            document.body.appendChild(confetti);
            
            const angle = Math.random() * 360;
            const velocity = Math.random() * 4 + 2;
            const vx = (Math.random() - 0.5) * 2;
            
            let x = parseFloat(confetti.style.left);
            let y = -10;
            let vy = velocity;
            const gravity = 0.2;
            let rot = 0;
            const rotationSpeed = Math.random() * 5 + 2;
            
            function animate() {
                vy += gravity;
                y += vy;
                x += vx;
                rot += rotationSpeed;
                
                confetti.style.left = x + '%';
                confetti.style.top = y + 'px';
                confetti.style.transform = `rotate(${rot}deg)`;
                confetti.style.opacity = Math.max(0, 0.7 - (y / window.innerHeight) * 0.7);
                
                if (y < window.innerHeight + 20) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            }
            
            animate();
        }, i * 30);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    const hearts = document.querySelectorAll('.heart');
    
    hearts.forEach(heart => {
        heart.addEventListener('click', function() {
            createHeartEffect(this);
        });
    });
});

function createHeartEffect(heartElement) {
    const rect = heartElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const heartEmoji = heartElement.textContent;
    
    for (let i = 0; i < 12; i++) {
        const miniHeart = document.createElement('span');
        miniHeart.textContent = heartEmoji;
        miniHeart.style.position = 'fixed';
        miniHeart.style.fontSize = '18px';
        miniHeart.style.pointerEvents = 'none';
        miniHeart.style.zIndex = '10000';
        miniHeart.style.left = centerX + 'px';
        miniHeart.style.top = centerY + 'px';
        
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 1.5 + Math.random();
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(miniHeart);
        
        let x = centerX;
        let y = centerY;
        let opacity = 1;
        let scale = 1;
        
        function animate() {
            x += vx;
            y += vy;
            opacity -= 0.03;
            scale += 0.02;
            
            miniHeart.style.left = x + 'px';
            miniHeart.style.top = y + 'px';
            miniHeart.style.opacity = opacity;
            miniHeart.style.transform = `scale(${scale})`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                miniHeart.remove();
            }
        }
        
        animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const paper = document.querySelector('.paper');
    if (paper) {
        paper.addEventListener('mousemove', (e) => {
            const rect = paper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
            const intensity = Math.max(0, 1 - (distance / maxDistance) * 0.5);
            
            paper.style.boxShadow = `
                0 ${10 + intensity * 10}px ${40 + intensity * 20}px rgba(0, 0, 0, ${0.15 + intensity * 0.1}),
                inset 0 0 ${60 + intensity * 30}px rgba(139, 90, 122, ${0.05 + intensity * 0.05})
            `;
        });
        
        paper.addEventListener('mouseleave', () => {
            paper.style.boxShadow = `
                0 10px 40px rgba(0, 0, 0, 0.15),
                inset 0 0 60px rgba(139, 90, 122, 0.05)
            `;
        });
    }
});