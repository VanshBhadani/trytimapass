document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    
    container.addEventListener('click', () => {
        createConfetti();
    });

    // Create falling snowflakes continuously
    createSnowflakes();
    // Add twinkle lights
    addTwinkleLights();
    // Auto create some confetti on load
    setInterval(createConfetti, 3000);
});
function addTwinkleLights() {
    const twinkle = document.querySelector('.twinkle-lights');
    if (!twinkle) return;
    for (let i = 0; i < 10; i++) {
        const bulb = document.createElement('span');
        twinkle.appendChild(bulb);
    }
}

function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeSymbols = ['❄️', '❅', '❆', '✿', '⛄'];
    
    for (let i = 0; i < 30; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        const left = Math.random() * window.innerWidth;
        const duration = Math.random() * 5 + 8;
        const symbol = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
        const delay = Math.random() * 5;
        
        snowflake.textContent = symbol;
        snowflake.style.left = `${left}px`;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;
        
        snowflakesContainer.appendChild(snowflake);
    }
}

function createConfetti() {
    const colors = ['red', 'gold', 'green', 'silver'];
    
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const left = Math.random() * window.innerWidth;
        const animDuration = Math.random() * 3 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.classList.add(color);
        confetti.style.left = `${left}px`;
        confetti.style.top = '-10px';
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
