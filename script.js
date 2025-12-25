document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    
    container.addEventListener('click', () => {
        createConfetti();
    });

    // Auto create some confetti on load
    setInterval(createConfetti, 2000);
});

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];
    
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const left = Math.random() * window.innerWidth;
        const animDuration = Math.random() * 3 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.left = `${left}px`;
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = color;
        confetti.style.animationDuration = `${animDuration}s`;
        
        document.body.appendChild(confetti);
        
        // Remove element after animation
        setTimeout(() => {
            confetti.remove();
        }, animDuration * 1000);
    }
}

// Add keyframes for falling animation dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fall {
    to {
        transform: translateY(100vh) rotate(720deg);
    }
}`;
document.head.appendChild(styleSheet);
