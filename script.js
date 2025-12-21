document.addEventListener('DOMContentLoaded', () => {
    // Entrance Animation
    const hero = document.getElementById('hero');
    hero.style.opacity = '0';
    hero.animate([
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
    ], {
        duration: 1000,
        easing: 'ease-out',
        fill: 'forwards'
    });

    // Create falling elements (hearts/crosses)
    createFallingElements();

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate([
                    { opacity: 0, transform: 'translateY(20px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 800,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
});

function createFallingElements() {
    const container = document.body;
    const symbols = ['🖤', '🎀', '♡', '†'];

    setInterval(() => {
        const el = document.createElement('div');
        el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.position = 'fixed';
        el.style.top = '-50px';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = (Math.random() * 20 + 10) + 'px';
        el.style.opacity = Math.random() * 0.5 + 0.2;
        el.style.color = Math.random() > 0.5 ? '#ffb7c5' : '#fff';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '0';
        el.style.textShadow = '0 0 5px rgba(255,183,197,0.5)';

        container.appendChild(el);

        const duration = Math.random() * 5000 + 5000;

        const animation = el.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: el.style.opacity },
            { transform: `translateY(110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        });

        animation.onfinish = () => el.remove();
    }, 500); // Add new element every 500ms
}

function tryPlay() {
    const audio = document.getElementById('bgm');
    if (audio.paused) {
        audio.play().catch(() => {
            console.log("自動再生がブロックされました");
        });
    }
}

window.addEventListener('load', tryPlay);
document.addEventListener('click', tryPlay, { once: true });
document.addEventListener('touchstart', tryPlay, { once: true });
