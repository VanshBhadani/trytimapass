document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect
    const textElement = document.getElementById('typing-text');
    const phrases = ["Wishing you joy!", "Merry Christmas!", "Happy Holidays!", "Stay warm & cozy!"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }
    type();

    // Magic Button Effect (Gift Opening)
    const btn = document.getElementById('magicBtn');
    btn.addEventListener('click', (e) => {
        createExplosion(e.clientX, e.clientY);
        playJingleSound();
    });

    // Create Snowflakes
    createSnowflakes();

    // Create Lights
    createLights();

    // Music Player (Jingle Bells Melody)
    const musicBtn = document.getElementById('musicBtn');
    let isPlaying = false;
    let audioContext = null;
    let melodyInterval = null;

    musicBtn.addEventListener('click', () => {
        if (!isPlaying) {
            startMusic();
            musicBtn.innerHTML = '<span class="icon">🔇</span> Stop Jingle';
            isPlaying = true;
        } else {
            stopMusic();
            musicBtn.innerHTML = '<span class="icon">🔔</span> Play Jingle';
            isPlaying = false;
        }
    });

    function startMusic() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // Simple Jingle Bells notes (approximate)
        const melody = [
            {note: 329.63, dur: 0.2}, {note: 329.63, dur: 0.2}, {note: 329.63, dur: 0.4}, // Jingle bells
            {note: 329.63, dur: 0.2}, {note: 329.63, dur: 0.2}, {note: 329.63, dur: 0.4}, // Jingle bells
            {note: 329.63, dur: 0.2}, {note: 392.00, dur: 0.2}, {note: 261.63, dur: 0.2}, {note: 293.66, dur: 0.1}, {note: 329.63, dur: 0.8} // Jingle all the way
        ];
        
        let noteIndex = 0;

        melodyInterval = setInterval(() => {
            if (noteIndex >= melody.length) noteIndex = 0;
            const n = melody[noteIndex];
            playNote(n.note, n.dur);
            noteIndex++;
        }, 300);
    }

    function stopMusic() {
        if (melodyInterval) clearInterval(melodyInterval);
        if (audioContext) audioContext.close();
    }

    function playNote(freq, duration) {
        if (!audioContext) return;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.type = 'sine'; // Softer sound for Christmas
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.start();
        osc.stop(audioContext.currentTime + duration);
    }

    function playJingleSound() {
        if (!window.AudioContext) return;
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        // Simulate sleigh bells
        for(let i=0; i<5; i++) {
            setTimeout(() => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.value = 2000 + Math.random() * 1000;
                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
            }, i * 50);
        }
    }
});

function createSnowflakes() {
    const container = document.querySelector('.snowflakes');
    const count = 50;
    for (let i = 0; i < count; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = Math.random() * 3 + 2 + 's';
        flake.style.opacity = Math.random();
        flake.style.fontSize = Math.random() * 10 + 10 + 'px';
        container.appendChild(flake);
    }
}

function createLights() {
    const container = document.querySelector('.lights-string');
    const count = 30;
    for (let i = 0; i < count; i++) {
        const light = document.createElement('div');
        light.classList.add('light');
        container.appendChild(light);
    }
}

function createExplosion(x, y) {
    const colors = ['#c0392b', '#27ae60', '#f1c40f', '#ecf0f1'];
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}
